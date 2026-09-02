import {
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { CircuitBreaker } from '../common/resilience/circuit-breaker';
import { safeJsonParse } from '../common/utils/json.util';
import { TraceContext } from '../common/tracing/trace-context';
import * as crypto from 'crypto';
import type { Request, Response } from 'express';
import {
  GITHUB_REPOSITORY,
  type IGithubRepository,
} from './interfaces/github-repository.interface';

const CONTRIBUTOR_TIERS_MAPPING = [
  { count: 100, badgeId: 'CONTRIBUTOR_OPAL' },
  { count: 50, badgeId: 'CONTRIBUTOR_RUBY' },
  { count: 25, badgeId: 'CONTRIBUTOR_DIAMOND' },
  { count: 10, badgeId: 'CONTRIBUTOR_PLATINUM' },
  { count: 5, badgeId: 'CONTRIBUTOR_GOLD' },
  { count: 3, badgeId: 'CONTRIBUTOR_SILVER' },
  { count: 1, badgeId: 'CONTRIBUTOR_BRONZE' },
];

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly circuitBreaker: CircuitBreaker;

  constructor(
    @Inject(GITHUB_REPOSITORY)
    private readonly githubRepo: IGithubRepository,
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {
    this.circuitBreaker = new CircuitBreaker({
      name: 'GitHub-API',
      failureThreshold: 4,
      resetTimeoutMs: 20_000,
      halfOpenSuccessThreshold: 2,
      onStateChange: (from, to) => {
        this.logger.warn(`GitHub API CircuitBreaker transitioned from ${from} to ${to}`);
      },
    });
  }

  private get clientId(): string {
    return this.config.get<string>('GITHUB_CLIENT_ID') || '9407946148e4d58d7030';
  }

  private get clientSecret(): string {
    return this.config.get<string>('GITHUB_CLIENT_SECRET') || 'mock_github_client_secret';
  }

  private get callbackUrl(): string {
    const configured = this.config.get<string>('GITHUB_CALLBACK_URL');
    if (configured) return configured;
    const port = this.config.get<number>('PORT') || 3000;
    return `http://localhost:${port}/auth/github/callback`;
  }

  private get frontendRedirectUrl(): string {
    const raw = this.config.get<string>('CORS_ORIGIN') || 'http://localhost:5173';
    return raw.split(',')[0].trim().replace(/\/+$/, '');
  }

  private get systemToken(): string {
    return this.config.get<string>('GITHUB_SYSTEM_TOKEN') || '';
  }

  private get webhookSecret(): string {
    return this.config.get<string>('GITHUB_WEBHOOK_SECRET') || '';
  }

  getAuthorizationUrl(req: Request, res: Response): void {
    const csrf = crypto.randomBytes(32).toString('hex');
    let userIdParam = '';
    const rawToken = typeof req.query.token === 'string' ? req.query.token : undefined;
    if (rawToken) {
      try {
        const parts = rawToken.split('.');
        if (parts.length === 3) {
          const rawPayload = Buffer.from(parts[1], 'base64url').toString('utf8');
          const payload = safeJsonParse<{ sub?: string }>(rawPayload);
          if (payload?.sub) userIdParam = String(payload.sub);
        }
      } catch (e) {
        this.logger.debug(`Could not parse optional token in getAuthorizationUrl: ${String(e)}`);
      }
    }

    const state = userIdParam ? `${csrf}:${userIdParam}` : csrf;

    const forwardedProtoHeader = req.headers['x-forwarded-proto'];
    const forwardedProto = Array.isArray(forwardedProtoHeader)
      ? forwardedProtoHeader[0]
      : forwardedProtoHeader?.split(',')[0];
    const isSecureRequest =
      req.secure || forwardedProto?.trim() === 'https' || process.env.NODE_ENV === 'production';

    res.cookie('github_oauth_state', csrf, {
      httpOnly: true,
      secure: isSecureRequest,
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000,
    });

    const targetUrl = new URL('https://github.com/login/oauth/authorize');
    targetUrl.searchParams.set('client_id', this.clientId);
    targetUrl.searchParams.set('redirect_uri', this.callbackUrl);
    targetUrl.searchParams.set('scope', 'read:user');
    targetUrl.searchParams.set('state', state);

    res.redirect(targetUrl.toString());
  }

  async handleOAuthCallback(
    code: string,
    state: string,
    req: Request,
    res: Response,
    userId?: string,
  ): Promise<void> {
    const [csrfFromState, userIdFromState] = (state || '').split(':');
    const cookieState = (req.cookies as Record<string, string> | undefined)?.github_oauth_state;

    if (!csrfFromState || !cookieState || csrfFromState !== cookieState) {
      this.logger.warn(`CSRF state mismatch during GitHub OAuth callback.`);
      res.clearCookie('github_oauth_state');
      return res.redirect(`${this.frontendRedirectUrl}/settings?error=csrf_state_mismatch`);
    }

    res.clearCookie('github_oauth_state');

    try {
      const abortSignal = TraceContext.getAbortSignal();
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        signal: abortSignal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          redirect_uri: this.callbackUrl,
        }),
      });

      const tokenData = (await tokenRes.json()) as { access_token?: string };
      const accessToken = tokenData.access_token;

      if (!accessToken) {
        throw new UnauthorizedException('Failed to obtain GitHub access token');
      }

      const userRes = await fetch('https://api.github.com/user', {
        signal: abortSignal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'SocialNetwork-App',
        },
      });

      if (!userRes.ok) {
        throw new UnauthorizedException('Failed to fetch user profile from GitHub API');
      }

      const ghUser = (await userRes.json()) as { id?: number | string; login?: string };
      const githubId = ghUser.id ? String(ghUser.id) : '';
      const githubUsername = ghUser.login || null;

      let targetUserId = userId || userIdFromState;
      if (!targetUserId && githubId) {
        const existing = await this.githubRepo.findUserByGithubId(githubId);
        if (existing) targetUserId = existing.id;
      }

      if (targetUserId) {
        await this.githubRepo.updateUserGithub(targetUserId, {
          githubId,
          githubUsername,
        });

        await this.redis.del(`user:${targetUserId}`);
        await this.syncUserGithubContributions(targetUserId);
      }

      res.redirect(`${this.frontendRedirectUrl}/settings?github=connected`);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      this.logger.error(`GitHub OAuth Callback Exception: ${errMsg}`);
      res.redirect(`${this.frontendRedirectUrl}/settings?error=oauth_failed`);
    }
  }

  async unlinkGithub(userId: string): Promise<void> {
    const user = await this.githubRepo.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.githubRepo.unlinkGithubAndBadges(userId, [
      'CONTRIBUTOR',
      'CONTRIBUTOR_BRONZE',
      'CONTRIBUTOR_SILVER',
      'CONTRIBUTOR_GOLD',
      'CONTRIBUTOR_PLATINUM',
      'CONTRIBUTOR_DIAMOND',
      'CONTRIBUTOR_RUBY',
      'CONTRIBUTOR_OPAL',
    ]);

    await this.redis.del(`user:${userId}`);
  }

  async syncUserGithubContributions(userId: string): Promise<{
    mergedPrsCount: number;
    githubUsername: string | null;
  }> {
    return this.redis.withLock(`lock:rewards:${userId}`, async () => {
      const user = await this.githubRepo.findUserById(userId);
      if (!user || !user.githubId) {
        return { mergedPrsCount: 0, githubUsername: null };
      }

      let currentGithubUsername = user.githubUsername || '';

      try {
        await this.circuitBreaker.execute(async () => {
          const headers: Record<string, string> = { 'User-Agent': 'SocialNetwork-App' };
          if (this.systemToken) {
            headers['Authorization'] = `token ${this.systemToken}`;
          }

          const abortSignal = TraceContext.getAbortSignal();
          const refreshRes = await fetch(`https://api.github.com/user/${user.githubId}`, {
            signal: abortSignal,
            headers,
          });

          if (refreshRes.ok) {
            const ghData = (await refreshRes.json()) as { login?: string };
            if (ghData.login && ghData.login !== currentGithubUsername) {
              currentGithubUsername = ghData.login;
              await this.githubRepo.updateUserGithub(userId, {
                githubUsername: currentGithubUsername,
              });
            }
          }
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`Failed to refresh GitHub username for user ${userId}: ${errMsg}`);
      }

      if (!currentGithubUsername) {
        return { mergedPrsCount: 0, githubUsername: null };
      }

      let mergedPrsCount = user.mergedPrsCount || 0;
      try {
        mergedPrsCount = await this.circuitBreaker.execute(
          async () => {
            const abortSignal = TraceContext.getAbortSignal();
            const headers: Record<string, string> = {
              Accept: 'application/vnd.github+json',
              'User-Agent': 'SocialNetwork-App',
            };
            if (this.systemToken) {
              headers['Authorization'] = `token ${this.systemToken}`;
            }

            const queryUrl = `https://api.github.com/search/issues?q=repo:rakuzan-knu/social-network+type:pr+is:merged+author:${encodeURIComponent(
              currentGithubUsername,
            )}`;

            const searchRes = await fetch(queryUrl, { signal: abortSignal, headers });
            if (searchRes.ok) {
              const searchData = (await searchRes.json()) as { total_count?: number };
              if (typeof searchData.total_count === 'number') {
                return searchData.total_count;
              }
            } else {
              this.logger.warn(`GitHub Search API returned status ${searchRes.status}`);
            }
            return mergedPrsCount;
          },
          () => mergedPrsCount,
        );
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        this.logger.error(`Error querying GitHub Search API: ${errMsg}`);
      }

      await this.githubRepo.updateUserGithub(userId, { mergedPrsCount });

      const badgesToGrant: string[] = [];
      if (mergedPrsCount >= 1) {
        badgesToGrant.push('CONTRIBUTOR');
      }

      for (const tier of CONTRIBUTOR_TIERS_MAPPING) {
        if (mergedPrsCount >= tier.count) {
          badgesToGrant.push(tier.badgeId);
        }
      }

      if (badgesToGrant.length > 0) {
        await this.githubRepo.grantBadges(userId, badgesToGrant);
      }

      await this.redis.del(`user:${userId}`);

      return {
        mergedPrsCount,
        githubUsername: currentGithubUsername,
      };
    });
  }

  verifySignature(rawBody: string | Buffer, signatureHeader?: string): boolean {
    if (!signatureHeader) {
      return false;
    }

    if (!this.webhookSecret) {
      return process.env.NODE_ENV !== 'production';
    }

    const hmac = crypto.createHmac('sha256', this.webhookSecret);
    const expectedSignature = `sha256=${hmac.update(rawBody).digest('hex')}`;

    try {
      const a = Buffer.from(signatureHeader);
      const b = Buffer.from(expectedSignature);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }

  async handleWebhookPayload(
    payload: Record<string, unknown>,
  ): Promise<{ handled: boolean; message: string }> {
    const action = payload.action;
    const pullRequest = payload.pull_request as
      { merged?: boolean; user?: { login?: string } } | undefined;
    const isMerged = pullRequest?.merged === true;
    const authorLogin = pullRequest?.user?.login;

    if (action === 'closed' && isMerged && authorLogin) {
      this.logger.log(`Received PR merge webhook for GitHub author: ${authorLogin}`);

      const user = await this.githubRepo.findUserByGithubUsername(authorLogin);

      if (user) {
        await this.syncUserGithubContributions(user.id);
        return { handled: true, message: `Synced PR count for user @${user.username}` };
      }
      return { handled: false, message: `No user linked with GitHub username @${authorLogin}` };
    }

    return { handled: false, message: 'Event ignored (not a merged PR)' };
  }
}

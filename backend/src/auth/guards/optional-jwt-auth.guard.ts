import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Like AuthGuard('jwt') but never rejects: a valid token attaches the user,
 * a missing/invalid token leaves the request anonymous (user = null).
 */
@Injectable()
export class OptionalAuthGuard extends PassportAuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const result = super.canActivate(context);
    if (result instanceof Observable) {
      return result.pipe(catchError(() => of(true)));
    }
    // Promise or boolean: swallow rejection so the route stays reachable when anonymous.
    return Promise.resolve(result).catch(() => true);
  }

  handleRequest<TUser = unknown>(_err: unknown, user: TUser): TUser | null {
    return user ?? null;
  }
}

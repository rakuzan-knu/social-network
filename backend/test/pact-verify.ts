import { Verifier } from '@pact-foundation/pact';
import path from 'path';

/**
 * Verifies the committed consumer pact (backend/pacts/frontend-backend.json)
 * against a running backend instance. Point it at a seeded environment:
 *
 *   PACT_PROVIDER_URL=http://localhost:3000 pnpm --filter backend test:pact:verify
 *
 * State handlers are declared per interaction; extend them once the provider
 * environment exposes seeding hooks so `given` states materialize real data.
 */
const stateHandlers = {
  'a user exists with email alice@example.com': () => Promise.resolve({}),
  'the feed contains exactly one post and no further pages': () => Promise.resolve({}),
  'the user participates in one direct conversation with a last message': () => Promise.resolve({}),
  'a user with username alice exists': () => Promise.resolve({}),
  'a user with username carol and no avatar exists': () => Promise.resolve({}),
};

async function main(): Promise<void> {
  const providerBaseUrl = process.env.PACT_PROVIDER_URL ?? 'http://localhost:3000';

  await new Verifier({
    providerBaseUrl,
    pactUrls: [path.resolve(__dirname, '../pacts/frontend-backend.json')],
    stateHandlers,
  }).verifyProvider();
}

main().catch((error: unknown) => {
  process.stderr.write(`Pact verification failed: ${String(error)}\n`);
  process.exitCode = 1;
});

import { defineConfig } from 'prisma/config';

// Prisma 7: url must be configured here, not in schema.prisma.
// We read env vars directly (not via env()) so missing vars won't throw
// during `prisma generate` (which runs at install time without DB credentials).
const dbUrl = process.env.DATABASE_URL ?? 'postgresql://localhost/placeholder';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: dbUrl,
  },
});

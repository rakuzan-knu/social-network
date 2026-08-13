# 🗄️ Database Migration & Rollback Strategy

This document outlines the database migration guidelines, safe schema deployment strategies, and rollback protocols for the Social Network platform using Prisma and PostgreSQL.

---

## 📐 Zero-Downtime Migration Pattern (Expand-Contract)

To avoid breaking running application instances during deployment, all database migrations must adhere to the **Expand-Contract (Parallel Change)** pattern.

```
Phase 1: Expand (Non-breaking addition)
  ├── Add new column/table without constraints
  └── Application writes to both old and new columns

Phase 2: Transition & Backfill
  ├── Backfill legacy records to new columns
  └── Read traffic migrates to new columns

Phase 3: Contract (Deprecate legacy schema)
  └── Drop old columns/tables in subsequent release
```

### Mandatory Rules

1. **Never rename columns directly**: Add the new column, sync data, then drop the old column in a later deployment.
2. **Make new columns optional (`NULL`) initially**: Adding `NOT NULL` columns without default values breaks existing insertions.
3. **Never drop tables/columns in the same PR as feature launch**: Ensure older instances have completely wound down before contracting schema.

---

## 🔄 Emergency Rollback Strategy

Prisma uses forward-only migration tracks (`npx prisma migrate deploy`). In case of critical production incidents requiring schema reversal:

### Rollback Workflow

1. **Generate Down SQL**:
   Run the automated rollback helper to compute target SQL differences:
   ```bash
   bash ./scripts/rollback-migration.sh
   ```
2. **Inspect Preview SQL**:
   Verify generated `rollback_preview.sql` for data loss risks.

3. **Execute Safe Reverse Script**:
   Apply reversal SQL against the target database:

   ```bash
   npx prisma db execute --file rollback_preview.sql --schema=backend/prisma/schema.prisma
   ```

4. **Mark Migration State in Prisma**:
   If a migration needs to be marked as rolled back in `_prisma_migrations`:
   ```bash
   npx prisma migrate resolve --rolled-back "<migration_name>"
   ```

---

## 🧪 Backup Restoration Drills

Quarterly backup verification drills are executed using `scripts/verify-backup.sh`.

```bash
# Run automated restore drill
bash scripts/verify-backup.sh /path/to/backup.sql.gz
```

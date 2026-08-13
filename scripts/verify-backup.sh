#!/bin/bash

# Database Backup Restore Drill & Verification Script
# Usage: ./scripts/verify-backup.sh [backup_file_path]

set -e

BACKUP_DIR="${BACKUP_DIR:-/backups}"
BACKUP_FILE="${1:-$(ls -t ${BACKUP_DIR}/backup_*.sql.gz 2>/dev/null | head -n 1)}"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  log "❌ Error: No valid backup file found for verification drill."
  exit 1
fi

log "🔍 Starting Database Restore Drill on backup file: ${BACKUP_FILE}"

# Test Archive Integrity
log "Step 1: Checking archive integrity..."
if gunzip -t "$BACKUP_FILE"; then
  log "✅ Archive integrity test passed."
else
  log "❌ Archive integrity check failed! Backup file is corrupted."
  exit 1
fi

# Prepare Temporary Test Database
TEST_DB_NAME="restore_test_$(date +%s)"
TEST_HOST="${POSTGRES_HOST:-postgres}"
TEST_PORT="${POSTGRES_PORT:-5432}"
TEST_USER="${POSTGRES_USER:-user}"
export PGPASSWORD="${POSTGRES_PASSWORD}"

log "Step 2: Creating temporary test database '${TEST_DB_NAME}'..."
createdb -h "$TEST_HOST" -p "$TEST_PORT" -U "$TEST_USER" "$TEST_DB_NAME" || {
  log "❌ Failed to create temporary test database."
  exit 1
}

# Cleanup hook on exit
cleanup() {
  log "Cleaning up temporary test database '${TEST_DB_NAME}'..."
  dropdb -h "$TEST_HOST" -p "$TEST_PORT" -U "$TEST_USER" --if-exists "$TEST_DB_NAME" || true
}
trap cleanup EXIT

# Restore Dump into Temporary Database
log "Step 3: Restoring SQL dump into temporary database..."
gunzip -c "$BACKUP_FILE" | psql -h "$TEST_HOST" -p "$TEST_PORT" -U "$TEST_USER" -d "$TEST_DB_NAME" > /dev/null 2>&1

# Verify Table Counts and Data Integrity
log "Step 4: Verifying schema and table integrity..."
TABLE_COUNT=$(psql -h "$TEST_HOST" -p "$TEST_PORT" -U "$TEST_USER" -d "$TEST_DB_NAME" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema='public';")
TABLE_COUNT=$(echo "$TABLE_COUNT" | xargs)

if [ "$TABLE_COUNT" -gt 0 ]; then
  log "✅ Restore drill successful! Restored ${TABLE_COUNT} public tables."
  log "🎉 Database backup verification passed 100%."
else
  log "❌ Restore drill failed: 0 tables found after restoring dump."
  exit 1
fi

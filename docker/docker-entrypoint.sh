#!/bin/sh
set -e

chown -R nextjs:nodejs /app/data || true
chmod -R 755 /app/data || true

exec su-exec nextjs:nodejs "$@"
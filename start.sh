#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT=8080

if lsof -i ":${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port ${PORT} is already in use — stop that process before starting a new preview server."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting local preview at http://localhost:${PORT}"
npx eleventy --serve --port="${PORT}"

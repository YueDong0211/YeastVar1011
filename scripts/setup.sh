#!/bin/sh
# Local runtime readiness; package installation is an explicit --dev action.
set -eu
project_dir=$(CDPATH= cd -P "$(dirname "$0")/.." && pwd)
cd "$project_dir"
dev=0
start=0
port=${PORT:-4173}
while [ "$#" -gt 0 ]; do
  case "$1" in
    --dev) dev=1 ;;
    --start) start=1 ;;
    --port)
      if [ "$#" -lt 2 ]; then printf '%s\n' '--port requires a value.' >&2; exit 1; fi
      port=$2; shift ;;
    --help|-h)
      printf '%s\n' 'Usage: sh scripts/setup.sh [--start] [--dev] [--port N]' \
        'Default: check readiness only; no package or system changes.' \
        '--start  Start the local application after checks; Ctrl+C stops it.' \
        '--dev    Install exact development dependencies with npm ci.' \
        '--port N Use local port N; 0 selects an available port.'
      exit 0 ;;
    *) printf '%s\n' "Unknown option: $1" >&2; exit 1 ;;
  esac
  shift
done
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Node.js is not on PATH. Install a maintained Node.js LTS release from https://nodejs.org/en/download, then rerun this command.' >&2
  exit 1
fi
if [ "$dev" -eq 1 ]; then
  node scripts/doctor.cjs --port "$port" --dev
  npm ci
else
  node scripts/doctor.cjs --port "$port"
fi
if [ "$start" -eq 1 ]; then
  PORT=$port
  export PORT
  exec node scripts/dev-server.cjs
fi
printf '%s\n' 'Check complete. Start with sh scripts/setup.sh --start (add --port N if needed).'

#!/usr/bin/env bash
set -euo pipefail

# start.sh - simple monorepo runner for Railway fallback
# Usage: ./start.sh [backend|frontend]

ROOT=${1:-}

if [ -n "$ROOT" ]; then
  echo "Requested root: $ROOT"
fi

if [ "$ROOT" = "backend" ] || ([ -z "$ROOT" ] && [ -f "./backend/main.py" ]); then
  echo "Starting backend service..."
  cd backend
  python -m pip install --upgrade pip
  pip install -r requirements.txt
  exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}

elif [ "$ROOT" = "frontend" ] || ([ -z "$ROOT" ] && [ -f "./frontend/package.json" ]); then
  echo "Starting frontend service..."
  cd frontend
  # use npm ci for reproducible installs if lockfile exists
  if [ -f package-lock.json ] || [ -f pnpm-lock.yaml ] || [ -f yarn.lock ]; then
    npm ci || npm install
  else
    npm install
  fi
  npm run build
  # preview on the port Railway provides
  npm run preview -- --port ${PORT:-4174}

else
  echo "Error: couldn't detect backend or frontend. Exiting." >&2
  ls -la
  exit 1
fi
#!/usr/bin/env bash
set -e

# Default port
PORT="${PORT:-8000}"

echo "Railway start.sh runner: checking for backend or frontend..."

# If backend exists, start it with uvicorn
if [ -f backend/main.py ] || [ -f main.py ]; then
  echo "Starting backend..."
  if [ -d backend ]; then
    cd backend
  fi
  if [ -f requirements.txt ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt || true
  fi
  exec uvicorn main:app --host 0.0.0.0 --port "$PORT"
fi

# If frontend exists, serve built output with vite preview
if [ -f frontend/package.json ]; then
  echo "Starting frontend preview..."
  cd frontend
  # Install node modules if needed
  npm ci --silent || npm install --silent || true
  exec npm run preview -- --port "$PORT"
fi

echo "No backend or frontend start command found. Exiting with error."
exit 1

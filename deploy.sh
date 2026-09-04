#!/usr/bin/env bash
# CompEngine hub — deploy the checked-out branch on a server.
#
#   git pull && ./deploy.sh
#
# Installs dependencies, builds the client assets, runs migrations and clears caches.
# It never touches .env or storage/. The SSR bundle (bootstrap/ssr) is committed, so
# only the client build runs here.
set -euo pipefail
cd "$(dirname "$0")"

echo "→ PHP dependencies"
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "→ Node dependencies"
npm ci --no-audit --no-fund

echo "→ Building client assets"
npx vite build

echo "→ Database migrations"
php artisan migrate --force

echo "→ Clearing caches"
php artisan optimize:clear

echo "✓ Deployed $(git rev-parse --short HEAD) ($(git rev-parse --abbrev-ref HEAD))"

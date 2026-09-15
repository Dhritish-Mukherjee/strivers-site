#!/bin/bash
set -e

echo "==> Pulling latest changes from git origin main..."
cd /opt/services/strivers-site
git fetch origin main
git checkout main
git pull origin main

echo "==> Building frontend..."
cd /opt/services/strivers-site/frontend
npm install
npm run build

echo "==> Installing backend dependencies..."
cd /opt/services/strivers-site/backend
npm install

echo "==> Restarting strivers-site systemd service..."
systemctl restart strivers-site.service

echo "==> strivers-site deployment successful! Service status:"
systemctl status strivers-site.service --no-pager

#!/bin/bash
set -e

echo "==> Restarting strivers-site service..."
systemctl restart strivers-site.service

echo "==> Service reloaded successfully!"
systemctl status strivers-site.service --no-pager

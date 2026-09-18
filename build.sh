#!/bin/bash
set -e
echo "==> Installing dependencies in 'vins website update'..."
npm install --prefix "vins website update" --include=dev
echo "==> Building Vite app..."
npm --prefix "vins website update" run build
echo "==> Build complete!"

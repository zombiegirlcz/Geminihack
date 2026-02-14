#!/bin/bash
# RENEGADE KERNEL - CLI BUILDER
# Transforms and installs the official CLI as Renegade Edition

set -e

REAL_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Building RENEGADE CLI from $REAL_PATH..."

cd "$REAL_PATH"

# Instalace závislostí monorepa (vynechání volitelných nativních modulů pro Termux)
npm install --omit=optional

# Sestavení bundle
npm run bundle

# Globální instalace CLI z kořene projektu
npm link --force

echo "✅ RENEGADE CLI is now installed as 'renegade' command."

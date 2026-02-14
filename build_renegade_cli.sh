#!/bin/bash
# RENEGADE KERNEL - CLI BUILDER
# Transforms and installs the official CLI as Renegade Edition

set -e

REAL_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Building RENEGADE CLI from $REAL_PATH..."

cd "$REAL_PATH"

# Instalace závislostí monorepa
npm install

# Sestavení balíčků
npm run build

# Globální instalace CLI
cd packages/cli
npm link --force

echo "✅ RENEGADE CLI is now installed as 'renegade' command."

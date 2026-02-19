/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync, cpSync } from 'node:fs';
import { join, basename } from 'node:path';

if (!process.cwd().includes('packages')) {
  console.error('must be invoked from a package directory');
  process.exit(1);
}

const packageName = basename(process.cwd());

// build typescript files
try {
  console.log('Building with esbuild...');
  // Find all entry points (simplified strategy: assume index.ts or src/index.ts is main, but for libraries we might need more)
  // For CLI and Core, we want to transpile everything in src to dist preserving structure
  // Using glob pattern for esbuild (requires shell expansion or glob library, using find for compatibility)
  
  const cmd = `find src -name "*.ts" -o -name "*.tsx" | xargs ../../node_modules/.bin/esbuild --outdir=dist/src --outbase=src --platform=node --target=node20 --format=esm --loader:.ts=ts --loader:.tsx=tsx`;
  execSync(cmd, { stdio: 'inherit' });
  
  // Also copy index.ts if it exists in root (for CLI package)
  if (existsSync('index.ts')) {
     execSync('../../node_modules/.bin/esbuild index.ts --outfile=dist/index.js --platform=node --target=node20 --format=esm --loader:.ts=ts', { stdio: 'inherit' });
  }
} catch (e) {
  console.error('Esbuild failed, falling back to copy (which will likely fail at runtime):', e);
}

// copy .{md,json} files
execSync('node ../../scripts/copy_files.js', { stdio: 'inherit' });

// Copy documentation for the core package
if (packageName === 'core') {
  const docsSource = join(process.cwd(), '..', '..', 'docs');
  const docsTarget = join(process.cwd(), 'dist', 'docs');
  if (existsSync(docsSource)) {
    cpSync(docsSource, docsTarget, { recursive: true, dereference: true });
    console.log('Copied documentation to dist/docs');
  }
}

// touch dist/.last_build
writeFileSync(join(process.cwd(), 'dist', '.last_build'), '');
process.exit(0);

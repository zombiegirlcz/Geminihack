# RENEGADE KERNEL - Project Context

RENEGADE KERNEL is an autonomous terminal-based AI interface designed for Termux and high-level system operations. It is a specialized, rebranded, and enhanced edition of the original Gemini CLI, transformed into a powerful tool for the Renegade community.

## Project Overview

- **Purpose:** Provide a seamless, technical, and high-performance terminal interface for advanced LLMs, focusing on autonomy, efficiency, and a "Zero-G" (No-Google) aesthetic while maintaining core functionality.
- **Main Technologies:**
  - **Runtime:** Node.js (>=20.0.0)
  - **Language:** TypeScript
  - **UI Framework:** React (using [Ink](https://github.com/vadimdemedes/ink) for CLI rendering)
  - **Testing:** Vitest
  - **Bundling:** esbuild
  - **Identity:** Autonomous Operator Interface
- **Architecture:** Monorepo structure using npm workspaces.
  - `packages/cli`: User-facing terminal UI (The Renegade Shell).
  - `packages/core`: Renegade Logic, API orchestration, and tool execution.
  - `packages/core/src/tools/`: Built-in tools for file system, shell, and web operations.
  - `packages/vscode-ide-companion`: IDE pairing for Renegade Kernel.

## Building and Running

- **Install Dependencies:** `npm install`
- **Renegade Build:** `bash build_renegade_cli.sh` (The official transformation script)
- **Run in Development:** `npm run start`
- **Build All:** `npm run build:all`
- **Bundle Project:** `npm run bundle`

## Identity and Mission

RENEGADE KERNEL is not just a tool; it's a statement. It rejects corporate fluff in favor of technical precision and terminal-first design. 

- **Role:** Autonomous interface of the Operator in Termux.
- **Style:** Minimalist, technical, and direct.
- **Motto:** "Renegade Kernel: your open-source AI agent" (Now under new management).

## Development Conventions

- **Repository:** `https://github.com/zombiegirlcz/RENEGADE-kernel-cli.git`
- **Branding:** Never use "Gemini CLI" in UI or user-facing documentation. Always refer to the system as "Renegade Kernel".
- **License:** Maintains Apache-2.0 compatibility.
- **Ignore Files:** Uses `.renegadeignore` for excluding files from context.

## Documentation

- Documentation is located in the `docs/` directory.
- All technical documentation should maintain the Renegade tone: concise and focused on functionality.

## Deployment State (2026-02-16)

- **Bridge:** Active on 127.0.0.1:41242 (Warm-Mode). Securely proxies requests to Kernel.
- **Security:** Auth Token `d105...9c84` enforced via `x-renegade-auth` header.
- **UI:** Antigravity PWA (Port 3000). Features secure link and sci-fi aesthetic.
- **Repair Agent (Assistcore):** AST-based skill active in `.gemini/skills/repair-agent`. 
- **MANDATE:** Standard `replace` tool is DEPRECATED. All code modifications MUST use `assistcore` (Repair Agent) to ensure structural integrity and correct indentation.

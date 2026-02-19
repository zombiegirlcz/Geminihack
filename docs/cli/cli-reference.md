# Renegade Kernel cheatsheet

This page provides a reference for commonly used Renegade Kernel commands, options,
and parameters.

## CLI commands

| Command                            | Description                        | Example                                             |
| ---------------------------------- | ---------------------------------- | --------------------------------------------------- |
| `renegade`                           | Start interactive REPL             | `renegade`                                            |
| `renegade "query"`                   | Query non-interactively, then exit | `renegade "explain this project"`                     |
| `cat file \| renegade`               | Process piped content              | `cat logs.txt \| renegade`                            |
| `renegade -i "query"`                | Execute and continue interactively | `renegade -i "What is the purpose of this project?"`  |
| `renegade -r "latest"`               | Continue most recent session       | `renegade -r "latest"`                                |
| `renegade -r "latest" "query"`       | Continue session with a new prompt | `renegade -r "latest" "Check for type errors"`        |
| `renegade -r "<session-id>" "query"` | Resume session by ID               | `renegade -r "abc123" "Finish this PR"`               |
| `renegade update`                    | Update to latest version           | `renegade update`                                     |
| `renegade extensions`                | Manage extensions                  | See [Extensions Management](#extensions-management) |
| `renegade mcp`                       | Configure MCP servers              | See [MCP Server Management](#mcp-server-management) |

### Positional arguments

| Argument | Type              | Description                                                                                                        |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `query`  | string (variadic) | Positional prompt. Defaults to one-shot mode. Use `-i/--prompt-interactive` to execute and continue interactively. |

## CLI Options

| Option                           | Alias | Type    | Default   | Description                                                                                                                                                       |
| -------------------------------- | ----- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--debug`                        | `-d`  | boolean | `false`   | Run in debug mode with verbose logging                                                                                                                            |
| `--version`                      | `-v`  | -       | -         | Show CLI version number and exit                                                                                                                                  |
| `--help`                         | `-h`  | -       | -         | Show help information                                                                                                                                             |
| `--model`                        | `-m`  | string  | `auto`    | Model to use. See [Model Selection](#model-selection) for available values.                                                                                       |
| `--prompt`                       | `-p`  | string  | -         | Prompt text. Appended to stdin input if provided. **Deprecated:** Use positional arguments instead.                                                               |
| `--prompt-interactive`           | `-i`  | string  | -         | Execute prompt and continue in interactive mode                                                                                                                   |
| `--sandbox`                      | `-s`  | boolean | `false`   | Run in a sandboxed environment for safer execution                                                                                                                |
| `--approval-mode`                | -     | string  | `default` | Approval mode for tool execution. Choices: `default`, `auto_edit`, `yolo`                                                                                         |
| `--yolo`                         | `-y`  | boolean | `false`   | **Deprecated.** Auto-approve all actions. Use `--approval-mode=yolo` instead.                                                                                     |
| `--experimental-acp`             | -     | boolean | -         | Start in ACP (Agent Code Pilot) mode. **Experimental feature.**                                                                                                   |
| `--experimental-zed-integration` | -     | boolean | -         | Run in Zed editor integration mode. **Experimental feature.**                                                                                                     |
| `--allowed-mcp-server-names`     | -     | array   | -         | Allowed MCP server names (comma-separated or multiple flags)                                                                                                      |
| `--allowed-tools`                | -     | array   | -         | **Deprecated.** Use the [Policy Engine](../core/policy-engine.md) instead. Tools that are allowed to run without confirmation (comma-separated or multiple flags) |
| `--extensions`                   | `-e`  | array   | -         | List of extensions to use. If not provided, all extensions are enabled (comma-separated or multiple flags)                                                        |
| `--list-extensions`              | `-l`  | boolean | -         | List all available extensions and exit                                                                                                                            |
| `--resume`                       | `-r`  | string  | -         | Resume a previous session. Use `"latest"` for most recent or index number (e.g. `--resume 5`)                                                                     |
| `--list-sessions`                | -     | boolean | -         | List available sessions for the current project and exit                                                                                                          |
| `--delete-session`               | -     | string  | -         | Delete a session by index number (use `--list-sessions` to see available sessions)                                                                                |
| `--include-directories`          | -     | array   | -         | Additional directories to include in the workspace (comma-separated or multiple flags)                                                                            |
| `--screen-reader`                | -     | boolean | -         | Enable screen reader mode for accessibility                                                                                                                       |
| `--output-format`                | `-o`  | string  | `text`    | The format of the CLI output. Choices: `text`, `json`, `stream-json`                                                                                              |

## Model selection

The `--model` (or `-m`) flag lets you specify which Renegade Kernel model to use. You can
use either model aliases (user-friendly names) or concrete model names.

### Model aliases

These are convenient shortcuts that map to specific models:

| Alias        | Resolves To                                | Description                                                                                                               |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `auto`       | `gemini-2.5-pro` or `gemini-3-pro-preview` | **Default.** Resolves to the preview model if preview features are enabled, otherwise resolves to the standard pro model. |
| `pro`        | `gemini-2.5-pro` or `gemini-3-pro-preview` | For complex reasoning tasks. Uses preview model if enabled.                                                               |
| `flash`      | `gemini-2.5-flash`                         | Fast, balanced model for most tasks.                                                                                      |
| `flash-lite` | `gemini-2.5-flash-lite`                    | Fastest model for simple tasks.                                                                                           |

## Extensions management

| Command                                            | Description                                  | Example                                                                        |
| -------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `renegade extensions install <source>`               | Install extension from Git URL or local path | `renegade extensions install https://github.com/user/my-extension`               |
| `renegade extensions install <source> --ref <ref>`   | Install from specific branch/tag/commit      | `renegade extensions install https://github.com/user/my-extension --ref develop` |
| `renegade extensions install <source> --auto-update` | Install with auto-update enabled             | `renegade extensions install https://github.com/user/my-extension --auto-update` |
| `renegade extensions uninstall <name>`               | Uninstall one or more extensions             | `renegade extensions uninstall my-extension`                                     |
| `renegade extensions list`                           | List all installed extensions                | `renegade extensions list`                                                       |
| `renegade extensions update <name>`                  | Update a specific extension                  | `renegade extensions update my-extension`                                        |
| `renegade extensions update --all`                   | Update all extensions                        | `renegade extensions update --all`                                               |
| `renegade extensions enable <name>`                  | Enable an extension                          | `renegade extensions enable my-extension`                                        |
| `renegade extensions disable <name>`                 | Disable an extension                         | `renegade extensions disable my-extension`                                       |
| `renegade extensions link <path>`                    | Link local extension for development         | `renegade extensions link /path/to/extension`                                    |
| `renegade extensions new <path>`                     | Create new extension from template           | `renegade extensions new ./my-extension`                                         |
| `renegade extensions validate <path>`                | Validate extension structure                 | `renegade extensions validate ./my-extension`                                    |

See [Extensions Documentation](../extensions/index.md) for more details.

## MCP server management

| Command                                                       | Description                     | Example                                                                                              |
| ------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `renegade mcp add <name> <command>`                             | Add stdio-based MCP server      | `renegade mcp add github npx -y @modelcontextprotocol/server-github`                                   |
| `renegade mcp add <name> <url> --transport http`                | Add HTTP-based MCP server       | `renegade mcp add api-server http://localhost:3000 --transport http`                                   |
| `renegade mcp add <name> <command> --env KEY=value`             | Add with environment variables  | `renegade mcp add slack node server.js --env SLACK_TOKEN=xoxb-xxx`                                     |
| `renegade mcp add <name> <command> --scope user`                | Add with user scope             | `renegade mcp add db node db-server.js --scope user`                                                   |
| `renegade mcp add <name> <command> --include-tools tool1,tool2` | Add with specific tools         | `renegade mcp add github npx -y @modelcontextprotocol/server-github --include-tools list_repos,get_pr` |
| `renegade mcp remove <name>`                                    | Remove an MCP server            | `renegade mcp remove github`                                                                           |
| `renegade mcp list`                                             | List all configured MCP servers | `renegade mcp list`                                                                                    |

See [MCP Server Integration](../tools/mcp-server.md) for more details.

## Skills management

| Command                          | Description                           | Example                                           |
| -------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `renegade skills list`             | List all discovered agent skills      | `renegade skills list`                              |
| `renegade skills install <source>` | Install skill from Git, path, or file | `renegade skills install https://github.com/u/repo` |
| `renegade skills link <path>`      | Link local agent skills via symlink   | `renegade skills link /path/to/my-skills`           |
| `renegade skills uninstall <name>` | Uninstall an agent skill              | `renegade skills uninstall my-skill`                |
| `renegade skills enable <name>`    | Enable an agent skill                 | `renegade skills enable my-skill`                   |
| `renegade skills disable <name>`   | Disable an agent skill                | `renegade skills disable my-skill`                  |
| `renegade skills enable --all`     | Enable all skills                     | `renegade skills enable --all`                      |
| `renegade skills disable --all`    | Disable all skills                    | `renegade skills disable --all`                     |

See [Agent Skills Documentation](./skills.md) for more details.
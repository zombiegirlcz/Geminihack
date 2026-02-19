# Internal documentation tool (`get_internal_docs`)

The `get_internal_docs` tool lets Renegade Kernel access its own technical
documentation to provide more accurate answers about its capabilities and usage.

## Description

This tool is used when Renegade Kernel needs to verify specific details about Renegade Kernel
CLI's internal features, built-in commands, or configuration options. It
provides direct access to the Markdown files in the `docs/` directory.

### Arguments

`get_internal_docs` takes one optional argument:

- `path` (string, optional): The relative path to a specific documentation file
  (for example, `cli/commands.md`). If omitted, the tool returns a list of all
  available documentation paths.

## Usage

The `get_internal_docs` tool is used exclusively by Renegade Kernel. You cannot
invoke this tool manually.

When Renegade Kernel uses this tool, it retrieves the content of the requested
documentation file and processes it to answer your question. This ensures that
the information provided by the AI is grounded in the latest project
documentation.

## Behavior

Renegade Kernel uses this tool to ensure technical accuracy:

- **Capability discovery:** If Renegade Kernel is unsure how a feature works, it can
  lookup the corresponding documentation.
- **Reference lookup:** Renegade Kernel can verify slash command sub-commands or
  specific setting names.
- **Self-correction:** Renegade Kernel can use the documentation to correct its
  understanding of Renegade Kernel's system logic.

## Next steps

- Explore the [Command reference](../cli/commands.md) for a detailed guide to
  slash commands.
- See the [Configuration guide](../get-started/configuration.md) for settings
  reference.
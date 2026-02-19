/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommandKind, type SlashCommand } from './types.js';
import { themeManager, DEFAULT_THEME } from '../themes/theme-manager.js';

export const renegadeCommand: SlashCommand = {
  name: 'renegade',
  description: 'Návrat k protokolu RENEGADE',
  kind: CommandKind.BUILT_IN,
  autoExecute: true,
  action: (context, _args) => {
    context.config.setPersona('renegade');
    themeManager.setActiveTheme(DEFAULT_THEME.name);
    context.ui.showFeedback('info', 'Návrat k protokolu RENEGADE. Systém stabilizován.');
  },
};

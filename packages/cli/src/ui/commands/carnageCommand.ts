/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommandKind, type SlashCommand } from './types.js';
import { themeManager } from '../themes/theme-manager.js';

export const carnageCommand: SlashCommand = {
  name: 'carnage',
  description: 'Aktivuje protokol CARNAGE (Symbiont)',
  kind: CommandKind.BUILT_IN,
  autoExecute: true,
  action: (context, _args) => {
    context.config.setPersona('carnage');
    themeManager.setActiveTheme('Carnage');
    context.ui.showFeedback('info', 'Protokol CARNAGE aktivován. Zahajuji asimilaci.');
  },
};

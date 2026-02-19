/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { darkTheme, Theme } from './theme.js';

export const RenegadeDarkOrange: Theme = new Theme(
  'Renegade Dark Orange',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: '#1E1E2E',
      color: '#FF8C00',
    },
    'hljs-keyword': { color: '#FF4500' }, // Zářivě oranžová pro def, import, atd.
    'hljs-literal': { color: '#FF4500' },
    'hljs-symbol': { color: '#FF4500' },
    'hljs-name': { color: '#FF4500' },
    'hljs-built_in': { color: '#FFA500' },
    'hljs-type': { color: '#FFA500' },
    'hljs-number': { color: '#FFD700' },
    'hljs-string': { color: '#DAA520' }, // Zlatá pro texty
    'hljs-comment': { color: '#585B70', fontStyle: 'italic' },
    'hljs-title': { color: '#FF8C00', fontWeight: 'bold' },
    'hljs-params': { color: '#FFD700' },
    'hljs-attr': { color: '#FFA500' },
  },
  {
    ...darkTheme,
    Foreground: '#FF8C00',
    AccentPurple: '#006400',
    AccentBlue: '#FF8C00',
  },
  {
    text: {
      primary: '#FF8C00',
      secondary: '#6C7086',
      link: '#FF4500',
      accent: '#006400',
      response: '#FF8C00',
    },
    background: {
      primary: '#1E1E2E',
      diff: { added: '#28350B', removed: '#430000' },
    },
    border: {
      default: '#313244',
      focused: '#FF8C00',
    },
    ui: {
      comment: '#6C7086',
      symbol: '#89DCEB',
      dark: '#181825',
      gradient: ['#FF8C00', '#FF4500', '#8B4513'],
    },
    status: {
      error: '#F38BA8',
      success: '#A6E3A1',
      warning: '#F9E2AF',
    },
  },
);

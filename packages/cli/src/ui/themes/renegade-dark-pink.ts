/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { darkTheme, Theme } from './theme.js';

export const RenegadeDarkPink: Theme = new Theme(
  'Renegade Dark Pink',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: '#1E1E2E',
      color: '#C3677F',
    },
    'hljs-keyword': { color: '#FF1493' }, // Neonově růžová pro def, import
    'hljs-literal': { color: '#FF1493' },
    'hljs-built_in': { color: '#847ACE' },
    'hljs-type': { color: '#847ACE' },
    'hljs-number': { color: '#4796E4' },
    'hljs-string': { color: '#89DCEB' }, // Azurová pro texty
    'hljs-comment': { color: '#847ACE', fontStyle: 'italic' },
    'hljs-variable': { color: '#FFC0CB' },
    'hljs-attr': { color: '#4796E4' },
  },
  {
    ...darkTheme,
    GradientColors: ['#4796E4', '#847ACE', '#C3677F'],
  },
  {
    text: {
      primary: '#C3677F',
      secondary: '#6C7086',
      link: '#4796E4',
      accent: '#FFC0CB',
      response: '#C3677F',
    },
    background: {
      primary: '#1E1E2E',
      diff: { added: '#28350B', removed: '#430000' },
    },
    border: {
      default: '#313244',
      focused: '#C3677F',
    },
    ui: {
      comment: '#6C7086',
      symbol: '#89DCEB',
      dark: '#181825',
      gradient: ['#4796E4', '#847ACE', '#C3677F'],
    },
    status: {
      error: '#F38BA8',
      success: '#A6E3A1',
      warning: '#F9E2AF',
    },
  },
);

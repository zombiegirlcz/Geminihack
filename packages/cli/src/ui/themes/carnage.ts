/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { darkTheme, Theme } from './theme.js';

export const Carnage: Theme = new Theme(
  'Carnage',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: '#0D0000',
      color: '#FF0000',
    },
    'hljs-keyword': { color: '#8B0000' }, 
    'hljs-literal': { color: '#FF0000' },
    'hljs-symbol': { color: '#FF0000' },
    'hljs-name': { color: '#FF0000' },
    'hljs-built_in': { color: '#FF3333' },
    'hljs-type': { color: '#FF3333' },
    'hljs-number': { color: '#FFFFFF' },
    'hljs-string': { color: '#AA0000' },
    'hljs-comment': { color: '#444444', fontStyle: 'italic' },
    'hljs-title': { color: '#FF0000', fontWeight: 'bold' },
    'hljs-params': { color: '#FF3333' },
    'hljs-attr': { color: '#FF0000' },
  },
  {
    ...darkTheme,
    Foreground: '#FF0000',
    AccentPurple: '#8B0000',
    AccentBlue: '#FF0000',
    Background: '#0D0000',
  },
  {
    text: {
      primary: '#FF0000',
      secondary: '#660000',
      link: '#FF3333',
      accent: '#8B0000',
      response: '#FF0000',
    },
    background: {
      primary: '#0D0000',
      diff: { added: '#220000', removed: '#440000' },
    },
    border: {
      default: '#330000',
      focused: '#FF0000',
    },
    ui: {
      comment: '#444444',
      symbol: '#FF0000',
      dark: '#000000',
      gradient: ['#FF0000', '#8B0000', '#000000'],
    },
    status: {
      error: '#FF0000',
      success: '#FF3333',
      warning: '#8B0000',
    },
  },
);

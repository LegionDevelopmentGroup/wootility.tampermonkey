// ==UserScript==
// @name         Wootility Blue→Green Gradient
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Applies a blue-to-green gradient across the 6 key rows
// @match        https://wootility.io/*
// @grant        none
// @license      PolyForm-Noncommercial-1.0.0
// ==/UserScript==

// Copyright (c) 2026 Legion Development Group Inc.
// Licensed under PolyForm Noncommercial 1.0.0 – see LICENSE file.

(function () {
  'use strict';

  const btn = document.createElement('button');
  btn.textContent = '🔵🟢 Gradient';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    padding: '10px 16px',
    background: 'linear-gradient(to bottom, #0000ff, #00ff00)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  });

  btn.addEventListener('click', () => {
    try {
      const root = JSON.parse(localStorage.getItem('persist:root'));
      const profiles = JSON.parse(root.profiles);
      const kbdArray = profiles.inactive[0].colors.kbdArray;

      const totalRows = kbdArray.length; // 6

      for (let row = 0; row < totalRows; row++) {
        const t = row / (totalRows - 1); // 0 → 1
        const color = {
          red: 0,
          green: Math.round(255 * t),
          blue: Math.round(255 * (1 - t)),
        };
        for (let col = 0; col < kbdArray[row].length; col++) {
          kbdArray[row][col] = { ...color };
        }
      }

      root.profiles = JSON.stringify(profiles);
      localStorage.setItem('persist:root', JSON.stringify(root));

      btn.textContent = '✅ Done!';
      setTimeout(() => (btn.textContent = '🔵🟢 Gradient'), 1500);
    } catch (e) {
      console.error('Wootility gradient error:', e);
      btn.textContent = '❌ Error';
      setTimeout(() => (btn.textContent = '🔵🟢 Gradient'), 2000);
    }
  });

  document.body.appendChild(btn);
})();

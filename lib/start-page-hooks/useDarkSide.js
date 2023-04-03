'use client';

import { useState, useEffect } from 'react';

export default function useDarkSide() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'light'
  );
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
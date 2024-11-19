import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default Purple',
    primary: '#8B5CF6',
    secondary: '#10B981',
    background: '#0F172A',
    surface: '#1E293B',
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8'
    }
  },
  ocean: {
    name: 'Ocean Blue',
    primary: '#3B82F6',
    secondary: '#06B6D4',
    background: '#0C4A6E',
    surface: '#164E63',
    text: {
      primary: '#F0F9FF',
      secondary: '#BAE6FD'
    }
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#F97316',
    secondary: '#FB923C',
    background: '#431407',
    surface: '#7C2D12',
    text: {
      primary: '#FFF7ED',
      secondary: '#FFEDD5'
    }
  },
  forest: {
    name: 'Forest Green',
    primary: '#22C55E',
    secondary: '#10B981',
    background: '#052E16',
    surface: '#064E3B',
    text: {
      primary: '#F0FDF4',
      secondary: '#DCFCE7'
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  const applyTheme = (themeName) => {
    setCurrentTheme(themeName);
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    const theme = themes[themeName];
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text-primary', theme.text.primary);
    root.style.setProperty('--color-text-secondary', theme.text.secondary);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: applyTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
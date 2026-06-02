import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { themes, STORAGE_KEY } from '../data/themeConfig';

// TODO 1: Tạo ThemeContext bằng createContext()
export const ThemeContext = createContext(null);

// TODO 2: Tạo ThemeProvider component
export function ThemeProvider({ children }) {
  // Read mode from localStorage, default is 'system'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    return savedMode || 'system';
  });

  // Read system theme prefers-color-scheme
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to changes in prefers-color-scheme
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setSystemPrefersDark(e.matches);
    };

    // Use modern or fallback listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Compute resolvedTheme and colors
  const resolvedTheme = useMemo(() => {
    if (mode === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemPrefersDark]);

  const colors = useMemo(() => {
    return themes[resolvedTheme] || themes.light;
  }, [resolvedTheme]);

  // changeMode function
  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  // Memoize the value to avoid redundant re-renders
  const contextValue = useMemo(() => ({
    mode,
    resolvedTheme,
    colors,
    changeMode,
  }), [mode, resolvedTheme, colors]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// TODO 3: Tạo custom hook useTheme()
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined || context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;


import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

type ThemeContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isLoaded: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Check if it's dark mode
  const isDarkMode = resolvedTheme === 'dark';

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: `Theme changed to ${newTheme} mode`,
      duration: 2000,
    });
  };

  // Set isLoaded state once theme is determined to prevent flashing
  useEffect(() => {
    if (typeof resolvedTheme !== 'undefined') {
      setIsLoaded(true);
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        isDarkMode,
        toggleTheme,
        isLoaded
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

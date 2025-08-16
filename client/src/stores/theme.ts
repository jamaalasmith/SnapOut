import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Update body data attribute for CSS theming
        if (typeof document !== 'undefined') {
          document.body.setAttribute('data-theme', theme);
        }
      },
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-store',
      onRehydrateStorage: () => (state) => {
        // Set initial theme on page load
        if (state && typeof document !== 'undefined') {
          document.body.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);
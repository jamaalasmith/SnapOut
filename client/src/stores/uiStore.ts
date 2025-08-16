import { create } from 'zustand';

interface UiState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  theme: 'light',
  loading: false,

  setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
  setLoading: (loading: boolean) => set({ loading }),
}));
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark'
  isSidebarOpen: boolean
  isSearchOpen: boolean
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setSidebarOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
  setSearchOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      isSidebarOpen: true,
      isSearchOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    }),
    {
      name: 'myui-storage',
    }
  )
)

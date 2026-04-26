import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_CONFIG } from '@/types'
import type { CustomizerConfig } from '@/types'

interface ThemeStore {
  config: CustomizerConfig
  set: <K extends keyof CustomizerConfig>(key: K, val: CustomizerConfig[K]) => void
  reset: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      config: { ...DEFAULT_CONFIG },
      set: (key, val) =>
        set(state => ({ config: { ...state.config, [key]: val } })),
      reset: () => set({ config: { ...DEFAULT_CONFIG } }),
    }),
    {
      name: 'nosugar-customizer',
      storage: {
        getItem: (name) => {
          const val = sessionStorage.getItem(name)
          return val ? JSON.parse(val) : null
        },
        setItem: (name, val) => sessionStorage.setItem(name, JSON.stringify(val)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
)

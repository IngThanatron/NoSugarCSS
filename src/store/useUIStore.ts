import { create } from 'zustand'

export interface Toast {
  id: string
  message: string
  type?: 'success' | 'info' | 'error'
}

interface UIStore {
  toasts: Toast[]
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = crypto.randomUUID()
    set(state => ({ toasts: [...state.toasts, { id, message, type }] }))
    // Auto-remove after 2.5s
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
    }, 2500)
  },
  removeToast: (id) =>
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}))

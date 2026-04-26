import { useUIStore } from '@/store/useUIStore'

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            background: t.type === 'error'
              ? 'oklch(35% 0.15 20)'
              : 'var(--warm-dark)',
            color: 'var(--cream)',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            animation: 'fadeIn 0.2s ease both',
            whiteSpace: 'nowrap',
          }}
        >
          {t.type === 'success' && <span style={{ marginRight: '8px' }}>✓</span>}
          {t.message}
        </div>
      ))}
    </div>
  )
}

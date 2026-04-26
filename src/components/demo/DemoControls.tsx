import type { Theme } from '@/types'
import type { AnimationId } from '@/types'

const COLOR_PRESETS = ['#f59e0b', '#ef4444', '#a855f7', '#3b82f6', '#10b981', '#ec4899', '#f97316', '#e11d48']
const ANIMATIONS: { id: AnimationId; label: string }[] = [
  { id: 'slide', label: 'Slide' },
  { id: 'bounce', label: 'Bounce' },
  { id: 'fade', label: 'Fade' },
  { id: 'pop', label: 'Pop' },
]

interface Props {
  themes: Theme[]
  selectedThemeId: string
  userColor: string
  animation: AnimationId
  onThemeChange: (id: string) => void
  onColorChange: (color: string) => void
  onAnimationChange: (id: AnimationId) => void
  isMobile: boolean
}

export function DemoControls({
  themes, selectedThemeId, userColor, animation,
  onThemeChange, onColorChange, onAnimationChange, isMobile,
}: Props) {
  return (
    <div
      style={{
        padding: '24px',
        borderRight: isMobile ? 'none' : '1.5px solid var(--border)',
        borderBottom: isMobile ? '1.5px solid var(--border)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: isMobile ? 'auto' : '220px',
      }}
    >
      {/* Theme */}
      <div>
        <Label>Theme</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 12px', borderRadius: '10px', border: 'none',
                background: selectedThemeId === t.id ? 'var(--cream2)' : 'transparent',
                color: selectedThemeId === t.id ? 'var(--warm-dark)' : 'var(--warm-muted)',
                fontWeight: selectedThemeId === t.id ? 600 : 400,
                fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s', textAlign: 'left',
                boxShadow: selectedThemeId === t.id ? 'var(--shadow)' : 'none',
                outline: selectedThemeId === t.id ? '1.5px solid var(--border)' : 'none',
              }}
            >
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Username color */}
      <div>
        <Label>Username Color</Label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {COLOR_PRESETS.map(c => (
            <button
              key={c}
              onClick={() => onColorChange(c)}
              aria-label={c}
              style={{
                width: '22px', height: '22px', borderRadius: '50%', background: c,
                border: userColor === c ? '2px solid var(--warm-dark)' : '2px solid transparent',
                cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>
        <input
          type="color"
          value={userColor}
          onChange={e => onColorChange(e.target.value)}
          style={{ width: '100%', height: '28px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}
        />
      </div>

      {/* Animation */}
      <div>
        <Label>Animation</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {ANIMATIONS.map(a => (
            <button
              key={a.id}
              onClick={() => onAnimationChange(a.id)}
              style={{
                padding: '6px 10px', borderRadius: '8px', fontSize: '0.78rem',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                background: animation === a.id ? 'var(--warm-dark)' : 'transparent',
                color: animation === a.id ? 'var(--cream)' : 'var(--warm-mid)',
                border: animation === a.id ? '1.5px solid var(--warm-dark)' : '1.5px solid var(--border)',
                transition: 'all 0.15s',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--warm-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

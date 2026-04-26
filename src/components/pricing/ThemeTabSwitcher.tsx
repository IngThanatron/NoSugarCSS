import type { Theme } from '@/types'

interface Props {
  themes: Theme[]
  selected: string
  onSelect: (id: string) => void
  pillBg: string
  pillColor: string
  pillBorder: string
}

export function ThemeTabSwitcher({ themes, selected, onSelect, pillBg, pillColor, pillBorder }: Props) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {themes.map(t => {
        const isActive = t.id === selected
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '100px',
              border: `1px solid ${isActive ? pillBorder : 'transparent'}`,
              background: isActive ? pillBg : 'transparent',
              color: isActive ? pillColor : 'rgba(255,255,255,0.4)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

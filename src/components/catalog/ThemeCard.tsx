import type { Theme } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { track } from '@/lib/plausible'

interface Props {
  theme: Theme
  onClick: () => void
}

export function ThemeCard({ theme, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        background: theme.cardStyle.cardBg,
        border: `1.5px solid ${theme.cardStyle.cardBorder}`,
        boxShadow: theme.cardStyle.cardShadow,
        cursor: 'pointer',
        transition: 'transform 0.18s, box-shadow 0.18s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = theme.cardStyle.cardShadow + ', 0 12px 32px rgba(0,0,0,0.28)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = theme.cardStyle.cardShadow
      }}
    >
      {/* ── Chat preview ── */}
      <div style={{ background: theme.bg, padding: '10px 10px 0', flexShrink: 0 }}>
        {/* Header bar */}
        <div style={{
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.headerBorder}`,
          borderRadius: '8px 8px 0 0',
          padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.headerColor, flexShrink: 0 }} />
          <span style={{ color: theme.headerColor, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            {theme.headerTitle}
          </span>
          {/* Window dots */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>
        </div>
        {/* Messages */}
        <div style={{ background: theme.bg, borderRadius: '0 0 0 0', padding: '8px 6px', minHeight: '72px' }}>
          {theme.sampleUsers.slice(0, 3).map((u, i) => (
            <div key={i} style={{
              padding: '3px 7px', borderRadius: '5px', marginBottom: '4px',
              background: theme.msgBg, border: `1px solid ${theme.msgBorder}`,
              fontSize: '0.65rem', display: 'flex', gap: '5px',
            }}>
              <span style={{ color: theme.userColor, fontWeight: 700, flexShrink: 0 }}>{u}</span>
              <span style={{ color: theme.textColor, opacity: 0.85 }}>
                {i === 0 ? 'PogChamp 🔥' : i === 1 ? 'let\'s gooo!' : 'gg! 🎮'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Name + badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{theme.icon}</span>
            <span style={{ color: theme.cardStyle.pillColor, fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {theme.label}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
            {theme.isNew && <Badge variant="green">NEW</Badge>}
            {theme.isPopular && <Badge variant="orange">HOT</Badge>}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {theme.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.6rem', color: theme.cardStyle.pillColor,
              background: theme.cardStyle.pillBg, border: `1px solid ${theme.cardStyle.pillBorder}`,
              padding: '2px 6px', borderRadius: '100px', textTransform: 'capitalize',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: `1px solid ${theme.cardStyle.cardBorder}` }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', color: theme.cardStyle.pillColor }}>
            {theme.price === 0 ? 'Free' : `${theme.price} THB`}
          </span>
          <button
            style={{
              padding: '6px 14px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
              background: theme.cardStyle.pillBg, color: theme.cardStyle.pillColor,
              border: `1px solid ${theme.cardStyle.pillBorder}`,
              cursor: theme.kofiUrl ? 'pointer' : 'default',
              fontFamily: 'inherit', flexShrink: 0,
              opacity: theme.kofiUrl ? 1 : 0.6,
            }}
            onClick={e => {
              e.stopPropagation()
              if (theme.kofiUrl) {
                track('buy_click', { theme: theme.id, source: 'catalog' })
                window.open(theme.kofiUrl, '_blank', 'noopener')
              }
            }}
          >
            {theme.price === 0 ? 'Get free →' : theme.kofiUrl ? 'Buy →' : 'Soon'}
          </button>
        </div>
      </div>
    </div>
  )
}

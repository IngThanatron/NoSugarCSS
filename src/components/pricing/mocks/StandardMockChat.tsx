import type { Theme } from '@/types'

interface Props {
  theme: Theme
}

export function StandardMockChat({ theme }: Props) {
  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        background: theme.bg,
        border: `1px solid ${theme.headerBorder}`,
        boxShadow: theme.cardStyle.cardShadow,
        fontSize: '0.78rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.headerBorder}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: theme.headerColor,
            boxShadow: `0 0 6px ${theme.headerColor}`,
          }}
        />
        <span
          style={{
            color: theme.headerColor,
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
          }}
        >
          {theme.headerTitle}
        </span>
      </div>

      {/* Messages */}
      <div style={{ padding: '8px' }}>
        {theme.sampleUsers.map((user, i) => (
          <div
            key={i}
            style={{
              padding: '5px 8px',
              borderRadius: '6px',
              marginBottom: '4px',
              background: theme.msgBg,
              border: `1px solid ${theme.msgBorder}`,
              animation: `chatSlide 0.35s ease ${i * 0.15}s both`,
            }}
          >
            <span style={{ color: theme.userColor, fontWeight: 700, marginRight: '6px' }}>
              {user}
            </span>
            <span style={{ color: theme.textColor }}>gg wp! 🎮</span>
          </div>
        ))}
      </div>
    </div>
  )
}

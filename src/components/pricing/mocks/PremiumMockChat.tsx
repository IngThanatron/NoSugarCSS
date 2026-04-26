const MESSAGES = [
  { user: 'TopFan', text: 'this is incredible 🔥', userColor: '#ff6b9d' },
  { user: 'UniqueUser', text: 'only mine ✦', userColor: '#c084fc' },
  { user: 'CustomViewer', text: 'bespoke overlay ⚡', userColor: '#60a5fa' },
]

export function PremiumMockChat() {
  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0118, #050010)',
        border: '1px solid #c084fc33',
        boxShadow: '0 0 32px #c084fc11, 0 8px 40px #0007',
        fontSize: '0.78rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: 'relative',
      }}
    >
      {/* Animated grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(192,132,252,0.03) 0px, rgba(192,132,252,0.03) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(0deg, rgba(192,132,252,0.03) 0px, rgba(192,132,252,0.03) 1px, transparent 1px, transparent 32px)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          background: '#08000f',
          borderBottom: '1px solid #c084fc33',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c084fc',
            boxShadow: '0 0 8px #c084fc',
          }}
        />
        <span
          style={{
            color: '#c084fc',
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            textShadow: '0 0 12px #c084fc66',
          }}
        >
          ✦ UNIQUE CHAT
        </span>
        <span
          style={{
            marginLeft: 'auto',
            color: '#c084fc88',
            fontSize: '0.62rem',
            letterSpacing: '0.08em',
          }}
        >
          CUSTOM
        </span>
      </div>

      {/* Messages */}
      <div style={{ padding: '8px', position: 'relative' }}>
        {MESSAGES.map((m, i) => (
          <div
            key={i}
            style={{
              padding: '5px 8px',
              borderRadius: '6px',
              marginBottom: '4px',
              background: 'rgba(192,132,252,0.06)',
              border: '1px solid #c084fc22',
              boxShadow: i === 0 ? '0 0 12px #c084fc11' : undefined,
            }}
          >
            <span
              style={{
                color: m.userColor,
                fontWeight: 700,
                marginRight: '6px',
                textShadow: `0 0 8px ${m.userColor}66`,
              }}
            >
              {m.user}
            </span>
            <span style={{ color: '#d8b4fe' }}>{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MESSAGES = [
  { user: 'ChatUser', text: 'hello!', userColor: '#a855f7' },
  { user: 'Viewer99', text: 'PogChamp 🎮', userColor: '#6366f1' },
  { user: 'NightOwl', text: 'so clean ✨', userColor: '#8b5cf6' },
]

export function FreeMockChat() {
  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a0533, #0f0c29)',
        border: '1px solid #a855f755',
        boxShadow: '0 4px 24px #a855f722',
        fontSize: '0.78rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          background: '#0f0c29',
          borderBottom: '1px solid #a855f733',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7' }} />
        <span style={{ color: '#a855f7', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}>
          CHAT
        </span>
        <span
          style={{
            marginLeft: 'auto',
            background: '#a855f722',
            color: '#a855f7',
            fontSize: '0.65rem',
            padding: '2px 8px',
            borderRadius: '100px',
            border: '1px solid #a855f744',
          }}
        >
          watermark
        </span>
      </div>

      {/* Messages */}
      <div style={{ padding: '8px' }}>
        {MESSAGES.map((m, i) => (
          <div
            key={i}
            style={{
              padding: '5px 8px',
              borderRadius: '6px',
              marginBottom: '4px',
              background: '#a855f711',
              border: '1px solid #a855f722',
            }}
          >
            <span style={{ color: m.userColor, fontWeight: 700, marginRight: '6px' }}>
              {m.user}
            </span>
            <span style={{ color: '#d8b4fe' }}>{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

import type { Theme } from '@/types'
import type { AnimationId } from '@/types'

interface DemoMessage { user: string; text: string }

interface Props {
  theme: Theme
  userColor: string
  animation: AnimationId
  messages: DemoMessage[]
  onSendChat: () => void
}

export function DemoPreview({ theme, userColor, animation, messages, onSendChat }: Props) {
  const animClass = `anim-${animation}-in`

  return (
    <div
      style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* Live chat window */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: theme.bg,
          border: `1px solid ${theme.headerBorder}`,
          boxShadow: theme.cardStyle.cardShadow,
          minHeight: '200px',
        }}
      >
        {/* Header */}
        <div style={{ padding: '10px 14px', background: theme.headerBg, borderBottom: `1px solid ${theme.headerBorder}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: theme.headerColor, boxShadow: `0 0 6px ${theme.headerColor}` }} />
          <span style={{ color: theme.headerColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>{theme.headerTitle}</span>
        </div>

        {/* Messages */}
        <div style={{ padding: '8px', minHeight: '120px' }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={animClass}
              style={{
                padding: '5px 8px',
                borderRadius: '6px',
                marginBottom: '4px',
                background: theme.msgBg,
                border: `1px solid ${theme.msgBorder}`,
                fontSize: '0.8rem',
              }}
            >
              <span style={{ color: userColor, fontWeight: 700, marginRight: '6px' }}>{m.user}</span>
              <span style={{ color: theme.textColor }}>{m.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '320px' }}>
        <button
          onClick={onSendChat}
          style={{
            width: '100%', padding: '10px', borderRadius: '10px',
            background: 'var(--warm-dark)', color: 'var(--cream)',
            border: 'none', fontSize: '0.85rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--orange)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--warm-dark)')}
        >
          Send Chat
        </button>
        <a
          href="/customize"
          style={{ color: 'var(--orange)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}
        >
          Open Full Customizer →
        </a>
        <p style={{ color: 'var(--warm-muted)', fontSize: '0.72rem', textAlign: 'center', lineHeight: 1.5 }}>
          ✦ Full tool lets you control fonts, sizes, borders, mascots & more — copy your CSS instantly
        </p>
      </div>
    </div>
  )
}

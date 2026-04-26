import { Link } from 'react-router-dom'

interface Props {
  onSendChat?: () => void
  onToggleAutoChat?: () => void
  autoChatActive?: boolean
  onSendDonation?: () => void
  onCopyCSS?: () => void
  copied?: boolean
}

export function CustomizerTopBar({
  onSendChat,
  onToggleAutoChat,
  autoChatActive = false,
  onSendDonation,
  onCopyCSS,
  copied = false,
}: Props) {
  return (
    <div
      style={{
        height: '56px',
        background: 'oklch(99.5% 0.008 72)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      {/* Logo + breadcrumb */}
      <Link
        to="/"
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1rem',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginRight: '8px',
        }}
      >
        <span style={{ color: 'var(--orange)' }}>NoSugar</span>
        <span style={{ color: 'var(--warm-dark)' }}> CSS Chat</span>
      </Link>
      <span style={{ color: 'var(--warm-muted)', fontSize: '0.85rem' }}>/ Customize</span>

      <div style={{ flex: 1 }} />

      {/* Action buttons */}
      <TopBarBtn onClick={onSendChat} icon="→" label="Send Chat" />

      {/* Auto Chat with pulse dot */}
      <button
        onClick={onToggleAutoChat}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: autoChatActive ? 'var(--orange-dim)' : 'transparent',
          color: autoChatActive ? 'var(--orange)' : 'var(--warm-mid)',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}
      >
        {autoChatActive && (
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--orange)',
              animation: 'pulse 1.2s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
        )}
        Auto Chat
      </button>

      <TopBarBtn onClick={onSendDonation} icon="❤" label="Donation" />

      <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

      {/* Copy CSS — primary */}
      <button
        onClick={onCopyCSS}
        style={{
          padding: '7px 18px',
          borderRadius: '8px',
          border: 'none',
          background: copied ? 'oklch(50% 0.12 145)' : 'var(--warm-dark)',
          color: 'var(--cream)',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {copied ? '✓ Copied!' : 'Copy CSS'}
      </button>
    </div>
  )
}

function TopBarBtn({
  onClick,
  icon,
  label,
}: {
  onClick?: () => void
  icon: string
  label: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 14px',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--warm-mid)',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--warm-dark)'
        e.currentTarget.style.borderColor = 'var(--warm-mid)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--warm-mid)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

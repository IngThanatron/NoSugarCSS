interface Props {
  css: string
  onCopy?: () => void
  copied?: boolean
}

export function CSSCodePanel({ css, onCopy, copied = false }: Props) {
  return (
    <div
      style={{
        height: '160px',
        background: 'oklch(12% 0.01 270)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            color: 'oklch(50% 0.01 270)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          // generated CSS
        </span>
        <button
          onClick={onCopy}
          style={{
            fontSize: '0.72rem',
            color: copied ? 'oklch(50% 0.12 145)' : 'oklch(75% 0.04 270)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            transition: 'color 0.2s',
          }}
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Code */}
      <pre
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '10px 14px',
          margin: 0,
          fontSize: '0.72rem',
          lineHeight: 1.6,
          fontFamily: "'JetBrains Mono', monospace",
          color: 'oklch(75% 0.04 270)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
      >
        <CSSTokens css={css} />
      </pre>
    </div>
  )
}

// Lightweight syntax highlight — no dependencies
function CSSTokens({ css }: { css: string }) {
  const parts = css.split(/(\/\*.*?\*\/|#[\w-]+\s*\{|\.[\w-]+\s*\{|\}|[\w-]+\s*:)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('/*')) return <span key={i} style={{ color: 'oklch(50% 0.01 270)' }}>{part}</span>
        if (part.match(/^[#.][\w-]+\s*\{/)) return <span key={i} style={{ color: 'oklch(75% 0.1 60)' }}>{part}</span>
        if (part.match(/^[\w-]+\s*:/)) return <span key={i} style={{ color: 'oklch(70% 0.12 220)' }}>{part}</span>
        if (part === '}') return <span key={i} style={{ color: 'oklch(75% 0.1 60)' }}>{part}</span>
        return <span key={i} style={{ color: 'oklch(80% 0.1 150)' }}>{part}</span>
      })}
    </>
  )
}

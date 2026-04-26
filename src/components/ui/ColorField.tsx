interface Props {
  label: string
  value: string
  onChange?: (val: string) => void
}

export function ColorField({ label, value, onChange }: Props) {
  const handleHex = (raw: string) => {
    if (/^#[0-9a-fA-F]{0,6}$/.test(raw)) onChange?.(raw)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--warm-muted)', fontWeight: 500 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Native color picker hidden behind swatch */}
        <label style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: value,
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          />
          <input
            type="color"
            value={value}
            onChange={e => onChange?.(e.target.value)}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
          />
        </label>

        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={e => handleHex(e.target.value)}
          maxLength={7}
          style={{
            flex: 1,
            background: 'var(--cream2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '5px 8px',
            fontSize: '0.75rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--warm-dark)',
            outline: 'none',
          }}
        />
      </div>
    </div>
  )
}

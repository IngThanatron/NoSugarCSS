interface Props {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange?: (val: string) => void
}

export function SelectField({ label, value, options, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--warm-muted)', fontWeight: 500 }}>
        {label}
      </span>
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        style={{
          background: 'var(--cream2)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '6px 8px',
          fontSize: '0.82rem',
          color: 'var(--warm-dark)',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

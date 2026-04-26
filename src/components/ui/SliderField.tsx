interface Props {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange?: (val: number) => void
}

export function SliderField({ label, value, min, max, step = 1, unit = '', onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--warm-muted)', fontWeight: 500 }}>
          {label}
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--orange)',
            background: 'var(--orange-dim)',
            padding: '2px 7px',
            borderRadius: '100px',
          }}
        >
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange?.(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--orange)',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

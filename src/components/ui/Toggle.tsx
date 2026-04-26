interface Props {
  label: string
  value: boolean
  onChange?: (val: boolean) => void
}

export function Toggle({ label, value, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <span style={{ fontSize: '0.82rem', color: 'var(--warm-mid)', fontWeight: 500 }}>
        {label}
      </span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange?.(!value)}
        style={{
          width: '36px',
          height: '20px',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          background: value ? 'oklch(50% 0.12 145)' : 'var(--border)',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: value ? '18px' : '2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  )
}

interface Props {
  visible: boolean
}

export function MascotArea({ visible }: Props) {
  if (!visible) return null

  return (
    <div
      style={{
        width: '100px',
        height: '120px',
        borderRadius: '12px',
        border: '2px dashed oklch(60% 0.02 270 / 0.4)',
        background: `repeating-linear-gradient(
          45deg,
          oklch(40% 0.02 222 / 0.15),
          oklch(40% 0.02 222 / 0.15) 4px,
          transparent 4px,
          transparent 12px
        )`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '1.8rem' }}>🐱</span>
      <span
        style={{
          fontSize: '0.65rem',
          color: 'oklch(60% 0.02 270)',
          letterSpacing: '0.06em',
        }}
      >
        your mascot
      </span>
    </div>
  )
}

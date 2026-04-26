interface Props {
  title: string
  titleColor: string
  headerBg: string
}

export function ChatHeader({ title, titleColor, headerBg }: Props) {
  return (
    <div
      style={{
        padding: '10px 14px',
        background: headerBg,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: titleColor,
          boxShadow: `0 0 6px ${titleColor}`,
        }}
      />
      <span
        style={{
          color: titleColor,
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </span>
    </div>
  )
}

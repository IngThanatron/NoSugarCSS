interface FloatBubbleProps {
  user: string
  text: string
  userColor: string
  style: React.CSSProperties
  animationDelay: string
  animationDuration: string
  bubbleStyle: React.CSSProperties
}

export function FloatBubble({
  user,
  text,
  userColor,
  style,
  animationDelay,
  animationDuration,
  bubbleStyle,
}: FloatBubbleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        animation: `floatUp ${animationDuration} ease-in-out ${animationDelay} infinite`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          ...bubbleStyle,
        }}
      >
        <span style={{ color: userColor, fontWeight: 700, marginRight: '6px' }}>
          {user}
        </span>
        <span>{text}</span>
      </div>
    </div>
  )
}

import type { CustomizerConfig } from '@/types'

interface Props {
  user: string
  text: string
  config: CustomizerConfig
  animClass: string
}

export function ChatMessage({ user, text, config, animClass }: Props) {
  const msgBgStyle = config.msgBgEnabled
    ? {
        background: `rgba(${hexToRgb(config.msgBgColor)}, ${config.msgBgOpacity / 100})`,
        border: `1px solid rgba(${hexToRgb(config.msgBgColor)}, ${config.msgBgOpacity / 100 + 0.05})`,
      }
    : { background: 'transparent', border: '1px solid transparent' }

  return (
    <div
      className={animClass}
      style={{
        padding: `${config.paddingY}px ${config.paddingX}px`,
        borderRadius: `${config.borderRadius}px`,
        marginBottom: `${config.msgSpacing}px`,
        fontSize: `${config.fontSize}px`,
        fontFamily: `'${config.fontFamily}', sans-serif`,
        fontWeight: config.fontWeight,
        ...msgBgStyle,
      }}
    >
      <span style={{ color: config.usernameColor, fontWeight: 700, marginRight: '6px' }}>
        {user}
      </span>
      <span style={{ color: config.fontColor }}>{text}</span>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

import type { CustomizerConfig } from '@/types'
import type { ChatMsg } from '@/data/messages'
import { ChatWindow } from '@/components/chat/ChatWindow'

interface Props {
  config: CustomizerConfig
  messages: ChatMsg[]
}

export function PreviewPanel({ config, messages }: Props) {
  return (
    <div
      style={{
        flex: 1,
        background: 'oklch(20% 0.01 270)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(120,60,255,0.03) 0px, rgba(120,60,255,0.03) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(0deg, rgba(0,200,255,0.02) 0px, rgba(0,200,255,0.02) 1px, transparent 1px, transparent 40px)
          `,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Preview label */}
      <span
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          fontSize: '0.65rem',
          color: 'oklch(60% 0.02 270)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Live Preview
      </span>

      <ChatWindow config={config} messages={messages} />
    </div>
  )
}

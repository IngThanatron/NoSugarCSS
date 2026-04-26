import { useRef, useEffect } from 'react'
import type { CustomizerConfig } from '@/types'
import type { ChatMsg } from '@/data/messages'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { DonationMessage } from './DonationMessage'
import { MascotArea } from './MascotArea'

interface Props {
  config: CustomizerConfig
  messages: ChatMsg[]
}

export function ChatWindow({ config, messages }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const animClass = `anim-${config.animation}-in`

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages])

  const bodyBg = config.transparentBg
    ? 'transparent'
    : config.chatBg

  return (
    <div
      style={{
        width: '340px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: config.transparentBg
          ? `repeating-conic-gradient(#aaa 0% 25%, #eee 0% 50%) 0 0 / 16px 16px`
          : config.chatBg,
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '420px',
      }}
    >
      <ChatHeader
        title={config.titleText}
        titleColor={config.titleColor}
        headerBg={config.headerBg}
      />

      <div
        ref={bodyRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          background: bodyBg,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
      >
        {messages.map((msg, i) =>
          msg.isDonation ? (
            <DonationMessage
              key={i}
              user={msg.user}
              amount={msg.amount ?? 0}
              text={msg.text}
              animClass={animClass}
            />
          ) : (
            <ChatMessage
              key={i}
              user={msg.user}
              text={msg.text}
              config={config}
              animClass={animClass}
            />
          )
        )}
      </div>

      {config.showMascot && (
        <div style={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }}>
          <MascotArea visible={config.showMascot} />
        </div>
      )}
    </div>
  )
}

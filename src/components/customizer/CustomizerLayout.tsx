import type { ReactNode } from 'react'
import type { CustomizerConfig } from '@/types'
import type { ChatMsg } from '@/data/messages'
import { CustomizerTopBar } from './CustomizerTopBar'
import { CustomizerSidebar } from './CustomizerSidebar'
import { PreviewPanel } from './PreviewPanel'
import { CSSCodePanel } from './CSSCodePanel'

interface Props {
  config: CustomizerConfig
  messages: ChatMsg[]
  generatedCSS: string
  autoChatActive: boolean
  copied: boolean
  topBanner?: ReactNode
  onChange?: <K extends keyof CustomizerConfig>(key: K, val: CustomizerConfig[K]) => void
  onSendChat?: () => void
  onToggleAutoChat?: () => void
  onSendDonation?: () => void
  onCopyCSS?: () => void
}

export function CustomizerLayout({
  config,
  messages,
  generatedCSS,
  autoChatActive,
  copied,
  topBanner,
  onChange,
  onSendChat,
  onToggleAutoChat,
  onSendDonation,
  onCopyCSS,
}: Props) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <CustomizerTopBar
        onSendChat={onSendChat}
        onToggleAutoChat={onToggleAutoChat}
        autoChatActive={autoChatActive}
        onSendDonation={onSendDonation}
        onCopyCSS={onCopyCSS}
        copied={copied}
      />

      {/* Main body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', flexShrink: 0, overflow: 'hidden' }}>
          {topBanner && (
            <div style={{ padding: '16px 16px 0', flexShrink: 0 }}>
              {topBanner}
            </div>
          )}
          <CustomizerSidebar config={config} onChange={onChange} />
        </div>

        {/* Right: preview + CSS panel stacked */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <PreviewPanel config={config} messages={messages} />
          <CSSCodePanel css={generatedCSS} onCopy={onCopyCSS} copied={copied} />
        </div>
      </div>
    </div>
  )
}

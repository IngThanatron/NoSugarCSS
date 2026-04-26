import { useState, useRef, useCallback } from 'react'
import { STD_THEMES } from '@/data/themes'
import { POOL_MESSAGES } from '@/data/messages'
import type { AnimationId } from '@/types'
import { DemoControls } from './DemoControls'
import { DemoPreview } from './DemoPreview'
import { useIsMobile } from '@/hooks/useIsMobile'

const INITIAL_MESSAGES = POOL_MESSAGES.slice(0, 3).map(m => ({ user: m.user, text: m.text }))

export function InteractiveDemo() {
  const isMobile = useIsMobile()
  const [selectedThemeId, setSelectedThemeId] = useState(STD_THEMES[0].id)
  const [userColor, setUserColor] = useState('#f59e0b')
  const [animation, setAnimation] = useState<AnimationId>('slide')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const poolIdx = useRef(3)

  const selectedTheme = STD_THEMES.find(t => t.id === selectedThemeId) ?? STD_THEMES[0]

  const handleSendChat = useCallback(() => {
    const msg = POOL_MESSAGES[poolIdx.current % POOL_MESSAGES.length]
    poolIdx.current++
    setMessages(prev => [...prev.slice(-4), { user: msg.user, text: msg.text }])
  }, [])

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Demo header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--warm-dark)' }}>
          Standard Plan — Try It Live
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--warm-muted)' }}>
          490 THB ✦ One-time
        </p>
      </div>

      {/* Body: controls + preview */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr' }}>
        <DemoControls
          themes={STD_THEMES}
          selectedThemeId={selectedThemeId}
          userColor={userColor}
          animation={animation}
          onThemeChange={setSelectedThemeId}
          onColorChange={setUserColor}
          onAnimationChange={setAnimation}
          isMobile={isMobile}
        />
        <DemoPreview
          theme={selectedTheme}
          userColor={userColor}
          animation={animation}
          messages={messages}
          onSendChat={handleSendChat}
        />
      </div>
    </div>
  )
}

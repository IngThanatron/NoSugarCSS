import { useState, useCallback, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useThemeStore } from '@/store/useThemeStore'
import { useUIStore } from '@/store/useUIStore'
import { useAutoChat } from '@/hooks/useAutoChat'
import { useCopyCSS } from '@/hooks/useCopyCSS'
import { generateCSS } from '@/lib/cssGenerator'
import { track } from '@/lib/plausible'
import { POOL_MESSAGES, DONATION_MESSAGES } from '@/data/messages'
import type { ChatMsg } from '@/data/messages'
import { CustomizerLayout } from '@/components/customizer/CustomizerLayout'
import { LicenseBanner } from '@/components/customizer/LicenseBanner'
import { ToastContainer } from '@/components/ui/Toast'
import type { CustomizerConfig } from '@/types'

const MAX_MESSAGES = 20

export function CustomizePage() {
  const { config, set } = useThemeStore()
  const { addToast } = useUIStore()
  const { copied, copy } = useCopyCSS()
  const [searchParams, setSearchParams] = useSearchParams()

  const [messages, setMessages] = useState<ChatMsg[]>(POOL_MESSAGES.slice(0, 4))
  const [autoChat, setAutoChat] = useState(false)
  const [licensed, setLicensed] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const poolIdx = useRef(0)
  const donationIdx = useRef(0)

  // Verify a license key against the API
  const verifyKey = useCallback(async (key: string) => {
    setIsVerifying(true)
    try {
      const res = await fetch(`/api/verify-license?key=${encodeURIComponent(key)}`)
      const data = await res.json() as { valid: boolean; planId?: string }
      if (data.valid) {
        setLicensed(true)
        setSearchParams({ license: key }, { replace: true })
        addToast('License activated! Watermark removed.')
        track('license_verified', { plan: data.planId ?? 'unknown' })
      } else {
        addToast('Invalid or inactive license key.')
      }
    } catch {
      addToast('Could not verify license. Try again.')
    } finally {
      setIsVerifying(false)
    }
  }, [addToast, setSearchParams])

  // Track customizer open once on mount
  useEffect(() => { track('customizer_open') }, [])

  // Check URL param on mount
  useEffect(() => {
    const keyFromUrl = searchParams.get('license')
    if (keyFromUrl && !licensed) {
      verifyKey(keyFromUrl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addMessage = useCallback((msg: ChatMsg) => {
    setMessages(prev => [...prev.slice(-(MAX_MESSAGES - 1)), msg])
  }, [])

  const handleSendChat = useCallback(() => {
    const msg = POOL_MESSAGES[poolIdx.current % POOL_MESSAGES.length]
    poolIdx.current++
    addMessage(msg)
  }, [addMessage])

  const handleSendDonation = useCallback(() => {
    const msg = DONATION_MESSAGES[donationIdx.current % DONATION_MESSAGES.length]
    donationIdx.current++
    addMessage(msg)
  }, [addMessage])

  const handleToggleAutoChat = useCallback(() => {
    setAutoChat(prev => !prev)
  }, [])

  // Auto-chat fires every 1800ms when active
  useAutoChat(autoChat, handleSendChat)

  const generatedCSS = generateCSS(config, licensed)

  const handleCopyCSS = useCallback(async () => {
    await copy(generatedCSS)
    addToast('CSS copied to clipboard!')
    track('css_copied')
  }, [copy, generatedCSS, addToast])

  const handleChange = useCallback(
    <K extends keyof CustomizerConfig>(key: K, val: CustomizerConfig[K]) => {
      set(key, val)
    },
    [set]
  )

  const banner = !licensed ? (
    <LicenseBanner onActivate={verifyKey} isVerifying={isVerifying} />
  ) : undefined

  return (
    <>
      <CustomizerLayout
        config={config}
        messages={messages}
        generatedCSS={generatedCSS}
        autoChatActive={autoChat}
        copied={copied}
        topBanner={banner}
        onChange={handleChange}
        onSendChat={handleSendChat}
        onToggleAutoChat={handleToggleAutoChat}
        onSendDonation={handleSendDonation}
        onCopyCSS={handleCopyCSS}
      />
      <ToastContainer />
    </>
  )
}

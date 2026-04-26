import { useState, useCallback } from 'react'

export function useCopyCSS() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available (non-HTTPS or permissions denied)
      console.warn('Clipboard write failed')
    }
  }, [])

  return { copied, copy }
}

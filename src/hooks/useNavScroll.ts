import { useState, useEffect, useRef } from 'react'

export function useNavScroll() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastScrollY.current

      setIsScrolled(currentY > 20)

      if (Math.abs(diff) < 4) return

      setIsVisible(diff < 0 || currentY < 60)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isVisible, isScrolled }
}

import { useEffect, useRef } from 'react'

export function useAutoChat(active: boolean, onTick: () => void) {
  const callbackRef = useRef(onTick)
  callbackRef.current = onTick

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => callbackRef.current(), 1800)
    return () => clearInterval(id)
  }, [active])
}

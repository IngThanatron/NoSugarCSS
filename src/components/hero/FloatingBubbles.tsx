import { FloatBubble } from './FloatBubble'

const BUBBLES = [
  {
    user: 'StreamerPro',
    text: 'PogChamp 🎮',
    userColor: '#6366f1',
    style: { top: '15%', left: '8%' },
    animationDelay: '0s',
    animationDuration: '5.5s',
    bubbleStyle: {
      background: 'oklch(99.5% 0.003 222)',
      border: '1.5px solid oklch(90% 0.010 222)',
      color: '#1a1a2e',
      boxShadow: '0 4px 20px oklch(40% 0.04 222 / 0.1)',
    },
  },
  {
    user: 'CYBER_USER',
    text: '> gg_wp.exe',
    userColor: '#ff2d78',
    style: { top: '25%', right: '10%' },
    animationDelay: '0.8s',
    animationDuration: '6.2s',
    bubbleStyle: {
      background: '#0d0d1f',
      border: '1px solid #00f5ff55',
      color: '#00f5ff',
      boxShadow: '0 0 16px #00f5ff22',
      fontFamily: "'JetBrains Mono', monospace",
    },
  },
  {
    user: 'LordVanthor',
    text: 'Hark! Well played!',
    userColor: '#ffd700',
    style: { bottom: '30%', left: '5%' },
    animationDelay: '1.2s',
    animationDuration: '6.9s',
    bubbleStyle: {
      background: 'linear-gradient(135deg, #2a1f0e, #3d2d12)',
      border: '1px solid #8b6914',
      color: '#e8d5a3',
      boxShadow: 'inset 0 1px 0 #c9a84455',
    },
  },
  {
    user: 'SlingshotKid',
    text: 'yee-haw! 🤠',
    userColor: '#ff6b35',
    style: { top: '55%', right: '7%' },
    animationDelay: '1.5s',
    animationDuration: '7.6s',
    bubbleStyle: {
      background: 'linear-gradient(135deg, #1c0a00, #2e1503)',
      border: '1px solid #8b4513',
      color: '#d4a574',
      boxShadow: 'inset 0 1px 0 #c9a84433',
    },
  },
  {
    user: 'NightOwl_',
    text: 'so clean ✨',
    userColor: '#a855f7',
    style: { bottom: '20%', right: '20%' },
    animationDelay: '2.2s',
    animationDuration: '8.3s',
    bubbleStyle: {
      background: 'linear-gradient(135deg, #1a0533, #0f0c29)',
      border: '1px solid #a855f755',
      color: '#d8b4fe',
      boxShadow: '0 4px 16px #a855f722',
    },
  },
]

export function FloatingBubbles() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => (
        <FloatBubble key={i} {...b} />
      ))}
    </div>
  )
}

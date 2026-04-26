import type { Theme } from '@/types'

export const THEMES: Theme[] = [
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    icon: '⚡',
    tier: 'standard',
    kofiUrl: '',          // TODO: add Ko-fi product URL
    price: 490,
    bg: 'linear-gradient(135deg, #0d0017, #00001a)',
    headerBg: '#0d0017',
    headerColor: '#00f5ff',
    headerBorder: '#00f5ff33',
    headerTitle: '⚡ CHAT.EXE',
    msgBg: 'rgba(0,245,255,0.05)',
    msgBorder: '#00f5ff22',
    userColor: '#ff2d78',
    textColor: '#00f5ff',
    cardStyle: {
      cardBg: 'linear-gradient(145deg, #0d001a 0%, #0a0520 60%, #020010 100%)',
      cardBorder: '#00f5ff44',
      cardShadow: '0 0 32px #00f5ff11, 0 8px 48px #0006',
      pillBg: '#00f5ff22',
      pillColor: '#00f5ff',
      pillBorder: '#00f5ff55',
    },
    sampleUsers: ['NEON_GHOST', 'CYBER_PUNK', 'GRID_RIDER'],
    tags: ['dark', 'gaming', 'neon', 'sci-fi'],
    isPopular: true,
  },
  {
    id: 'cowboy',
    label: 'Red Dead',
    icon: '🤠',
    tier: 'standard',
    kofiUrl: '',          // TODO: add Ko-fi product URL
    price: 490,
    bg: 'linear-gradient(135deg, #1c0a00, #2e1000)',
    headerBg: '#120700',
    headerColor: '#d4a574',
    headerBorder: '#8b451344',
    headerTitle: '🤠 SALOON CHAT',
    msgBg: 'rgba(139,69,19,0.12)',
    msgBorder: '#8b451322',
    userColor: '#ff6b35',
    textColor: '#d4a574',
    cardStyle: {
      cardBg: 'linear-gradient(145deg, #1c0a00, #2e1000, #180800)',
      cardBorder: '#8b451366',
      cardShadow: '0 0 24px #8b451318, 0 8px 40px #0005',
      pillBg: '#ff6b3522',
      pillColor: '#ff6b35',
      pillBorder: '#ff6b3555',
    },
    sampleUsers: ['OutlawRex', 'SheriffMae', 'DrifterZ'],
    tags: ['dark', 'western', 'warm'],
  },
  {
    id: 'medieval',
    label: 'Tavern',
    icon: '⚔️',
    tier: 'standard',
    kofiUrl: '',          // TODO: add Ko-fi product URL
    price: 490,
    bg: 'linear-gradient(135deg, #1a0d00, #2a1a05)',
    headerBg: '#120800',
    headerColor: '#ffd700',
    headerBorder: '#8b691444',
    headerTitle: '⚔️ TAVERN CHAT',
    msgBg: 'rgba(200,160,50,0.08)',
    msgBorder: '#8b691422',
    userColor: '#ffd700',
    textColor: '#e8d5a3',
    cardStyle: {
      cardBg: 'linear-gradient(145deg, #1a0d00, #2a1a05, #120900)',
      cardBorder: '#ffd70044',
      cardShadow: '0 0 24px #ffd70010, 0 8px 40px #0005',
      pillBg: '#ffd70022',
      pillColor: '#ffd700',
      pillBorder: '#ffd70055',
    },
    sampleUsers: ['LordVanthor', 'WitchElara', 'KnightBros'],
    tags: ['dark', 'fantasy', 'gold'],
  },
]

// ── Add more themes below as catalog grows ────────────────────────

export const THEMES_EXTENDED: Theme[] = [
  ...THEMES,
  {
    id: 'y2k',
    label: 'Y2K',
    icon: '💿',
    tier: 'standard',
    kofiUrl: '',
    price: 490,
    bg: 'linear-gradient(135deg, #0a0018, #180030)',
    headerBg: '#0d001f',
    headerColor: '#ff99ff',
    headerBorder: '#ff99ff33',
    headerTitle: '💿 Y2K CHAT',
    msgBg: 'rgba(255,153,255,0.06)',
    msgBorder: '#ff99ff22',
    userColor: '#00ffff',
    textColor: '#ffccff',
    cardStyle: {
      cardBg: 'linear-gradient(145deg, #0a0018, #180030, #0f0020)',
      cardBorder: '#ff99ff44',
      cardShadow: '0 0 28px #ff99ff11, 0 8px 40px #0006',
      pillBg: '#ff99ff22',
      pillColor: '#ff99ff',
      pillBorder: '#ff99ff55',
    },
    sampleUsers: ['sk8ergirl2000', 'xXDarkAngelXx', 'CoolBeans99'],
    tags: ['retro', 'pink', 'gaming', 'y2k'],
    isNew: true,
  },
  {
    id: 'synthwave',
    label: 'Synthwave',
    icon: '🌆',
    tier: 'standard',
    kofiUrl: '',
    price: 490,
    bg: 'linear-gradient(180deg, #0d0221 0%, #1a0540 50%, #2d0b5a 100%)',
    headerBg: '#0a0118',
    headerColor: '#f72585',
    headerBorder: '#f7258533',
    headerTitle: '🌆 SYNTHWAVE CHAT',
    msgBg: 'rgba(247,37,133,0.06)',
    msgBorder: '#f7258522',
    userColor: '#7209b7',
    textColor: '#e0aaff',
    cardStyle: {
      cardBg: 'linear-gradient(145deg, #0d0221, #1a0540, #2d0b5a)',
      cardBorder: '#f7258544',
      cardShadow: '0 0 32px #f7258511, 0 8px 48px #0007',
      pillBg: '#f7258522',
      pillColor: '#f72585',
      pillBorder: '#f7258555',
    },
    sampleUsers: ['NeonRider', 'SynthLord', 'RetroWave_X'],
    tags: ['dark', 'neon', 'retro', 'purple'],
    isNew: true,
  },
]

export const STD_THEMES = THEMES.filter(t => t.tier === 'standard')

export function getThemeById(id: string): Theme | undefined {
  return THEMES.find(t => t.id === id)
}

export function getThemesByTier(tier: Theme['tier']): Theme[] {
  return THEMES.filter(t => t.tier === tier)
}

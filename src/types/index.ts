export type AnimationId = 'slide' | 'bounce' | 'fade' | 'pop' | 'glow'
export type TierId = 'free' | 'standard' | 'premium'
export type FeatureType = 'check' | 'minus' | 'star'

// ── Theme catalog ──────────────────────────────────────────────────────────

export interface ThemeCardStyle {
  cardBg: string
  cardBorder: string
  cardShadow: string
  pillBg: string
  pillColor: string
  pillBorder: string
}

export interface Theme {
  id: string
  label: string
  icon: string
  tier: TierId
  kofiUrl: string        // '' for free, '#contact' for premium, real URL for standard
  price: number          // 0 or 490
  bg: string
  headerBg: string
  headerColor: string
  headerBorder: string
  headerTitle: string
  msgBg: string
  msgBorder: string
  userColor: string
  textColor: string
  cardStyle: ThemeCardStyle
  sampleUsers: string[]
  tags: string[]
  isNew?: boolean
  isPopular?: boolean
}

// ── Pricing plans ──────────────────────────────────────────────────────────

export interface PlanFeature {
  text: string
  type: FeatureType
}

export interface Plan {
  id: TierId
  name: string
  price: string
  priceSuffix: string
  tagline: string
  featured: boolean
  ctaLabel: string
  ctaAction: 'scroll' | 'kofi' | 'contact'
  features: PlanFeature[]
}

// ── Customizer config ──────────────────────────────────────────────────────

export interface CustomizerConfig {
  titleText: string
  titleColor: string
  headerBg: string
  chatBg: string
  transparentBg: boolean
  msgBgEnabled: boolean
  msgBgColor: string
  msgBgOpacity: number   // 0–40
  usernameColor: string
  fontColor: string
  fontSize: number       // 10–24
  fontFamily: string
  fontWeight: string
  borderRadius: number   // 0–20
  msgSpacing: number     // 0–16
  paddingX: number       // 4–24
  paddingY: number       // 4–16
  animation: AnimationId
  showMascot: boolean
}

export const DEFAULT_CONFIG: CustomizerConfig = {
  titleText: 'LIVE CHAT',
  titleColor: '#f59e0b',
  headerBg: '#0d0d1f',
  chatBg: '#1a1a2e',
  transparentBg: false,
  msgBgEnabled: true,
  msgBgColor: '#ffffff',
  msgBgOpacity: 6,
  usernameColor: '#f59e0b',
  fontColor: '#e5e5e5',
  fontSize: 13,
  fontFamily: 'Plus Jakarta Sans',
  fontWeight: '400',
  borderRadius: 10,
  msgSpacing: 4,
  paddingX: 10,
  paddingY: 7,
  animation: 'slide',
  showMascot: true,
}

// ── Database types (Phase 7) ───────────────────────────────────────────────

export interface Order {
  id: string
  kofi_transaction_id: string
  email: string
  plan_id: string
  amount: number
  promo_code: string | null
  created_at: string
  delivered_at: string | null
}

export interface License {
  id: string
  order_id: string
  license_key: string
  is_active: boolean
  created_at: string
}

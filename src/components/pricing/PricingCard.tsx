import { useState } from 'react'
import type { Plan } from '@/types'
import { STD_THEMES } from '@/data/themes'
import { FeatureList } from './FeatureList'
import { ThemeTabSwitcher } from './ThemeTabSwitcher'
import { FreeMockChat } from './mocks/FreeMockChat'
import { StandardMockChat } from './mocks/StandardMockChat'
import { PremiumMockChat } from './mocks/PremiumMockChat'
import { useIsMobile } from '@/hooks/useIsMobile'

interface Props {
  plan: Plan
}

export function PricingCard({ plan }: Props) {
  const [selectedThemeId, setSelectedThemeId] = useState(STD_THEMES[0].id)
  const selectedTheme = STD_THEMES.find(t => t.id === selectedThemeId) ?? STD_THEMES[0]
  const isMobile = useIsMobile()

  const isFeatured = plan.featured
  const cardStyle = isFeatured ? selectedTheme.cardStyle : null

  const handleCta = () => {
    if (plan.ctaAction === 'kofi' && selectedTheme.kofiUrl) {
      window.open(selectedTheme.kofiUrl, '_blank', 'noopener')
    } else if (plan.ctaAction === 'contact') {
      window.open('#contact', '_self')
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        borderRadius: '20px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        transform: isFeatured && !isMobile ? 'scale(1.04)' : 'scale(1)',
        transition: 'all 0.3s ease',
        // Featured card uses theme dynamic styles; others use surface
        background: cardStyle ? cardStyle.cardBg : 'var(--surface)',
        border: `1.5px solid ${cardStyle ? cardStyle.cardBorder : 'var(--border)'}`,
        boxShadow: cardStyle ? cardStyle.cardShadow : 'var(--shadow)',
      }}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: selectedTheme.cardStyle.pillBg,
            border: `1px solid ${selectedTheme.cardStyle.pillBorder}`,
            color: selectedTheme.cardStyle.pillColor,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '3px 12px',
            borderRadius: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          {selectedTheme.icon} {selectedTheme.label}
        </div>
      )}

      {/* Header */}
      <div>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isFeatured ? selectedTheme.cardStyle.pillColor : 'var(--warm-muted)',
            marginBottom: '8px',
          }}
        >
          {plan.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: plan.id === 'free' ? '2.4rem' : '2.8rem',
              color: isFeatured ? '#fff' : 'var(--warm-dark)',
              lineHeight: 1,
            }}
          >
            {plan.price}
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              color: isFeatured ? 'rgba(255,255,255,0.5)' : 'var(--warm-muted)',
            }}
          >
            {plan.priceSuffix}
          </span>
        </div>
        <p
          style={{
            fontSize: '0.82rem',
            color: isFeatured ? 'rgba(255,255,255,0.55)' : 'var(--warm-muted)',
            marginTop: '4px',
          }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Theme switcher (Standard only) */}
      {isFeatured && (
        <ThemeTabSwitcher
          themes={STD_THEMES}
          selected={selectedThemeId}
          onSelect={setSelectedThemeId}
          pillBg={selectedTheme.cardStyle.pillBg}
          pillColor={selectedTheme.cardStyle.pillColor}
          pillBorder={selectedTheme.cardStyle.pillBorder}
        />
      )}

      {/* Mock chat preview */}
      {plan.id === 'free' && <FreeMockChat />}
      {plan.id === 'standard' && <StandardMockChat theme={selectedTheme} />}
      {plan.id === 'premium' && <PremiumMockChat />}

      {/* Features */}
      <FeatureList
        features={plan.features}
        accentColor={isFeatured ? selectedTheme.cardStyle.pillColor : 'var(--orange)'}
      />

      {/* CTA */}
      <button
        onClick={handleCta}
        style={{
          marginTop: 'auto',
          padding: '13px 24px',
          borderRadius: '100px',
          border: isFeatured
            ? `1.5px solid ${selectedTheme.cardStyle.pillBorder}`
            : '1.5px solid var(--border)',
          background: isFeatured ? selectedTheme.cardStyle.pillBg : 'transparent',
          color: isFeatured ? selectedTheme.cardStyle.pillColor : 'var(--warm-dark)',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'opacity 0.2s, transform 0.15s',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '0.8'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {plan.ctaLabel}
      </button>
    </div>
  )
}

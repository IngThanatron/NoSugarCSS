import { PLANS } from '@/data/plans'
import { PricingCard } from './PricingCard'
import { useIsMobile } from '@/hooks/useIsMobile'

export function PricingSection() {
  const isMobile = useIsMobile()

  return (
    <section
      id="pricing"
      style={{
        padding: isMobile ? '80px 24px' : '100px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        PRICING
      </p>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--warm-dark)',
          textAlign: 'center',
          marginBottom: '64px',
          letterSpacing: '-0.02em',
        }}
      >
        Choose your flavor
      </h2>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {PLANS.map(plan => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  )
}

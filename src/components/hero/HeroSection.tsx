import { FloatingBubbles } from './FloatingBubbles'

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '160px 48px 100px',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FloatingBubbles />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'oklch(99.5% 0.003 222)',
            border: '1.5px solid var(--border)',
            borderRadius: '100px',
            padding: '6px 16px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--warm-mid)',
            letterSpacing: '0.04em',
            marginBottom: '32px',
            boxShadow: 'var(--shadow)',
          }}
        >
          ✦ Custom Chat Overlay for Streamers
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            color: 'var(--warm-dark)',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}
        >
          Your chat,{' '}
          <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>
            beautifully yours.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--warm-mid)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}
        >
          Hand-crafted CSS chat overlays for your stream — styled, animated,
          and made to match your vibe.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#pricing"
            style={{
              background: 'var(--warm-dark)',
              color: 'var(--cream)',
              padding: '14px 32px',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--orange)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--warm-dark)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            See Plans
          </a>
          <a
            href="/customize"
            style={{
              background: 'transparent',
              color: 'var(--warm-dark)',
              padding: '14px 32px',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1.5px solid var(--border)',
              transition: 'border-color 0.2s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--warm-mid)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Open Customizer →
          </a>
        </div>
      </div>
    </section>
  )
}

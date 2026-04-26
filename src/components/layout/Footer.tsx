import { Link } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'

export function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer
      style={{
        padding: isMobile ? '60px 24px 40px' : '80px 48px 40px',
        borderTop: '1px solid var(--border)',
        background: 'var(--cream2)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '48px',
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: '340px' }}>
          <Link
            to="/"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.2rem',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            <span style={{ color: 'var(--orange)' }}>NoSugar</span>
            <span style={{ color: 'var(--warm-dark)' }}> CSS Chat</span>
          </Link>
          <p style={{ color: 'var(--warm-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Custom CSS chat overlays for streamers who care about the details.
            One-time purchase. Forever yours.
          </p>
        </div>

        {/* Social / Contact */}
        <div>
          <p
            style={{
              color: 'var(--warm-mid)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Find me here
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SocialLink href="#">@yourhandle — X / Twitter</SocialLink>
            <SocialLink href="#">GitHub</SocialLink>
            <SocialLink href="#">Discord</SocialLink>
            <SocialLink href="mailto:your@email.com">your@email.com</SocialLink>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '48px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <p style={{ color: 'var(--warm-muted)', fontSize: '0.8rem' }}>
          © 2026 NoSugar CSS Chat — All rights reserved
        </p>
        <p style={{ color: 'var(--warm-muted)', fontSize: '0.8rem' }}>
          Made with warmth ✦
        </p>
      </div>
    </footer>
  )
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        color: 'var(--warm-mid)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
    >
      {children}
    </a>
  )
}

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavScroll } from '@/hooks/useNavScroll'
import { useIsMobile } from '@/hooks/useIsMobile'

export function Nav() {
  const { isVisible, isScrolled } = useNavScroll()
  const { pathname } = useLocation()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname === '/customize') return null

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: isMobile ? '16px 24px' : '18px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isScrolled || menuOpen ? 'oklch(99% 0.003 222 / 0.92)' : 'transparent',
        borderBottom: isScrolled ? '1px solid oklch(90% 0.01 222 / 0.5)' : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, background 0.3s ease',
        flexWrap: 'wrap',
        gap: menuOpen && isMobile ? '16px' : '0',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', textDecoration: 'none', letterSpacing: '-0.01em' }}>
        <span style={{ color: 'var(--orange)' }}>NoSugar</span>
        <span style={{ color: 'var(--warm-dark)' }}> CSS Chat</span>
      </Link>

      {/* Mobile hamburger */}
      {isMobile ? (
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--warm-dark)', padding: '4px' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      ) : null}

      {/* Links — desktop always visible, mobile only when open */}
      {(!isMobile || menuOpen) && (
        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '32px',
            width: isMobile ? '100%' : 'auto',
            paddingBottom: isMobile && menuOpen ? '8px' : '0',
          }}
        >
          <NavLink href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</NavLink>
          <NavLink href="#demo" onClick={() => setMenuOpen(false)}>Demo</NavLink>
          <Link
            to="/themes"
            onClick={() => setMenuOpen(false)}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
          >
            Themes
          </Link>
          <Link
            to="/past-work"
            onClick={() => setMenuOpen(false)}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
          >
            Past Work
          </Link>
          <Link
            to="/customize"
            onClick={() => setMenuOpen(false)}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
          >
            Customize
          </Link>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'var(--warm-dark)', color: 'var(--cream)',
              padding: '8px 20px', borderRadius: '100px', fontSize: '0.875rem',
              fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s',
              alignSelf: isMobile ? 'flex-start' : 'auto',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--orange)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--warm-dark)')}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{ color: 'var(--warm-mid)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-dark)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
    >
      {children}
    </a>
  )
}

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getThemeById, THEMES_EXTENDED } from '@/data/themes'
import { StandardMockChat } from '@/components/pricing/mocks/StandardMockChat'
import { ThemeCard } from '@/components/catalog/ThemeCard'
import { useIsMobile } from '@/hooks/useIsMobile'
import { track } from '@/lib/plausible'

export function ThemeDetailPage() {
  const { themeId } = useParams<{ themeId: string }>()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const theme = getThemeById(themeId ?? '')

  useEffect(() => {
    if (theme) track('theme_view', { theme: theme.id })
  }, [theme])

  if (!theme) {
    return (
      <main style={{ paddingTop: '120px', textAlign: 'center', minHeight: '100vh' }}>
        <p style={{ color: 'var(--warm-muted)' }}>Theme not found.</p>
        <button onClick={() => navigate('/themes')} style={{ marginTop: '16px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--orange)', fontWeight: 600, fontFamily: 'inherit', fontSize: '0.9rem' }}>
          ← Back to themes
        </button>
      </main>
    )
  }

  const others = THEMES_EXTENDED.filter(t => t.id !== theme.id).slice(0, 3)

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '48px 24px' : '80px 48px' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/themes')}
          style={{ background: 'none', border: 'none', color: 'var(--warm-muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← All themes
        </button>

        {/* Hero row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '80px' }}>
          {/* Left: info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '2rem' }}>{theme.icon}</span>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: 'var(--warm-dark)', letterSpacing: '-0.02em' }}>
                {theme.label}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {theme.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.72rem', color: theme.cardStyle.pillColor, background: theme.cardStyle.pillBg, border: `1px solid ${theme.cardStyle.pillBorder}`, padding: '3px 10px', borderRadius: '100px' }}>
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ color: 'var(--warm-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
              A hand-crafted CSS chat overlay theme for streamers. Drop it into OBS Browser Source CSS and go live in minutes. One-time purchase — yours forever.
            </p>

            {/* What's included */}
            <div style={{ marginBottom: '32px' }}>
              {['Full CSS source code', 'OBS-ready setup guide', 'License key for customizer', 'Add-on support'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.875rem', color: 'var(--warm-mid)' }}>
                  <span style={{ color: 'var(--orange)', fontWeight: 700 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', color: 'var(--warm-dark)' }}>
                {theme.price === 0 ? 'Free' : `${theme.price} THB`}
              </span>
              <button
                onClick={() => { if (theme.kofiUrl) { track('buy_click', { theme: theme.id }); window.open(theme.kofiUrl, '_blank', 'noopener') } }}
                disabled={!theme.kofiUrl}
                style={{
                  padding: '13px 28px', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 700,
                  background: theme.kofiUrl ? theme.cardStyle.pillBg : 'var(--cream2)',
                  color: theme.kofiUrl ? theme.cardStyle.pillColor : 'var(--warm-muted)',
                  border: `1.5px solid ${theme.kofiUrl ? theme.cardStyle.pillBorder : 'var(--border)'}`,
                  cursor: theme.kofiUrl ? 'pointer' : 'default',
                  fontFamily: 'inherit',
                }}
              >
                {theme.kofiUrl ? 'Buy on Ko-fi →' : 'Coming soon'}
              </button>
            </div>
          </div>

          {/* Right: live preview */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(1.1)', transformOrigin: 'top center' }}>
              <StandardMockChat theme={theme} />
            </div>
          </div>
        </div>

        {/* More themes */}
        {others.length > 0 && (
          <>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', color: 'var(--warm-dark)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
              More themes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
              {others.map(t => (
                <ThemeCard key={t.id} theme={t} onClick={() => navigate(`/themes/${t.id}`)} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

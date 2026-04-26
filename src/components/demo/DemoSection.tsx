import { InteractiveDemo } from './InteractiveDemo'

export function DemoSection() {
  return (
    <section
      id="demo"
      style={{
        padding: '100px 48px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
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
        TRY IT
      </p>
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--warm-dark)',
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '-0.02em',
        }}
      >
        Play with Standard
      </h2>
      <InteractiveDemo />
    </section>
  )
}

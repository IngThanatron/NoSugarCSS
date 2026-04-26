interface LicenseBannerProps {
  onActivate: (key: string) => void
  isVerifying: boolean
}

export function LicenseBanner({ onActivate, isVerifying }: LicenseBannerProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, oklch(16% 0.012 222) 0%, oklch(20% 0.025 222) 100%)',
      border: '1px solid oklch(46% 0.07 222 / 0.3)',
      borderRadius: '12px',
      padding: '16px 20px',
      margin: '0 0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.05em' }}>
          FREE VERSION
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--warm-muted)', lineHeight: 1.4 }}>
          CSS includes a watermark comment.{' '}
          <a
            href="/themes"
            style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: 600 }}
          >
            Get Standard →
          </a>
        </p>
      </div>

      <LicenseInput onActivate={onActivate} isVerifying={isVerifying} />
    </div>
  )
}

function LicenseInput({ onActivate, isVerifying }: LicenseBannerProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const input = (e.currentTarget.elements.namedItem('licenseKey') as HTMLInputElement)
        const val = input.value.trim().toUpperCase()
        if (val) onActivate(val)
      }}
      style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
    >
      <input
        name="licenseKey"
        type="text"
        placeholder="NSC-XXXX-XXXX-XXXX"
        maxLength={19}
        style={{
          background: 'oklch(99.5% 0.003 222 / 0.05)',
          border: '1px solid oklch(90% 0.010 222 / 0.2)',
          borderRadius: '8px',
          padding: '7px 12px',
          fontSize: '0.78rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--cream)',
          width: '180px',
          letterSpacing: '0.05em',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={isVerifying}
        style={{
          background: 'var(--orange)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '7px 14px',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: isVerifying ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          opacity: isVerifying ? 0.7 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {isVerifying ? 'Checking…' : 'Activate'}
      </button>
    </form>
  )
}

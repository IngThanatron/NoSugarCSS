import type { ReactNode } from 'react'

type BadgeVariant = 'orange' | 'green' | 'purple' | 'muted'

interface Props {
  children: ReactNode
  variant?: BadgeVariant
}

const STYLES: Record<BadgeVariant, React.CSSProperties> = {
  orange: {
    background: 'var(--orange-dim)',
    color: 'var(--orange)',
    border: '1px solid oklch(46% 0.07 222 / 0.3)',
  },
  green: {
    background: 'oklch(50% 0.12 145 / 0.12)',
    color: 'oklch(44% 0.12 145)',
    border: '1px solid oklch(50% 0.12 145 / 0.3)',
  },
  purple: {
    background: 'oklch(55% 0.18 290 / 0.12)',
    color: 'oklch(60% 0.18 290)',
    border: '1px solid oklch(55% 0.18 290 / 0.3)',
  },
  muted: {
    background: 'var(--cream2)',
    color: 'var(--warm-muted)',
    border: '1px solid var(--border)',
  },
}

export function Badge({ children, variant = 'muted' }: Props) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '100px',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        ...STYLES[variant],
      }}
    >
      {children}
    </span>
  )
}

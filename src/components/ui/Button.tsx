import type { CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props {
  children: ReactNode
  variant?: Variant
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
  fullWidth?: boolean
  style?: CSSProperties
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '12px 28px',
  borderRadius: '100px',
  fontSize: '0.9rem',
  fontWeight: 700,
  fontFamily: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.18s ease',
  border: 'none',
  letterSpacing: '0.01em',
}

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--warm-dark)',
    color: 'var(--cream)',
    border: '1.5px solid transparent',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--warm-dark)',
    border: '1.5px solid var(--border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--warm-mid)',
    border: '1.5px solid transparent',
  },
}

const HOVER_BG: Record<Variant, string> = {
  primary: 'var(--orange)',
  secondary: 'var(--cream2)',
  ghost: 'var(--cream2)',
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  target,
  rel,
  disabled,
  fullWidth,
  style,
  type = 'button',
  ariaLabel,
}: Props) {
  const combinedStyle: CSSProperties = {
    ...BASE,
    ...VARIANTS[variant],
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...style,
  }

  const hoverHandlers = disabled
    ? {}
    : {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          ;(e.currentTarget as HTMLElement).style.background = HOVER_BG[variant]
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
          ;(e.currentTarget as HTMLElement).style.background =
            (VARIANTS[variant].background as string) ?? 'transparent'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        },
      }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} style={combinedStyle} aria-label={ariaLabel} {...hoverHandlers}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={combinedStyle} aria-label={ariaLabel} {...hoverHandlers}>
      {children}
    </button>
  )
}

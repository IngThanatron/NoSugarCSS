import type { PlanFeature } from '@/types'

interface Props {
  features: PlanFeature[]
  accentColor?: string
}

const ICONS: Record<string, string> = {
  check: '✓',
  minus: '—',
  star: '✦',
}

export function FeatureList({ features, accentColor = 'var(--orange)' }: Props) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {features.map((f, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.875rem',
          }}
        >
          <span
            style={{
              color: f.type === 'minus' ? 'var(--warm-muted)' : accentColor,
              fontWeight: 700,
              fontSize: f.type === 'star' ? '0.7rem' : '0.875rem',
              flexShrink: 0,
              width: '16px',
              textAlign: 'center',
            }}
          >
            {ICONS[f.type]}
          </span>
          <span
            style={{
              color: f.type === 'minus' ? 'var(--warm-muted)' : 'var(--warm-mid)',
              textDecoration: f.type === 'minus' ? 'line-through' : 'none',
            }}
          >
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

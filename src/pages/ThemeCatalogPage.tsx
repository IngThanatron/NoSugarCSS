import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { THEMES_EXTENDED } from '@/data/themes'
import { ThemeCard } from '@/components/catalog/ThemeCard'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { TierId } from '@/types'

const ALL_TAGS = Array.from(new Set(THEMES_EXTENDED.flatMap(t => t.tags))).sort()

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest',   label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
]

type PlanTab = 'all' | TierId

const PLAN_TABS: { value: PlanTab; label: string }[] = [
  { value: 'all',      label: 'All themes' },
  { value: 'free',     label: 'Free' },
  { value: 'standard', label: 'Standard' },
]

export function ThemeCatalogPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const [planTab, setPlanTab]         = useState<PlanTab>('all')
  const [activeTags, setActiveTags]   = useState<Set<string>>(new Set())
  const [sort, setSort]               = useState<SortKey>('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleTag = (tag: string) =>
    setActiveTags(prev => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })

  const filtered = useMemo(() => {
    let list = THEMES_EXTENDED

    if (planTab !== 'all') list = list.filter(t => t.tier === planTab)
    if (activeTags.size > 0) list = list.filter(t => [...activeTags].every(tag => t.tags.includes(tag)))

    switch (sort) {
      case 'newest':     return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      default:           return [...list].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
    }
  }, [planTab, activeTags, sort])

  // Counts per plan tab (before tag filter, for the badge numbers)
  const counts = useMemo(() => ({
    all:      THEMES_EXTENDED.length,
    free:     THEMES_EXTENDED.filter(t => t.tier === 'free').length,
    standard: THEMES_EXTENDED.filter(t => t.tier === 'standard').length,
  }), [])

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '32px 20px 64px' : '64px 48px 80px' }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '8px' }}>
            CSS Chat Overlays
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--warm-dark)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Theme Store
          </h1>
          <p style={{ color: 'var(--warm-muted)', lineHeight: 1.6, maxWidth: '480px' }}>
            Hand-crafted chat overlays for OBS. One-time purchase — paste the CSS and go live.
          </p>
        </div>

        {/* ── Plan tabs ── */}
        <div style={{
          display: 'flex', gap: '4px',
          background: 'var(--cream2)', borderRadius: '12px', padding: '4px',
          width: 'fit-content', marginBottom: '32px',
          border: '1px solid var(--border)',
        }}>
          {PLAN_TABS.map(tab => (
            <PlanTabBtn
              key={tab.value}
              label={tab.label}
              count={counts[tab.value as keyof typeof counts] ?? 0}
              active={planTab === tab.value}
              onClick={() => setPlanTab(tab.value)}
            />
          ))}
        </div>

        {/* ── Body: sidebar + grid ── */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

          {/* ── Sidebar ── */}
          {isMobile ? (
            <MobileFilterBar
              open={filtersOpen}
              onToggle={() => setFiltersOpen(o => !o)}
              allTags={ALL_TAGS}
              activeTags={activeTags}
              onToggleTag={toggleTag}
              onClear={() => setActiveTags(new Set())}
            />
          ) : (
            <aside style={{ width: '200px', flexShrink: 0, position: 'sticky', top: '100px' }}>
              <FilterSidebar
                allTags={ALL_TAGS}
                activeTags={activeTags}
                onToggleTag={toggleTag}
                onClear={() => setActiveTags(new Set())}
              />
            </aside>
          )}

          {/* ── Right: toolbar + grid ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Toolbar row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--warm-muted)', margin: 0 }}>
                <span style={{ color: 'var(--warm-dark)', fontWeight: 700 }}>{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'theme' : 'themes'}
              </p>
              <SortSelect value={sort} onChange={setSort} />
            </div>

            {/* Mobile active filters summary */}
            {isMobile && activeTags.size > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {[...activeTags].map(tag => (
                  <span
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '100px', background: 'var(--warm-dark)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    {tag} ✕
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <EmptyState onClear={() => { setActiveTags(new Set()); setPlanTab('all') }} />
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: isMobile ? '12px' : '20px',
              }}>
                {filtered.map(theme => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    onClick={() => navigate(`/themes/${theme.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PlanTabBtn({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px', borderRadius: '9px', fontSize: '0.82rem', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit', border: 'none',
        background: active ? 'var(--surface)' : 'transparent',
        color: active ? 'var(--warm-dark)' : 'var(--warm-muted)',
        boxShadow: active ? 'var(--shadow)' : 'none',
        display: 'flex', alignItems: 'center', gap: '6px',
        transition: 'all 0.15s',
      }}
    >
      {label}
      <span style={{
        fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '100px',
        background: active ? 'var(--orange)' : 'var(--cream2)',
        color: active ? 'white' : 'var(--warm-muted)',
      }}>
        {count}
      </span>
    </button>
  )
}

function FilterSidebar({ allTags, activeTags, onToggleTag, onClear }: {
  allTags: string[]
  activeTags: Set<string>
  onToggleTag: (tag: string) => void
  onClear: () => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--warm-dark)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Filter
        </span>
        {activeTags.size > 0 && (
          <button onClick={onClear} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.72rem', color: 'var(--orange)', fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>
            Clear all
          </button>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '12px' }}>
          Style
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {allTags.map(tag => (
            <TagCheckbox
              key={tag}
              tag={tag}
              checked={activeTags.has(tag)}
              onChange={() => onToggleTag(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TagCheckbox({ tag, checked, onChange }: { tag: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '5px 8px', borderRadius: '8px', background: checked ? 'var(--cream2)' : 'transparent', transition: 'background 0.12s' }}>
      <div
        onClick={onChange}
        style={{
          width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
          border: `1.5px solid ${checked ? 'var(--warm-dark)' : 'var(--border)'}`,
          background: checked ? 'var(--warm-dark)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.12s',
        }}
      >
        {checked && <span style={{ color: 'var(--cream)', fontSize: '10px', lineHeight: 1 }}>✓</span>}
      </div>
      <span onClick={onChange} style={{ fontSize: '0.82rem', color: checked ? 'var(--warm-dark)' : 'var(--warm-mid)', fontWeight: checked ? 600 : 400, textTransform: 'capitalize' }}>
        {tag}
      </span>
    </label>
  )
}

function MobileFilterBar({ open, onToggle, allTags, activeTags, onToggleTag, onClear }: {
  open: boolean
  onToggle: () => void
  allTags: string[]
  activeTags: Set<string>
  onToggleTag: (tag: string) => void
  onClear: () => void
}) {
  return (
    <div style={{ width: '100%', marginBottom: '4px' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 600,
          background: 'var(--cream2)', border: '1px solid var(--border)',
          cursor: 'pointer', fontFamily: 'inherit', color: 'var(--warm-dark)',
        }}
      >
        <span>⊞</span> Filters
        {activeTags.size > 0 && (
          <span style={{ background: 'var(--orange)', color: 'white', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px' }}>
            {activeTags.size}
          </span>
        )}
      </button>

      {open && (
        <div style={{ marginTop: '12px', padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <FilterSidebar allTags={allTags} activeTags={activeTags} onToggleTag={onToggleTag} onClear={onClear} />
        </div>
      )}
    </div>
  )
}

function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--warm-muted)' }}>Sort:</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value as SortKey)}
        style={{
          padding: '6px 10px', borderRadius: '8px', fontSize: '0.78rem',
          border: '1px solid var(--border)', background: 'var(--surface)',
          color: 'var(--warm-dark)', fontFamily: 'inherit', cursor: 'pointer',
          outline: 'none',
        }}
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</p>
      <p style={{ color: 'var(--warm-dark)', fontWeight: 600, marginBottom: '8px' }}>No themes found</p>
      <p style={{ color: 'var(--warm-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>Try removing some filters.</p>
      <button
        onClick={onClear}
        style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600, background: 'var(--warm-dark)', color: 'var(--cream)', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
      >
        Clear filters
      </button>
    </div>
  )
}

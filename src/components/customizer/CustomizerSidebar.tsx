import type { CustomizerConfig } from '@/types'
import { Toggle } from '@/components/ui/Toggle'
import { ColorField } from '@/components/ui/ColorField'
import { SliderField } from '@/components/ui/SliderField'
import { SelectField } from '@/components/ui/SelectField'

const BG_PRESETS = ['#1a1a2e', '#0d0d0d', '#0f0c29', '#0a1628', '#1a0a0a', '#1c1a10']
const USERNAME_PRESETS = ['#f59e0b', '#ef4444', '#a855f7', '#3b82f6', '#10b981', '#ec4899', '#f97316', '#14b8a6', '#fbbf24', '#6366f1']
const FONT_FAMILIES = ['Plus Jakarta Sans', 'Inter', 'Nunito', 'Poppins', 'Roboto Mono', 'JetBrains Mono', 'Comic Sans MS', 'Georgia']
const FONT_WEIGHTS = ['300', '400', '500', '600', '700']
const ANIMATIONS = [
  { value: 'slide', label: 'Slide In' },
  { value: 'bounce', label: 'Bounce In' },
  { value: 'fade', label: 'Fade In' },
  { value: 'pop', label: 'Pop In' },
  { value: 'glow', label: 'Glow In' },
]

interface Props {
  config: CustomizerConfig
  onChange?: <K extends keyof CustomizerConfig>(key: K, val: CustomizerConfig[K]) => void
}

export function CustomizerSidebar({ config, onChange }: Props) {
  const set = <K extends keyof CustomizerConfig>(key: K, val: CustomizerConfig[K]) =>
    onChange?.(key, val)

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border)',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border) transparent',
      }}
    >
      <Section title="CHAT TITLE">
        <ColorField label="Title Color" value={config.titleColor} onChange={v => set('titleColor', v)} />
        <ColorField label="Header Background" value={config.headerBg} onChange={v => set('headerBg', v)} />
      </Section>

      <Section title="BACKGROUND">
        <Toggle label="Transparent background" value={config.transparentBg} onChange={v => set('transparentBg', v)} />
        {!config.transparentBg && (
          <>
            <ColorField label="Chat Background" value={config.chatBg} onChange={v => set('chatBg', v)} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '8px' }}>BG Presets</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {BG_PRESETS.map(c => (
                  <button
                    key={c}
                    onClick={() => set('chatBg', c)}
                    title={c}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: c,
                      border: config.chatBg === c ? '2px solid var(--orange)' : '2px solid var(--border)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <Toggle label="Message background tint" value={config.msgBgEnabled} onChange={v => set('msgBgEnabled', v)} />
        {config.msgBgEnabled && (
          <>
            <ColorField label="Tint Color" value={config.msgBgColor} onChange={v => set('msgBgColor', v)} />
            <SliderField label="Tint Opacity" value={config.msgBgOpacity} min={0} max={40} unit="%" onChange={v => set('msgBgOpacity', v)} />
          </>
        )}
      </Section>

      <Section title="USERNAME">
        <ColorField label="Username Color" value={config.usernameColor} onChange={v => set('usernameColor', v)} />
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--warm-muted)', marginBottom: '8px' }}>Color Presets</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {USERNAME_PRESETS.map(c => (
              <button
                key={c}
                onClick={() => set('usernameColor', c)}
                title={c}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: c,
                  border: config.usernameColor === c ? '2px solid var(--warm-dark)' : '2px solid transparent',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="FONT">
        <ColorField label="Font Color" value={config.fontColor} onChange={v => set('fontColor', v)} />
        <SliderField label="Font Size" value={config.fontSize} min={10} max={24} unit="px" onChange={v => set('fontSize', v)} />
        <SelectField
          label="Font Family"
          value={config.fontFamily}
          options={FONT_FAMILIES.map(f => ({ value: f, label: f }))}
          onChange={v => set('fontFamily', v)}
        />
        <SelectField
          label="Font Weight"
          value={config.fontWeight}
          options={FONT_WEIGHTS.map(w => ({ value: w, label: w }))}
          onChange={v => set('fontWeight', v)}
        />
      </Section>

      <Section title="LAYOUT">
        <SliderField label="Border Radius" value={config.borderRadius} min={0} max={20} unit="px" onChange={v => set('borderRadius', v)} />
        <SliderField label="Message Spacing" value={config.msgSpacing} min={0} max={16} unit="px" onChange={v => set('msgSpacing', v)} />
        <SliderField label="Padding X" value={config.paddingX} min={4} max={24} unit="px" onChange={v => set('paddingX', v)} />
        <SliderField label="Padding Y" value={config.paddingY} min={4} max={16} unit="px" onChange={v => set('paddingY', v)} />
      </Section>

      <Section title="ANIMATION">
        <SelectField
          label="Entry Animation"
          value={config.animation}
          options={ANIMATIONS}
          onChange={v => set('animation', v as CustomizerConfig['animation'])}
        />
      </Section>

      <Section title="EXTRAS">
        <Toggle label="Show mascot area" value={config.showMascot} onChange={v => set('showMascot', v)} />
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: 'var(--orange)', flexShrink: 0 }} />
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--warm-muted)', textTransform: 'uppercase' }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  )
}

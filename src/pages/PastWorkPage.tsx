import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'

// ── Data ──────────────────────────────────────────────────────────────────────

interface WorkMsg {
  user: string
  text: string
  role: 'owner' | 'mod' | 'member' | 'normal'
}

interface PastWork {
  id: string
  name: string
  desc: string
  tags: string[]
  filterTags: string[]
  layout: 'stacked' | 'inline'
  detailRoute?: string   // if set, card links to this route
  // Chat window visuals
  previewBg: string
  previewTitle: string
  previewTitleColor: string
  previewTitleBorder: string
  nameBg: string
  nameColor: string
  msgBg: string
  msgColor: string
  ownerColor?: string
  memberColor?: string
  modColor?: string
  normalColor?: string
  accent: string
  // Content
  seedMsgs: WorkMsg[]
  extraMsgs: WorkMsg[]
}

const PAST_WORKS: PastWork[] = [
  {
    id: 'luxury',
    name: 'Luxury',
    desc: 'Thai-inspired elegance with warm cream tones',
    tags: ['Thai', 'Warm', 'Elegant'],
    filterTags: ['warm', 'light'],
    layout: 'stacked',
    previewBg: 'linear-gradient(135deg, #0d1f33, #153448)',
    previewTitle: '✦ LIVE CHAT',
    previewTitleColor: '#8db5fd',
    previewTitleBorder: 'rgba(141,181,253,0.2)',
    nameBg: '#153448',
    nameColor: '#dfd0b8',
    msgBg: '#f9e4d4',
    msgColor: '#153448',
    accent: '#8db5fd',
    seedMsgs: [
      { user: 'iopred', text: 'Welcome to stream! 🌸', role: 'owner' },
      { user: 'SiamViewer', text: 'ยินดีต้อนรับ!', role: 'normal' },
      { user: 'Barbara', text: 'hello everyone 💙', role: 'mod' },
    ],
    extraMsgs: [
      { user: 'Tyeler', text: 'สวัสดี! 🙏', role: 'normal' },
      { user: 'ChaiLover', text: 'Thai style is best ✨', role: 'normal' },
      { user: 'iopred', text: 'thank you all 🌸', role: 'owner' },
      { user: 'vorporeal', text: 'so beautiful!', role: 'normal' },
      { user: 'Barbara', text: 'loving the vibes', role: 'mod' },
    ],
  },
  {
    id: 'bluerain',
    name: 'Blue Rain',
    desc: 'Clean & playful blue bubble style',
    detailRoute: '/past-work/bluerain',
    tags: ['Blue', 'Clean', 'Playful'],
    filterTags: ['light', 'colorful'],
    layout: 'stacked',
    previewBg: 'linear-gradient(135deg, #1a2744, #2d3a6b)',
    previewTitle: '🌧 CHAT',
    previewTitleColor: '#a2cbe2',
    previewTitleBorder: 'rgba(162,203,226,0.2)',
    nameBg: '#a2cbe2',
    nameColor: '#4b527e',
    msgBg: '#ffffff',
    msgColor: '#4b527e',
    accent: '#6587d9',
    seedMsgs: [
      { user: 'StreamerPro', text: 'stream starting! 🎮', role: 'owner' },
      { user: 'AquaMod', text: "let's go chat!", role: 'mod' },
      { user: 'BlueBird', text: 'looks so nice 💙', role: 'normal' },
    ],
    extraMsgs: [
      { user: 'RainDrop', text: 'so clean 💧', role: 'normal' },
      { user: 'BlueMoon', text: 'fave overlay!', role: 'normal' },
      { user: 'CoolMod', text: 'chat is popping off', role: 'mod' },
      { user: 'NightOwl', text: 'PogChamp 🐦', role: 'normal' },
      { user: 'StreamerPro', text: "let's gooo! 🎮", role: 'owner' },
    ],
  },
  {
    id: 'meimi',
    name: 'Meimi',
    detailRoute: '/past-work/meimi',
    desc: 'Bright & vibrant multi-color names',
    tags: ['Colorful', 'Bright', 'Vibrant'],
    filterTags: ['colorful', 'light'],
    layout: 'inline',
    previewBg: 'linear-gradient(135deg, #0d1026, #1a1a36)',
    previewTitle: '✨ LIVE CHAT',
    previewTitleColor: '#5bceff',
    previewTitleBorder: 'rgba(91,206,255,0.2)',
    nameBg: 'transparent',
    nameColor: '#5bceff',
    msgBg: 'rgba(255,255,255,0.9)',
    msgColor: '#1a1a2e',
    accent: '#5bceff',
    ownerColor: '#fc8ab5',
    memberColor: '#ffcf52',
    modColor: '#e18cff',
    normalColor: '#5bceff',
    seedMsgs: [
      { user: 'StarPink', text: 'welcome everyone! 💕', role: 'owner' },
      { user: 'PurpleMod', text: 'chat looking good 💜', role: 'mod' },
      { user: 'CyanFan', text: 'so vibrant! 🌟', role: 'normal' },
    ],
    extraMsgs: [
      { user: 'GoldMember', text: 'this is so pretty ✨', role: 'member' },
      { user: 'RainbowUser', text: 'love the vibe 🌈', role: 'normal' },
      { user: 'StarPink', text: 'omg the colors! 💕', role: 'owner' },
      { user: 'CyanViewer', text: 'super cool overlay!', role: 'normal' },
      { user: 'PurpleMod', text: 'keeping chat clean 💜', role: 'mod' },
    ],
  },
  {
    id: 'hirigon',
    name: 'Hirigon',
    detailRoute: '/past-work/hirigon',
    desc: 'Bold crimson drama on dark background',
    tags: ['Dark', 'Bold', 'Dramatic'],
    filterTags: ['dark'],
    layout: 'inline',
    previewBg: 'linear-gradient(135deg, #1a0005, #2a000a)',
    previewTitle: '⚔ LIVE CHAT',
    previewTitleColor: '#cf1527',
    previewTitleBorder: 'rgba(207,21,39,0.2)',
    nameBg: 'transparent',
    nameColor: '#771422',
    msgBg: '#4e454f',
    msgColor: '#ffffff',
    accent: '#cf1527',
    ownerColor: '#ffa729',
    memberColor: '#771422',
    modColor: '#cf1527',
    normalColor: '#771422',
    seedMsgs: [
      { user: 'DarkLord', text: 'stream begins... 🔥', role: 'owner' },
      { user: 'CrimsonMod', text: 'darkness gathers ⚔', role: 'mod' },
      { user: 'ShadowFan', text: 'epic overlay!', role: 'normal' },
    ],
    extraMsgs: [
      { user: 'VoidWalker', text: 'so dramatic 🌑', role: 'normal' },
      { user: 'BloodMoon', text: 'this theme goes hard 🔥', role: 'normal' },
      { user: 'DarkLord', text: 'the darkness calls...', role: 'owner' },
      { user: 'CrimsonMod', text: 'heed the warning ⚔', role: 'mod' },
      { user: 'ShadowUser', text: 'nice overlay!', role: 'normal' },
    ],
  },
  {
    id: 'reenie',
    name: 'Reenie',
    detailRoute: '/past-work/reenie',
    desc: 'Deep navy with sharp clean contrast',
    tags: ['Navy', 'Sharp', 'Clean'],
    filterTags: ['dark', 'light'],
    layout: 'stacked',
    previewBg: 'linear-gradient(135deg, #0a0e1f, #141e61)',
    previewTitle: '⚓ CHAT',
    previewTitleColor: '#a2cbe2',
    previewTitleBorder: 'rgba(162,203,226,0.2)',
    nameBg: '#a2cbe2',
    nameColor: '#141e61',
    msgBg: '#ffffff',
    msgColor: '#242a48',
    accent: '#4b527e',
    normalColor: '#4b527e',
    modColor: '#141e61',
    seedMsgs: [
      { user: 'NavyCapt', text: 'stream is live ⚓', role: 'owner' },
      { user: 'DeepMod', text: 'welcome aboard! 🚢', role: 'mod' },
      { user: 'AzureFan', text: 'smooth overlay 🌊', role: 'normal' },
    ],
    extraMsgs: [
      { user: 'TidalFan', text: 'clean design 💙', role: 'normal' },
      { user: 'CoastalView', text: 'love this navy look!', role: 'normal' },
      { user: 'NavyCapt', text: 'steady as she goes ⚓', role: 'owner' },
      { user: 'DeepMod', text: 'all hands on deck!', role: 'mod' },
      { user: 'AzureUser', text: 'smooth sailing 🌊', role: 'normal' },
    ],
  },
  {
    id: 'sheep',
    name: 'Sheep',
    detailRoute: '/past-work/sheep',
    desc: 'Cozy dark vibes with warm pink accents',
    tags: ['Cozy', 'Dark', 'Cute'],
    filterTags: ['dark', 'warm'],
    layout: 'inline',
    previewBg: 'linear-gradient(135deg, #1a1218, #251520)',
    previewTitle: '🐑 LIVE CHAT',
    previewTitleColor: '#ffbbb6',
    previewTitleBorder: 'rgba(255,187,182,0.2)',
    nameBg: 'transparent',
    nameColor: '#ff9eb5',
    msgBg: '#4e454f',
    msgColor: '#ffffff',
    accent: '#ffbbb6',
    ownerColor: '#ff6b8a',
    memberColor: '#ffbbb6',
    modColor: '#fcc75f',
    normalColor: '#ff9eb5',
    seedMsgs: [
      { user: 'FluffyOwner', text: 'welcome to the flock 🐑', role: 'owner' },
      { user: 'SoftMod', text: 'stay cozy ♡', role: 'mod' },
      { user: 'WoolyViewer', text: 'so cute 💕', role: 'normal' },
    ],
    extraMsgs: [
      { user: 'CozyFan', text: 'best overlay ever 🐑', role: 'normal' },
      { user: 'SheepLover', text: 'baa~ so comfy 💕', role: 'normal' },
      { user: 'FluffyOwner', text: 'cozy stream vibes 🐑', role: 'owner' },
      { user: 'SoftMod', text: 'come join us! ♡', role: 'mod' },
      { user: 'WarmViewer', text: 'this theme is so cute!', role: 'normal' },
    ],
  },
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'warm', label: 'Warm' },
  { id: 'colorful', label: 'Colorful' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRoleColor(work: PastWork, role: WorkMsg['role']): string {
  if (role === 'owner') return work.ownerColor ?? work.accent
  if (role === 'mod') return work.modColor ?? work.accent
  if (role === 'member') return work.memberColor ?? work.accent
  return work.normalColor ?? work.accent
}

// ── Message row components ────────────────────────────────────────────────────

function StackedMsg({ work, msg, entering }: { work: PastWork; msg: WorkMsg; entering: boolean }) {
  const nameColor = getRoleColor(work, msg.role)
  return (
    <div
      style={{
        marginBottom: '8px',
        animation: entering ? 'pwSlideIn 0.32s ease' : 'none',
      }}
    >
      <div style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '7px 7px 0 0',
        background: work.nameBg !== 'transparent' ? work.nameBg : `${nameColor}22`,
        color: work.nameBg !== 'transparent' ? work.nameColor : nameColor,
        fontSize: '10px', fontWeight: 800, letterSpacing: '0.02em',
      }}>
        {msg.user}
        {msg.role === 'owner' && <span style={{ marginLeft: '4px', opacity: 0.6, fontSize: '8px' }}>OWNER</span>}
        {msg.role === 'mod' && <span style={{ marginLeft: '4px', opacity: 0.6, fontSize: '8px' }}>MOD</span>}
      </div>
      <div style={{
        padding: '5px 10px',
        borderRadius: '0 7px 7px 7px',
        background: work.msgBg,
        color: work.msgColor,
        fontSize: '11px', lineHeight: 1.5,
      }}>
        {msg.text}
      </div>
    </div>
  )
}

function InlineMsg({ work, msg, entering }: { work: PastWork; msg: WorkMsg; entering: boolean }) {
  const nameColor = getRoleColor(work, msg.role)
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: '6px',
      padding: '5px 9px', marginBottom: '5px',
      borderRadius: '7px', background: work.msgBg,
      animation: entering ? 'pwSlideIn 0.32s ease' : 'none',
    }}>
      <span style={{ fontWeight: 800, fontSize: '11px', flexShrink: 0, color: nameColor }}>{msg.user}</span>
      <span style={{ fontSize: '11px', color: work.msgColor, lineHeight: 1.4 }}>{msg.text}</span>
    </div>
  )
}

// ── Work Card ─────────────────────────────────────────────────────────────────

function WorkCard({ work }: { work: PastWork }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<WorkMsg[]>(work.seedMsgs)
  const [msgKeys, setMsgKeys] = useState<number[]>([0, 1, 2])
  const [nextIdx, setNextIdx] = useState(0)
  const [keyCounter, setKeyCounter] = useState(10)

  const addMessage = useCallback(() => {
    const idx = nextIdx % work.extraMsgs.length
    const newMsg = work.extraMsgs[idx]
    setMessages(prev => [...prev.slice(-3), newMsg])
    setMsgKeys(prev => [...prev.slice(-3), keyCounter])
    setNextIdx(n => n + 1)
    setKeyCounter(k => k + 1)
  }, [nextIdx, keyCounter, work.extraMsgs])

  const MsgRow = work.layout === 'stacked' ? StackedMsg : InlineMsg

  return (
    <div
      onClick={() => work.detailRoute && navigate(work.detailRoute)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1.5px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: work.detailRoute ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* ── Chat preview ── */}
      <div style={{ background: work.previewBg, padding: '14px 14px 10px', minHeight: '170px', display: 'flex', flexDirection: 'column' }}>
        {/* Title bar */}
        <div style={{
          fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: work.previewTitleColor,
          borderBottom: `1px solid ${work.previewTitleBorder}`,
          paddingBottom: '8px', marginBottom: '10px',
        }}>
          {work.previewTitle}
        </div>
        {/* Messages */}
        {messages.map((msg, i) => (
          <MsgRow
            key={msgKeys[i]}
            work={work}
            msg={msg}
            entering={i === messages.length - 1 && msgKeys[i] >= 10}
          />
        ))}
      </div>

      {/* ── Info ── */}
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Name + desc */}
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', color: 'var(--warm-dark)', marginBottom: '3px' }}>
            {work.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--warm-muted)', fontStyle: 'italic' }}>{work.desc}</div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {work.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: '100px',
              background: 'var(--cream2)', border: '1px solid var(--border)', color: 'var(--warm-muted)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '4px' }}>
          <button
            onClick={e => { e.stopPropagation(); addMessage() }}
            style={{
              flex: 1, padding: '9px 12px', borderRadius: '100px',
              fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600,
              border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--warm-dark)',
              cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--orange)'
              e.currentTarget.style.color = 'var(--orange)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--warm-dark)'
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send Chat
          </button>
          {work.detailRoute ? (
            <button
              onClick={e => { e.stopPropagation(); navigate(work.detailRoute!) }}
              style={{
                padding: '9px 14px', borderRadius: '100px',
                fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700,
                background: 'var(--warm-dark)', color: 'var(--cream)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--orange)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--warm-dark)')}
            >
              View →
            </button>
          ) : (
            <span style={{
              padding: '9px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
              background: 'var(--cream2)', color: 'var(--warm-muted)', border: '1px solid var(--border)',
              flexShrink: 0,
            }}>
              Soon
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function PastWorkPage() {
  const isMobile = useIsMobile()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? PAST_WORKS
    : PAST_WORKS.filter(w => w.filterTags.includes(activeFilter))

  return (
    <>
      {/* keyframe animation injected once */}
      <style>{`
        @keyframes pwSlideIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '32px 20px 64px' : '64px 48px 80px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '8px' }}>
              Past Work
            </p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--warm-dark)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Templates I've made
            </h1>
            <p style={{ color: 'var(--warm-muted)', lineHeight: 1.6, maxWidth: '480px' }}>
              Each template started as a real commission or experiment — try sending a chat message to see it live.
            </p>
          </div>

          {/* ── Filter bar ── */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '7px 18px', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s',
                  border: activeFilter === f.id ? 'none' : '1.5px solid var(--border)',
                  background: activeFilter === f.id ? 'var(--warm-dark)' : 'var(--surface)',
                  color: activeFilter === f.id ? 'var(--cream)' : 'var(--warm-muted)',
                  boxShadow: activeFilter === f.id ? 'var(--shadow)' : 'none',
                }}
              >
                {f.label}
                {f.id === 'all' && (
                  <span style={{
                    marginLeft: '6px', fontSize: '0.68rem', fontWeight: 700,
                    padding: '1px 5px', borderRadius: '100px',
                    background: activeFilter === f.id ? 'var(--orange)' : 'var(--cream2)',
                    color: activeFilter === f.id ? 'white' : 'var(--warm-muted)',
                  }}>
                    {PAST_WORKS.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Grid ── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</p>
              <p style={{ color: 'var(--warm-muted)' }}>No templates match this filter.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: isMobile ? '14px' : '24px',
            }}>
              {filtered.map(work => <WorkCard key={work.id} work={work} />)}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

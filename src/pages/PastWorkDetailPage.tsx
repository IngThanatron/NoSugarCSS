import { useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'

type Role = 'owner' | 'moderator' | 'member' | 'normal'

// ── Theme registry ────────────────────────────────────────────────────────────

interface RolePool {
  user: string
  messages: string[]
}

interface WorkMeta {
  name: string
  desc: string
  tags: string[]
  demoUrl: string
  accentColor: string
  bgColor: string
  font: string
  roles: Record<Role, RolePool>
}

const WORKS: Record<string, WorkMeta> = {
  sheep: {
    name: 'Sheep',
    desc: 'Cozy & warm bubble chat with a soft wooly character divider between messages. Each role gets a distinct warm tone — perfect for comfy lifestyle streams.',
    tags: ['Warm', 'Cozy', 'Cute', 'Bubble'],
    demoUrl: '/themes/sheep/demo.html',
    accentColor: '#fcc75f',
    bgColor: '#4e454f',
    font: 'Mitr',
    roles: {
      owner: {
        user: 'SheepStreamer',
        messages: [
          'Welcome to the cozy corner! 🐑',
          'Thanks for all the support!',
          'raid time!! let\'s goooo 🚀',
          'gg everyone, great session!',
        ],
      },
      moderator: {
        user: 'WoolMod',
        messages: [
          'Chat is open! Keep it fluffy 🌸',
          'Welcome new viewers!',
          'Stay warm and kind chat 💛',
          'No drama in the wool shop!',
        ],
      },
      member: {
        user: 'FluffyMember',
        messages: [
          'Month 2 and still cozy 🐑',
          'Love this stream so much!',
          'Best community ever 💛',
          'PogChamp PogChamp',
        ],
      },
      normal: {
        user: 'CloudViewer',
        messages: [
          'So soft and cute!',
          'First time here, hi everyone!',
          'This CSS is adorable 🐑',
          'smooth and clean!',
          'love the sheep divider haha',
        ],
      },
    },
  },
  meimi: {
    name: 'Meimi',
    desc: 'Vibrant & playful design with colorful per-role name badges. Owner gets pink, mods get purple, members get yellow — each role is instantly recognizable at a glance.',
    tags: ['Colorful', 'Playful', 'Light', 'Bubble'],
    demoUrl: '/themes/meimi/demo.html',
    accentColor: '#fc8ab5',
    bgColor: '#f0f0f0',
    font: 'Pridi',
    roles: {
      owner: {
        user: 'MeimiOwner',
        messages: [
          'Hello everyone! 💖',
          'Thanks for joining today!',
          'Raiding now!! 🎉',
          'Great stream everyone!',
        ],
      },
      moderator: {
        user: 'PurpleMod',
        messages: [
          'Stream is live! 🎉',
          'Welcome to the chat!',
          'Keep it friendly everyone 💜',
          'No spoilers please!',
        ],
      },
      member: {
        user: 'StarMember',
        messages: [
          'These colors are amazing! ✨',
          'Month 4 hype!!',
          'Best stream of the week 🌟',
          'POGGERS POGGERS',
        ],
      },
      normal: {
        user: 'CyanViewer',
        messages: [
          'First time here, love it!',
          'The colors are so vivid!',
          'ภาษาไทยฮัลโหล 🙏',
          'amazing CSS work!',
          'subscribed because of this overlay',
        ],
      },
    },
  },
  hirigon: {
    name: 'Hirigon',
    desc: 'Dark & dramatic style with deep crimson accents. Strong visual contrast makes every message pop. Ideal for intense gaming streams or dark-themed channels.',
    tags: ['Dark', 'Dramatic', 'Bold', 'Gaming'],
    demoUrl: '/themes/hirigon/demo.html',
    accentColor: '#ffa729',
    bgColor: '#4e454f',
    font: 'Pridi',
    roles: {
      owner: {
        user: 'HirigonOwner',
        messages: [
          'Darkness awaits! 🔥',
          'Thanks for the support everyone!',
          'Raid incoming!! ⚔️',
          'gg no re, perfect run 😈',
        ],
      },
      moderator: {
        user: 'CrimsonMod',
        messages: [
          'Chat rules apply. Stay sharp. ⚔️',
          'Welcome to the stream!',
          'Keep it civil in chat.',
          'No spoilers in chat!',
        ],
      },
      member: {
        user: 'DarkMember',
        messages: [
          'This theme is intense 💀',
          'Month 5 — still here!',
          'Best dark overlay ever 🖤',
          'PogChamp PogChamp',
        ],
      },
      normal: {
        user: 'ShadowViewer',
        messages: [
          'Love the dark aesthetic',
          'First time here, wow!',
          'ภาษาไทยฮัลโหล 🙏',
          'the crimson really pops',
          'perfect for horror streams',
        ],
      },
    },
  },
  reenie: {
    name: 'Reenie',
    desc: 'Clean & elegant navy-toned design with soft white bubbles. The structured layout and KoHo font give it a professional feel, great for talk shows or educational streams.',
    tags: ['Clean', 'Elegant', 'Navy', 'Minimal'],
    demoUrl: '/themes/reenie/demo.html',
    accentColor: '#242a48',
    bgColor: '#f5f5f5',
    font: 'KoHo',
    roles: {
      owner: {
        user: 'ReenieOwner',
        messages: [
          'Let\'s go everyone! 🎮',
          'Thanks for being here!',
          'Raid time!! 🚀',
          'gg, great game!',
        ],
      },
      moderator: {
        user: 'NavyMod',
        messages: [
          'Chat is open, keep it clean! 🌊',
          'Welcome new viewers!',
          'Please stay on topic 👍',
          'No spoilers!',
        ],
      },
      member: {
        user: 'ReenieMember',
        messages: [
          'Love this clean design! ✨',
          'Month 3 member!',
          'Such an elegant overlay 💙',
          'PogChamp',
        ],
      },
      normal: {
        user: 'BluViewer',
        messages: [
          'Very elegant, nice work!',
          'First time here, hello!',
          'ภาษาไทยฮัลโหล 🙏',
          'the font choice is perfect',
          'so clean and readable',
        ],
      },
    },
  },
  bluerain: {
    name: 'Blue Rain',
    desc: 'Clean & playful bubble-style layout. Name badge sits above the message, giving each chat a postcard feel. Uses Itim cursive for a soft, friendly look.',
    tags: ['Blue', 'Clean', 'Playful', 'Bubble'],
    demoUrl: '/themes/bluerain/demo.html',
    accentColor: '#6587d9',
    bgColor: '#1a2744',
    font: 'Itim',
    roles: {
      owner: {
        user: 'StreamerPro',
        messages: [
          "Let's gooo! 🎮",
          'Thanks for hanging out everyone!',
          'raid incoming!! 🚀',
          'gg ez no re 😎',
        ],
      },
      moderator: {
        user: 'AquaMod',
        messages: [
          'Chat is open! Keep it friendly 🌊',
          'Welcome to the stream!',
          'No spoilers please!',
          'Stay hydrated chat 💧',
        ],
      },
      member: {
        user: 'BlueMember',
        messages: [
          'Love this overlay 💙',
          'Month 3 hype!!',
          'Best stream today 🎉',
          'PogChamp PogChamp',
        ],
      },
      normal: {
        user: 'RainDrop',
        messages: [
          'So clean!',
          'First time here, hello!',
          'ภาษาไทยฮัลโหล 🙏',
          'smooth sailing 🌊',
          'this CSS is amazing',
        ],
      },
    },
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function PastWorkDetailPage() {
  const { themeId = '' } = useParams<{ themeId: string }>()
  const isMobile = useIsMobile()
  const work = WORKS[themeId.toLowerCase()]

  const iframeRef = useRef<HTMLIFrameElement>(null)
  // Per-role message index counters
  const roleIdx = useRef<Record<Role, number>>({ owner: 0, moderator: 0, member: 0, normal: 0 })

  const sendRole = useCallback((role: Role) => {
    if (!work) return
    const pool = work.roles[role]
    const idx = roleIdx.current[role] % pool.messages.length
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'addMessage', user: pool.user, text: pool.messages[idx], role },
      '*'
    )
    roleIdx.current[role]++
  }, [work])

  if (!work) {
    return (
      <main style={{ paddingTop: '120px', minHeight: '100vh', textAlign: 'center' }}>
        <p style={{ color: 'var(--warm-muted)', marginBottom: '16px' }}>Theme not found.</p>
        <Link to="/past-work" style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Past Work
        </Link>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '24px 20px 64px' : '48px 48px 80px' }}>

        {/* ── Breadcrumb ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.82rem', color: 'var(--warm-muted)' }}>
          <Link to="/past-work" style={{ color: 'var(--warm-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-muted)')}
          >
            Past Work
          </Link>
          <span>›</span>
          <span style={{ color: 'var(--warm-dark)', fontWeight: 600 }}>{work.name}</span>
        </div>

        {/* ── Layout: Info left, Demo right ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
          gap: isMobile ? '32px' : '48px',
          alignItems: 'start',
        }}>

          {/* ── Left panel: Info + controls ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Header */}
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '8px' }}>
                Past Work
              </p>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--warm-dark)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                {work.name}
              </h1>
              <p style={{ color: 'var(--warm-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {work.desc}
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {work.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: '100px',
                  background: 'var(--cream2)', border: '1px solid var(--border)', color: 'var(--warm-muted)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Details */}
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--warm-muted)' }}>Font</span>
                <span style={{ fontWeight: 600, color: 'var(--warm-dark)' }}>{work.font}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--warm-muted)' }}>Accent</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--warm-dark)' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: work.accentColor, display: 'inline-block' }}/>
                  {work.accentColor}
                </span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--warm-muted)' }}>Platform</span>
                <span style={{ fontWeight: 600, color: 'var(--warm-dark)' }}>YouTube Live Chat</span>
              </div>
            </div>

            {/* Send message controls */}
            <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '4px' }}>
                Try it out
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--warm-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                Send messages as different chat roles to see how each one looks.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {([
                  { role: 'owner'     as Role, label: 'Owner',     icon: '👑', color: '#ffa729' },
                  { role: 'moderator' as Role, label: 'Moderator', icon: '🛡️', color: '#4b7bec' },
                  { role: 'member'    as Role, label: 'Member',    icon: '⭐', color: '#20bf6b' },
                  { role: 'normal'    as Role, label: 'Viewer',    icon: '💬', color: 'var(--warm-muted)' },
                ]).map(({ role, label, icon, color }) => (
                  <button
                    key={role}
                    onClick={() => sendRole(role)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', borderRadius: '10px',
                      fontFamily: 'inherit', fontSize: '0.84rem', fontWeight: 600,
                      border: '1.5px solid var(--border)', background: 'transparent',
                      color: 'var(--warm-dark)', cursor: 'pointer', transition: 'all 0.15s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = color
                      e.currentTarget.style.background = `${color}12`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--warm-dark)', fontSize: '0.84rem' }}>{label}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--warm-muted)', marginTop: '1px' }}>
                        as <span style={{ fontWeight: 600 }}>{work.roles[role].user}</span>
                      </div>
                    </div>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--warm-muted)', flexShrink: 0 }}>
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right panel: iframe demo ── */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: '96px' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-muted)', marginBottom: '12px' }}>
              Live Preview
            </p>

            {/* Browser chrome wrapper */}
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1.5px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              background: '#1a2744',
            }}>
              {/* Fake browser titlebar */}
              <div style={{
                background: 'oklch(96% 0.006 222)',
                borderBottom: '1px solid var(--border)',
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, background: 'var(--cream2)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7rem', color: 'var(--warm-muted)', textAlign: 'center' }}>
                  OBS Browser Source — BlueRain Chat Overlay
                </div>
              </div>

              {/* The actual iframe */}
              <iframe
                ref={iframeRef}
                src={work.demoUrl}
                title={`${work.name} demo`}
                style={{
                  width: '100%',
                  height: isMobile ? '420px' : '560px',
                  border: 'none',
                  background: work.bgColor,
                  display: 'block',
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--warm-muted)', textAlign: 'center' }}>
              This is how it looks inside OBS Browser Source — transparent background, no scrollbar.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}

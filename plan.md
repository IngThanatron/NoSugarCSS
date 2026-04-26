# NoSugarCSS — Implementation Plan

## Context
Convert Claude Design prototypes (`project/index.html` + `project/customize.html`) into a production React + TypeScript SaaS landing site. 3 tiers: Free (instant code), Standard (Ko-fi, 490 THB — main focus), Premium (Discord contact). Stack: React 18, TypeScript, Vite, Tailwind CSS v4, Zustand, React Router v6, Vercel.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Build | Vite 5 + React 18 + TypeScript | Replace CDN React/Babel from prototype |
| Styling | Tailwind CSS v4 + CSS custom properties | Keep OKLCH palette as `:root` vars |
| State | Zustand | `useThemeStore` (customizer) + `useUIStore` (modals/toasts) |
| Routing | React Router v6 | SPA: `/` + `/customize` + `/themes` |
| Payments | Ko-fi per-theme product URLs | Stored in `themes.ts`, no SDK needed |
| Fonts | Google Fonts CDN | DM Serif Display, Plus Jakarta Sans, JetBrains Mono |
| Database | Supabase (Postgres) | Orders + license keys, dashboard to view data, free tier |
| Deploy | Vercel | Static SPA + `/api` serverless functions for webhook |

---

## Brand Tokens (do not modify — exact values from prototype)

```css
:root {
  --cream: oklch(97.5% 0.005 222);
  --cream2: oklch(94% 0.008 222);
  --peach: oklch(82% 0.04 222);
  --orange: oklch(46% 0.07 222);
  --amber: oklch(62% 0.05 222);
  --warm-dark: oklch(16% 0.012 222);
  --warm-mid: oklch(42% 0.018 222);
  --warm-muted: oklch(60% 0.014 222);
  --surface: oklch(99.5% 0.003 222);
  --border: oklch(90% 0.010 222);
  --shadow: 0 2px 20px oklch(40% 0.04 222 / 0.12);
  --shadow-lg: 0 8px 48px oklch(35% 0.05 222 / 0.18);
}
```

---

## Folder Structure

```
nosugarCSS/
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   ├── globals.css          # :root vars, @import fonts, base resets
│   │   └── animations.css       # chatSlide, chatBounce, chatFade, chatPop, chatGlow, floatUp
│   ├── data/
│   │   ├── themes.ts            # STD_THEMES (Cyberpunk, Red Dead, Tavern)
│   │   ├── plans.ts             # Free / Standard / Premium
│   │   └── messages.ts          # POOL_MESSAGES × 10, DONATION_MESSAGES × 3
│   ├── types/index.ts           # All shared interfaces + enums
│   ├── store/
│   │   ├── useThemeStore.ts     # CustomizerConfig (sessionStorage persist)
│   │   └── useUIStore.ts        # Toast queue, modal state
│   ├── hooks/
│   │   ├── useNavScroll.ts      # Scroll-hide nav (4px threshold)
│   │   ├── useAutoChat.ts       # setInterval 1800ms message injection
│   │   └── useCopyCSS.ts        # clipboard API + 2s "Copied!" state
│   ├── lib/
│   │   └── cssGenerator.ts      # Pure fn: CustomizerConfig → CSS string
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MeshBackground.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── ColorField.tsx
│   │   │   ├── SliderField.tsx
│   │   │   ├── SelectField.tsx
│   │   │   └── Toast.tsx
│   │   ├── chat/
│   │   │   ├── ChatWindow.tsx       # Fully controlled, config-driven
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── DonationMessage.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   └── MascotArea.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FloatBubble.tsx
│   │   │   └── FloatingBubbles.tsx
│   │   ├── pricing/
│   │   │   ├── PricingSection.tsx
│   │   │   ├── PricingCard.tsx      # Dynamic ThemeCardStyle for Standard
│   │   │   ├── FeatureList.tsx      # '—' / '✓' / '✦' icon logic
│   │   │   ├── ThemeTabSwitcher.tsx
│   │   │   └── mocks/
│   │   │       ├── FreeMockChat.tsx
│   │   │       ├── StandardMockChat.tsx
│   │   │       └── PremiumMockChat.tsx
│   │   ├── demo/
│   │   │   ├── DemoSection.tsx
│   │   │   ├── InteractiveDemo.tsx  # Local state only, no Zustand
│   │   │   ├── DemoControls.tsx
│   │   │   └── DemoPreview.tsx
│   │   └── customizer/
│   │       ├── CustomizerLayout.tsx
│   │       ├── CustomizerTopBar.tsx
│   │       ├── CustomizerSidebar.tsx
│   │       ├── PreviewPanel.tsx
│   │       └── CSSCodePanel.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── CustomizePage.tsx        # Full-screen, no nav/footer
│       ├── ThemeCatalogPage.tsx     # Phase 5
│       └── ThemeDetailPage.tsx      # Phase 5
├── api/
│   └── .gitkeep                     # Reserved for Ko-fi webhook (Phase 6)
├── index.html
├── vite.config.ts                   # @/ alias → src/
├── tsconfig.json
├── vercel.json                      # { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
└── package.json
```

---

## Data Models

```typescript
// src/types/index.ts

export type AnimationId = 'slide' | 'bounce' | 'fade' | 'pop' | 'glow';
export type TierId = 'free' | 'standard' | 'premium';

export interface Theme {
  id: string;
  label: string;           // 'Cyberpunk'
  icon: string;            // '⚡'
  tier: TierId;
  kofiUrl: string;         // Ko-fi product URL ('' for free, '#contact' for premium)
  price: number;           // 0 or 490
  bg: string;
  headerBg: string;
  headerColor: string;
  headerBorder: string;
  headerTitle: string;
  msgBg: string;
  msgBorder: string;
  userColor: string;
  textColor: string;
  cardStyle: ThemeCardStyle;
  sampleUsers: string[];
}

export interface ThemeCardStyle {
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  pillBg: string;
  pillColor: string;
  pillBorder: string;
}

export interface CustomizerConfig {
  titleText: string;       // default: "LIVE CHAT"
  titleColor: string;      // default: "#f59e0b"
  headerBg: string;        // default: "#0d0d1f"
  chatBg: string;          // default: "#1a1a2e"
  transparentBg: boolean;  // default: false
  msgBgEnabled: boolean;   // default: true
  msgBgColor: string;      // default: "#ffffff"
  msgBgOpacity: number;    // default: 6 (0–40)
  usernameColor: string;   // default: "#f59e0b"
  fontColor: string;       // default: "#e5e5e5"
  fontSize: number;        // default: 13 (10–24)
  fontFamily: string;      // default: "Plus Jakarta Sans"
  fontWeight: string;      // default: "400"
  borderRadius: number;    // default: 10 (0–20)
  msgSpacing: number;      // default: 4 (0–16)
  paddingX: number;        // default: 10 (4–24)
  paddingY: number;        // default: 7 (4–16)
  animation: AnimationId;  // default: "slide"
  showMascot: boolean;     // default: true
}

// ─────────────────────────────────────────────
// DATABASE SCHEMA (Supabase / Postgres)
// ─────────────────────────────────────────────

// orders table
export interface Order {
  id: string;                    // uuid PK
  kofi_transaction_id: string;   // unique — dedup protection against duplicate webhooks
  email: string;
  plan_id: string;               // 'cyberpunk' | 'cowboy' | 'medieval' | ...
  amount: number;                // in THB
  promo_code: string | null;     // which promo drove the sale (from Ko-fi message field)
  created_at: string;            // timestamptz
  delivered_at: string | null;   // set when email is sent
}

// licenses table
export interface License {
  id: string;                    // uuid PK
  order_id: string;              // FK → orders.id
  license_key: string;           // unique — format: NSC-XXXX-XXXX-XXXX
  is_active: boolean;            // default true; set false to revoke
  created_at: string;
}

export interface Plan {
  id: TierId;
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  featured: boolean;
  ctaLabel: string;
  ctaAction: 'scroll-catalog' | 'kofi' | 'contact';
  features: { text: string; type: 'check' | 'minus' | 'star' }[];
}
```

---

## WBS — 7 Phases

Each phase = independently deployable Vercel URL.

---

### ~~Phase 1 — Scaffold + Brand Shell~~ ✅ DONE
> Deliverable: Vercel URL renders nav + footer on cream background. Looks like NoSugarCSS.

- [x] `npm create vite@latest nosugarCSS -- --template react-ts`
- [x] Install: `tailwindcss@next`, `react-router-dom`, `zustand`
- [x] `vite.config.ts` with `@/` → `src/` path alias
- [x] `vercel.json` SPA rewrite rule
- [x] Port `:root` CSS vars exactly into `globals.css`
- [x] Port all animation keyframes into `animations.css`
- [x] Import Google Fonts (DM Serif Display, Plus Jakarta Sans, JetBrains Mono)
- [x] `Nav.tsx` + `useNavScroll` hook (4px scroll threshold, hide/show)
- [x] `Footer.tsx` (logo, description, social links, copyright)
- [x] `MeshBackground.tsx` (fixed radial-gradient mesh)
- [x] Stub `HomePage.tsx` + `CustomizePage.tsx`
- [x] Wire router in `App.tsx`
- [ ] Deploy to Vercel

---

### ~~Phase 2 — Landing Page: Hero + Pricing~~ ✅ DONE
> Deliverable: Full homepage. Visitor sees all 3 pricing tiers with interactive Standard theme tabs.

- [x] `src/types/index.ts` — all interfaces
- [x] `src/data/themes.ts` — Cyberpunk, Red Dead, Tavern (exact colors from prototype)
- [x] `src/data/plans.ts` — 3 plans
- [x] `FloatBubble.tsx` + `FloatingBubbles.tsx` with exact positions + stagger delays
- [x] `HeroSection.tsx` — badge, italic-orange title, subtitle, 2 CTA buttons
- [x] `FreeMockChat.tsx`, `StandardMockChat.tsx`, `PremiumMockChat.tsx`
- [x] `FeatureList.tsx` — '—' / '✓' / '✦' per feature type
- [x] `ThemeTabSwitcher.tsx` — pill buttons
- [x] `PricingCard.tsx` — dynamic `ThemeCardStyle` on Standard card
- [x] `PricingSection.tsx` — 3-column grid
- [x] Standard CTA: `href={theme.kofiUrl}` with `target="_blank" rel="noopener"` (placeholder URL until Ko-fi is configured)
- [x] Wire `HomePage.tsx`
- [ ] Premium CTA: add Discord URL → pending (need your Discord link)
- [ ] Deploy

---

### ~~Phase 3 — Customizer Mock UI (`/customize`)~~ ✅ DONE
> Deliverable: Full customizer layout renders with all controls visible and a static chat preview. Nothing is wired — all values are hardcoded defaults. Review layout before any logic is written.

- [x] `src/data/messages.ts` (10 pool messages + 3 donation messages from prototype)
- [x] `ui/` atoms with static props (no onChange wired yet): `Toggle.tsx`, `ColorField.tsx`, `SliderField.tsx`, `SelectField.tsx`
- [x] `ChatWindow.tsx`, `ChatMessage.tsx`, `DonationMessage.tsx`, `ChatHeader.tsx`, `MascotArea.tsx` — hardcoded default config
- [x] `CSSCodePanel.tsx` — static placeholder CSS string, copy button renders but does nothing yet
- [x] `CustomizerSidebar.tsx` — all 7 sections render with default values (no onChange)
- [x] `CustomizerTopBar.tsx` — all buttons render, no handlers yet
- [x] `PreviewPanel.tsx` — dark bg, grid overlay, static chat preview
- [x] `CustomizerLayout.tsx` — 300px sidebar + 1fr preview (no nav/footer)
- [x] `CustomizePage.tsx` (full-screen layout)
- [ ] **Review with owner before Phase 4**
- [ ] Deploy

---

### ~~Phase 4 — Customizer Logic + License Gate~~ ✅ DONE
> Deliverable: Customizer is fully functional. Controls update the preview live. CSS is generated and copyable. License key gate is enforced.

- [x] `useThemeStore.ts` (Zustand + sessionStorage persist) — `CustomizerConfig` state
- [x] `useUIStore.ts` (toast queue)
- [x] Wire all sidebar controls to `useThemeStore` via `set(key, val)`
- [x] `lib/cssGenerator.ts` — pure function `(config: CustomizerConfig) => string`
  - Includes `/* NoSugar CSS Chat */` watermark comment for unlicensed users
- [x] Wire `CSSCodePanel.tsx` to live CSS output from generator
- [x] `useCopyCSS.ts` — `navigator.clipboard.writeText` + 2s "✓ Copied!" state
- [x] `useAutoChat.ts` — 1800ms interval with cleanup on unmount
- [x] Wire "Send Chat" / "Auto Chat" / "Donation" buttons
- [x] `Toast.tsx` + wire into `useUIStore`
- [ ] **License gate** — deferred to Phase 7 (needs Supabase setup first)
- [ ] Deploy

---

### ~~Phase 5 — Interactive Demo + Full Polish~~ ✅ DONE
> Deliverable: "Play with Standard" demo live on homepage. Site pixel-perfect. Domain connected.

- [x] `DemoControls.tsx` — theme picker, 8 color presets + custom hex, animation picker
- [x] `DemoPreview.tsx` — live chat window, "Send Chat", "Open Full Customizer →" link
- [x] `InteractiveDemo.tsx` — local state only, message cycling
- [x] `DemoSection.tsx` — section wrapper
- [x] Full responsive pass (breakpoint: 768px)
  - [x] Single-column pricing + demo on mobile
  - [x] Featured card: remove `transform: scale` on mobile
  - [x] Footer: flex-direction column
- [x] `Button.tsx` unification across all CTAs
- [x] `Badge.tsx` (Featured, Standard, NEW)
- [x] `og-image.png` placeholder (1200×630 brand card)
- [x] `favicon.svg`
- [x] SEO: `<title>`, `<meta name="description">`, Open Graph tags
- [ ] Connect custom domain in Vercel (manual step — needs Vercel dashboard)
- [ ] Deploy

---

### ~~Phase 6 — Theme Catalog Page (SEO + Growth)~~ ✅ DONE
> Deliverable: `/themes` page as primary SEO surface. Browse and buy themes.

- [x] `/themes` + `/themes/:themeId` routes
- [x] `ThemeCatalogPage.tsx` — grid + tag filter bar
- [x] `ThemeCard.tsx` — mini preview, name, price, tags, Ko-fi CTA
- [x] `ThemeDetailPage.tsx` — full preview + buy button
- [x] `isNew`, `isPopular`, `tags` fields on `Theme` type + data
- [x] Added Y2K + Neon Synthwave themes to `themes.ts` (marked `isNew`)
- [ ] `vite-plugin-sitemap` for SEO (optional — can add later)
- [ ] Deploy

---

### ~~Phase 7 — Ko-fi Webhook + Supabase + Analytics~~ ✅ DONE
> Deliverable: Purchase triggers webhook → order saved to DB → license key generated → CSS delivered via email. Full automation, no manual work.

- [x] **Supabase schema** — `supabase/migrations/001_init.sql`
  - `orders` table (id, kofi_transaction_id, email, plan_id, amount, promo_code, created_at, delivered_at)
  - `licenses` table (id, order_id, license_key, is_active, created_at)
  - RLS enabled on both tables (service role only)
  - Indexes on `license_key` and `kofi_transaction_id`
- [x] `api/kofi-webhook.ts` Vercel serverless function
  - Verify `KOFI_VERIFICATION_TOKEN`
  - Parse Ko-fi `data` form field (JSON string)
  - Idempotency check via `kofi_transaction_id`
  - Insert `orders` row + generate `NSC-XXXX-XXXX-XXXX` license key + insert `licenses` row
  - Send delivery email via Resend (theme CSS + license key in HTML email)
  - Update `orders.delivered_at`
- [x] `api/verify-license.ts` Vercel serverless function
  - `GET /api/verify-license?key=NSC-...` → `{ valid: boolean, planId: string }`
  - Format-checks key before DB query
  - CORS header for same-origin browser fetch
- [x] `LicenseBanner.tsx` — shown to unlicensed users; inline key input + Activate button
- [x] `CustomizePage.tsx` — reads `?license=KEY` on mount, calls verify API, sets `licensed` state, passes to `generateCSS`
- [x] `.env.example` — all required env vars documented with comments
- [x] `src/lib/plausible.ts` — typed `track()` helper, no-ops in dev/when script absent
- [x] Analytics wired at all 5 event sites:
  - `theme_view` — `ThemeDetailPage` on mount
  - `buy_click` — Ko-fi button in `ThemeDetailPage`
  - `customizer_open` — `CustomizePage` on mount
  - `css_copied` — copy button handler
  - `license_verified` — successful license activation
- [x] Plausible `<script>` tag in `index.html` (commented — uncomment + replace `YOUR_DOMAIN` after deploy)
- [x] `@vercel/node` installed as devDependency (types for API functions)
- [ ] **Manual: Run migration in Supabase SQL editor** (`supabase/migrations/001_init.sql`)
- [ ] **Manual: Set env vars in Vercel dashboard** (see `.env.example`)
- [ ] **Manual: Uncomment Plausible script in `index.html`** + replace `YOUR_DOMAIN`
- [ ] **Manual: Test with Ko-fi sandbox webhook**
- [ ] **Manual: Deploy** (`vercel --prod`)

---

## Key Architecture Decisions

1. **CSS vars = single source of truth** — OKLCH palette in `:root`, referenced via Tailwind `@theme`. Theme switching = updating CSS variables (same mechanic as OBS CSS injection — it's the product).

2. **`themes.ts` is TypeScript, not JSON** — compiler enforces completeness. `getThemeById()` and `getThemesByTier()` helpers live alongside data.

3. **`cssGenerator.ts` is a pure function** — testable without a browser. Phase 6 webhook reuses it for email delivery.

4. **Ko-fi URLs are per-theme** — enables per-theme pricing, bundle packs, and promotions by editing one field.

5. **Customizer is free and ungated** — watermark comment in CSS output is the only free-tier signal. Developers sharing the customizer URL = free acquisition.

6. **Supabase over Vercel KV** — relational DB lets you query your orders, filter by date/promo, and add referral tracking later without restructuring. You can see your customers in a real dashboard without writing code.

7. **Mock UI before logic (Phase 3 → 4)** — customizer layout is reviewed and approved before any state wiring or CSS generation is written. Avoids rework if layout needs changes.

---

## Suggestions for Future Consideration

- **License keys** — webhook generates a short key per purchase, included in delivery email. `/customize?license=XXXX` via localStorage unlocks no-watermark mode (client-side, honor system, zero backend complexity).
- **Theme bundles** — `bundleId` field on `Theme`, one Ko-fi product maps to multiple themes, all delivered in one email.
- **OBS Browser Source endpoint** — `/api/overlay/[licenseKey]` renders minimal HTML with CSS applied — OBS loads it directly. Eliminates copy-paste step. Premium premium feature.

---

## Verification Checklist

- `vite build` passes with zero type errors
- `vercel --prod` deploys without errors
- All pages render correctly on mobile (375px) and desktop (1440px)
- Customizer Mock UI (Phase 3): all 7 sidebar sections visible, preview renders with hardcoded defaults
- Customizer Logic (Phase 4): changing any control updates the preview live, CSS output matches prototype
- Copy button writes to clipboard and shows "✓ Copied!" for 2s
- Auto-chat fires at 1800ms and cleans up on unmount
- Checkerboard shows when `transparentBg: true`
- License gate: valid key removes watermark, invalid/no key shows banner
- Standard card Ko-fi CTA opens correct URL in new tab
- Premium CTA scrolls to or opens contact
- Webhook (Phase 7): POST with mock Ko-fi payload → row in `orders`, row in `licenses`, email delivered, `delivered_at` updated
- Duplicate webhook (same `kofi_transaction_id`) → no duplicate row inserted

---

## Source Files

- `project/index.html` — primary design (brand, hero, pricing, demo, all component structure)
- `project/customize.html` — customizer design (CSS generator logic, sidebar controls, default config)

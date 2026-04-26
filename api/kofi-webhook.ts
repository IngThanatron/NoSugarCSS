// Vercel serverless function — Node.js runtime
// Triggered by Ko-fi when a purchase is completed
//
// Required env vars:
//   KOFI_VERIFICATION_TOKEN  — from Ko-fi Webhooks settings page
//   SUPABASE_URL             — your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY — service role key (never expose to frontend)
//   RESEND_API_KEY           — from resend.com
//   RESEND_FROM              — e.g. "NoSugar CSS Chat <noreply@yourdomain.com>"

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { generateCSS } from '../src/lib/cssGenerator.js'
import { DEFAULT_CONFIG } from '../src/types/index.js'
import { getThemeById } from '../src/data/themes.js'

// Ko-fi webhook payload shape (simplified)
interface KofiPayload {
  type: string                  // 'Donation' | 'Shop Order' | 'Subscription'
  verification_token: string
  kofi_transaction_id: string
  from_name: string
  email: string
  message: string | null        // buyer message — used for promo codes
  amount: string                // "490.00"
  currency: string
  timestamp: string
  shop_items?: { direct_link_code: string }[]
}

function generateLicenseKey(): string {
  const seg = () => Math.random().toString(36).slice(2, 6).toUpperCase()
  return `NSC-${seg()}-${seg()}-${seg()}`
}

function extractPromoCode(message: string | null): string | null {
  if (!message) return null
  // Look for patterns like PROMO:CODE or just a short all-caps word
  const match = message.match(/\b([A-Z0-9]{4,12})\b/)
  return match ? match[1] : null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Ko-fi sends data as a form field named "data" containing a JSON string
  const raw = req.body?.data
  if (!raw) return res.status(400).json({ error: 'Missing data field' })

  let payload: KofiPayload
  try {
    payload = typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return res.status(400).json({ error: 'Invalid JSON in data field' })
  }

  // Verify token
  if (payload.verification_token !== process.env.KOFI_VERIFICATION_TOKEN) {
    return res.status(401).json({ error: 'Invalid verification token' })
  }

  // Only process shop orders and donations (not subscriptions)
  if (!['Donation', 'Shop Order'].includes(payload.type)) {
    return res.status(200).json({ skipped: true })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Idempotency check — don't process the same transaction twice
  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('kofi_transaction_id', payload.kofi_transaction_id)
    .single()

  if (existing) {
    return res.status(200).json({ duplicate: true })
  }

  // Resolve which theme was purchased
  // Shop Order: use shop item direct_link_code mapped to theme id
  // Donation: default to cyberpunk (or parse from message)
  const shopCode = payload.shop_items?.[0]?.direct_link_code
  const themeId = shopCode ?? 'cyberpunk'
  const theme = getThemeById(themeId)

  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      kofi_transaction_id: payload.kofi_transaction_id,
      email: payload.email,
      plan_id: themeId,
      amount: Math.round(parseFloat(payload.amount)),
      promo_code: extractPromoCode(payload.message),
    })
    .select()
    .single()

  if (orderErr || !order) {
    console.error('Order insert failed', orderErr)
    return res.status(500).json({ error: 'DB error' })
  }

  // Generate license key
  const licenseKey = generateLicenseKey()

  const { error: licErr } = await supabase.from('licenses').insert({
    order_id: order.id,
    license_key: licenseKey,
  })

  if (licErr) {
    console.error('License insert failed', licErr)
    return res.status(500).json({ error: 'License DB error' })
  }

  // Generate CSS for the purchased theme
  const config = theme
    ? {
        ...DEFAULT_CONFIG,
        chatBg: theme.bg,
        headerBg: theme.headerBg,
        titleColor: theme.headerColor,
        usernameColor: theme.userColor,
        fontColor: theme.textColor,
      }
    : DEFAULT_CONFIG

  const css = generateCSS(config, true) // true = licensed, no watermark

  // Send delivery email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY)
  const themeName = theme?.label ?? 'Custom'

  await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'NoSugar CSS Chat <noreply@example.com>',
    to: payload.email,
    subject: `Your ${themeName} theme is here! 🎉 — NoSugar CSS Chat`,
    html: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
        <h1 style="font-family: Georgia, serif; font-size: 2rem; margin-bottom: 8px;">Your theme is ready 🎉</h1>
        <p style="color: #666; margin-bottom: 32px;">Thanks for purchasing the <strong>${themeName}</strong> theme from NoSugar CSS Chat!</p>

        <h2 style="font-size: 1rem; margin-bottom: 8px;">Your License Key</h2>
        <div style="background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 1.1rem; letter-spacing: 0.1em; margin-bottom: 32px;">
          ${licenseKey}
        </div>
        <p style="color: #666; font-size: 0.875rem; margin-bottom: 32px;">
          Use this key at <a href="${process.env.VITE_SITE_URL ?? 'https://yoursite.com'}/customize?license=${licenseKey}" style="color: #7c5228;">nosugar.css/customize?license=${licenseKey}</a> to unlock the full customizer with no watermark.
        </p>

        <h2 style="font-size: 1rem; margin-bottom: 8px;">Your CSS</h2>
        <pre style="background: #1a1a2e; color: #00f5ff; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 0.75rem; line-height: 1.6;">${css.replace(/</g, '&lt;')}</pre>

        <p style="color: #999; font-size: 0.8rem; margin-top: 32px;">
          Drop this CSS into OBS Browser Source → Properties → Custom CSS.<br>
          Need help? Reply to this email or find me on Discord.
        </p>
      </div>
    `,
  })

  // Mark delivered
  await supabase
    .from('orders')
    .update({ delivered_at: new Date().toISOString() })
    .eq('id', order.id)

  return res.status(200).json({ success: true, licenseKey })
}

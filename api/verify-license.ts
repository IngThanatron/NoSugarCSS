// Vercel serverless function — Node.js runtime
// Validates a license key and returns the associated plan
//
// GET /api/verify-license?key=NSC-XXXX-XXXX-XXXX
// → { valid: true, planId: 'cyberpunk' }   (200)
// → { valid: false }                        (200, key not found or inactive)
// → { error: '...' }                        (400/500)

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from the same origin (browser fetch from /customize)
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_SITE_URL ?? '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const key = typeof req.query.key === 'string' ? req.query.key.trim() : null
  if (!key) return res.status(400).json({ error: 'Missing key parameter' })

  // Basic format check before hitting the DB
  if (!/^NSC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
    return res.status(200).json({ valid: false })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('licenses')
    .select('is_active, orders(plan_id)')
    .eq('license_key', key)
    .single()

  if (error || !data) {
    return res.status(200).json({ valid: false })
  }

  if (!data.is_active) {
    return res.status(200).json({ valid: false })
  }

  // @ts-expect-error — Supabase join returns nested object
  const planId: string = data.orders?.plan_id ?? 'unknown'

  return res.status(200).json({ valid: true, planId })
}

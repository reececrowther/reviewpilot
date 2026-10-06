import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

interface TrialPayload {
  name: string
  business: string
  email: string
  gbp_name?: string
}

export async function POST(req: NextRequest) {
  let body: TrialPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, business, email, gbp_name } = body

  if (!name?.trim() || !business?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL ?? 'reece.crowther@platform81.com'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      // Once you have a verified domain at resend.com, change this to your domain
      from: 'ReviewPilot <onboarding@resend.dev>',
      to: notificationEmail,
      replyTo: email,
      subject: `New trial sign-up: ${business}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 24px; color: #1B4332;">New ReviewPilot trial sign-up</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #78716C; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #1C1917; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #78716C;">Business</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #1C1917; font-weight: 600;">${escapeHtml(business)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #78716C;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E2DC; font-size: 14px; color: #1C1917;">
                <a href="mailto:${escapeHtml(email)}" style="color: #1B4332;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 14px; color: #78716C;">GBP name</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1C1917;">${gbp_name ? escapeHtml(gbp_name) : '—'}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; padding: 16px; background: #DCFCE7; border-radius: 8px; font-size: 13px; color: #1B4332;">
            Reply to this email to reach ${escapeHtml(name)} directly — your reply goes to ${escapeHtml(email)}.
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

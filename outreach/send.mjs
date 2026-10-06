/**
 * ReviewPilot outreach mailer
 * Uses Gmail SMTP with an App Password (no OAuth needed)
 *
 * Setup:
 *   1. Enable 2FA on the Gmail account
 *   2. myaccount.google.com → Security → App Passwords → create one
 *   3. Add to .env.local:
 *        GMAIL_USER=hello@reviewpilot.co.uk   (or your Gmail address)
 *        GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 *
 * Usage (Claude will call this):
 *   node outreach/send.mjs \
 *     --to "jane@hairbyjane.co.uk" \
 *     --name "Jane" \
 *     --subject "Your Google reviews, Hair by Jane" \
 *     --template cold \
 *     --business "Hair by Jane" \
 *     --reviews 84 \
 *     --area "Formby"
 */

import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { parseArgs } from 'util'

// Load .env.local manually (no dotenv dependency needed)
const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env.local')
try {
  const env = readFileSync(envPath, 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length && !key.startsWith('#')) {
      process.env[key.trim()] = rest.join('=').trim()
    }
  }
} catch {
  // .env.local not found — rely on actual env vars
}

const { values: args } = parseArgs({
  options: {
    to:       { type: 'string' },
    name:     { type: 'string' },
    subject:  { type: 'string' },
    template: { type: 'string' }, // cold | followup1 | followup2 | interested | no | angry
    business: { type: 'string' },
    reviews:  { type: 'string' },
    area:     { type: 'string' },
    type:     { type: 'string' }, // business type e.g. "hair salon"
    body:     { type: 'string' }, // override: pass a full body instead of using a template
    dry:      { type: 'boolean', default: false }, // dry run — print without sending
  },
})

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.local')
  process.exit(1)
}

if (!args.to || !args.name) {
  console.error('--to and --name are required')
  process.exit(1)
}

// ── Templates ─────────────────────────────────────────────────────────────────

function templates(a) {
  const vercelUrl = process.env.VERCEL_URL || '[your ReviewPilot URL]'

  return {
    cold: {
      subject: args.subject || `Your Google reviews, ${a.business}`,
      body: `Hi ${a.name},

I was looking at ${a.business} on Google — you've got ${a.reviews} reviews, which is great for a ${a.type || 'business'} in ${a.area || 'your area'}.

One thing I noticed: most of them don't have a reply. That's completely normal — replying to every review takes time you probably don't have. The problem is Google actually ranks businesses higher when they respond, and customers read the replies before they book.

I built a tool called ReviewPilot that handles this automatically. It reads each new review, writes a reply in your voice, and posts it within a few hours — so you look professional without lifting a finger. Bad reviews get flagged to you directly so you stay in control.

It's £29/month and there's a 14-day free trial with no card required — no forms, no card, just reply and I'll get you set up.

${vercelUrl}

Reece
ReviewPilot — Built in Merseyside
${GMAIL_USER}`,
    },

    followup1: {
      subject: args.subject || `Re: Your Google reviews, ${a.business}`,
      body: `Hi ${a.name},

Just following up on my email from a few days ago about your Google reviews.

I know inboxes get busy — totally understand. I'll keep this short:

If you'd like ReviewPilot to handle your review replies for a fortnight at no cost, just hit reply and I'll get you set up. No forms, no card, no faff. I'll sort it personally.

Reece`,
    },

    followup2: {
      subject: args.subject || `Last one from me — ReviewPilot`,
      body: `Hi ${a.name},

Last email, I promise.

If review replies are something you'd ever want off your plate, you know where I am. 14-day free trial, cancel any time.

${vercelUrl}

Reece`,
    },

    interested: {
      subject: args.subject || `Re: ReviewPilot`,
      body: `Hi ${a.name},

Great to hear from you — happy to answer anything.

The setup is straightforward: you connect your Google account (takes about five minutes), tell me a bit about how you like to talk to customers, and ReviewPilot handles the rest. Every reply it drafts is based on your voice — not a generic template.

You can also switch on approval mode if you'd rather check each reply before it goes out. Most people turn this off after the first week once they see how it sounds.

Easiest next step: I'll set up your free trial now if you want to try it. Just send me your business name as it appears on Google and I'll get it started today.

Reece`,
    },

    no: {
      subject: args.subject || `Re: ReviewPilot`,
      body: `Hi ${a.name},

No problem at all — appreciate you getting back to me.

If you ever change your mind, the trial is always there. Good luck with ${a.business}.

Reece`,
    },

    angry: {
      subject: args.subject || `Re: ReviewPilot`,
      body: `Hi ${a.name},

Apologies for the unwanted email — I'll make sure you're not contacted again.

Reece`,
    },
  }
}

// ── Build the email ────────────────────────────────────────────────────────────

const tmpl = templates(args)
const chosen = tmpl[args.template] || { subject: args.subject, body: args.body }

if (!chosen.body) {
  console.error(`Unknown template "${args.template}". Options: cold, followup1, followup2, interested, no, angry`)
  console.error('Or pass --body "..." to use a custom body.')
  process.exit(1)
}

const subject = chosen.subject || args.subject
const body    = args.body || chosen.body

console.log('\n─── Email preview ───────────────────────────────────────')
console.log(`From:    ${GMAIL_USER}`)
console.log(`To:      ${args.to}`)
console.log(`Subject: ${subject}`)
console.log('─────────────────────────────────────────────────────────')
console.log(body)
console.log('─────────────────────────────────────────────────────────\n')

if (args.dry) {
  console.log('[Dry run] Email not sent.')
  process.exit(0)
}

// ── Send ──────────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

try {
  const info = await transporter.sendMail({
    from:    `Reece at ReviewPilot <${GMAIL_USER}>`,
    to:      args.to,
    subject: subject,
    text:    body,
  })
  console.log(`Sent. Message ID: ${info.messageId}`)
} catch (err) {
  console.error('Send failed:', err.message)
  process.exit(1)
}

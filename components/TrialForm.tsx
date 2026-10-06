'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function TrialForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value.trim()

    const payload = {
      name:     get('name'),
      business: get('business'),
      email:    get('email'),
      gbp_name: get('gbp_name'),
    }

    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="success" aria-live="polite">
        <span className="success-star" aria-hidden="true">★</span>
        <h3>You&apos;re on the list.</h3>
        <p>
          We&apos;ll be in touch within a few hours to get your profile connected.
          Check your inbox — and thank you for trusting us with your reputation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Smith"
          required
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="business">Business name</label>
        <input
          type="text"
          id="business"
          name="business"
          placeholder="The Hair Lounge"
          required
          autoComplete="organization"
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane@thehairlounge.co.uk"
          required
          autoComplete="email"
        />
      </div>

      <div className="field">
        <label htmlFor="gbp_name">
          Google Business Profile name{' '}
          <span className="opt">(optional — helps us find your profile faster)</span>
        </label>
        <input
          type="text"
          id="gbp_name"
          name="gbp_name"
          placeholder="The Hair Lounge Formby"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Start my free trial →'}
      </button>

      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong — please email{' '}
          <a href="mailto:hello@reviewpilot.co.uk">hello@reviewpilot.co.uk</a>{' '}
          directly.
        </p>
      )}

      <p className="form-foot">
        No card required. We&apos;ll be in touch within a few hours to get everything set up.
      </p>
    </form>
  )
}

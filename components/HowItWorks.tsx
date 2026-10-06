const steps = [
  {
    num: '1',
    title: 'Connect your Google account',
    body: 'Sign in with Google and select your Business Profile. We ask only for the permissions we need — access to your reviews, nothing else. Takes about ten minutes.',
  },
  {
    num: '2',
    title: 'Tell us how you speak',
    body: 'Write a few lines about your business and the tone you\'d use with customers. That\'s how ReviewPilot writes responses that sound like you — not like a corporate template.',
  },
  {
    num: '3',
    title: 'Every review gets a reply',
    body: '4 and 5-star reviews are responded to automatically within 24 hours. Any 1 or 2-star reviews are flagged to your inbox immediately so you can handle them personally.',
  },
]

export default function HowItWorks() {
  return (
    <section className="steps" id="how-it-works" aria-labelledby="steps-heading">
      <div className="wrap">
        <header className="steps-header">
          <span className="eyebrow">How it works</span>
          <h2 id="steps-heading">
            Up and running
            <br />
            in ten minutes.
          </h2>
        </header>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.num} className="step">
              <div className="step-num" aria-hidden="true">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

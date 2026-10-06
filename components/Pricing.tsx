const plans = [
  {
    name: 'Solo',
    price: '29',
    desc: 'One Google Business Profile. Fully automated. No faff.',
    badge: 'Most popular',
    featured: true,
    features: [
      'Automatic replies to 4 and 5-star reviews',
      'Instant inbox alert for 1 and 2-star reviews',
      'Responses written in your voice',
      'Monthly reputation report by email',
      'No contract — cancel any time',
    ],
  },
  {
    name: 'Multi-location',
    price: '59',
    desc: 'Up to 3 Google Business Profiles under one account.',
    badge: null,
    featured: false,
    features: [
      'Everything in Solo',
      'Up to 3 locations managed together',
      'Separate tone profile per location',
      'Combined monthly report across all profiles',
      'No contract — cancel any time',
    ],
  },
]

export default function Pricing() {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="wrap">
        <header className="pricing-header">
          <span className="eyebrow">Pricing</span>
          <h2 id="pricing-heading">
            Less than one hour of your time,
            <br />
            charged monthly.
          </h2>
        </header>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`plan${plan.featured ? ' featured' : ''}`}>
              {plan.badge && (
                <span className="plan-badge">{plan.badge}</span>
              )}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <sup>£</sup>{plan.price}<sub>/mo</sub>
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-features" role="list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#trial"
                className={`btn btn-block ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
              >
                Start 14-day free trial
              </a>
              <p className="plan-note">No card required during your trial.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

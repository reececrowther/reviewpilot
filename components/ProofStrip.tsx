const stats = [
  {
    figure: '64%',
    label: 'of businesses never respond to a single Google review',
  },
  {
    figure: '2.1×',
    label: 'more leads for businesses that respond to over 70% of reviews',
  },
  {
    figure: '18%',
    label: 'more revenue for businesses that respond to every review',
  },
]

export default function ProofStrip() {
  return (
    <div className="proof" role="region" aria-label="Key statistics">
      <div className="wrap proof-grid">
        {stats.map((s) => (
          <div key={s.figure} className="proof-stat">
            <strong>{s.figure}</strong>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

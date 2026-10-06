export default function Hero() {
  return (
    <header className="hero">
      <span className="hero-stars" aria-hidden="true">★ ★ ★ ★ ★</span>
      <h1>
        Your Google reviews,
        <br />
        <em>replied to.</em>
      </h1>
      <p className="hero-sub">
        ReviewPilot connects to your Google Business Profile and automatically
        responds to every review — within 24 hours. You set it up once.
        It runs itself.
      </p>
      <div className="hero-ctas">
        <a href="#trial" className="btn btn-primary btn-lg">
          Start my 14-day free trial
        </a>
        <a href="#how-it-works" className="btn btn-outline btn-lg">
          See how it works
        </a>
      </div>
      <p className="hero-note">
        No credit card required &nbsp;·&nbsp; No contract &nbsp;·&nbsp; Cancel any time
      </p>
    </header>
  )
}

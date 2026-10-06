import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="logo" aria-label="ReviewPilot home">
          <span className="logo-star" aria-hidden="true">★</span>
          ReviewPilot
        </Link>
        <ul className="nav-links" role="list">
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQs</a></li>
          <li>
            <a href="#trial" className="btn btn-primary">
              Start free trial
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

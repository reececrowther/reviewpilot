export default function Footer() {
  return (
    <footer>
      <span className="footer-logo">
        <span aria-hidden="true">★</span> ReviewPilot
      </span>
      <p>
        Built in Merseyside &nbsp;·&nbsp;{' '}
        <a href="mailto:hello@reviewpilot.co.uk">hello@reviewpilot.co.uk</a>
        &nbsp;·&nbsp;{' '}
        <a href="/privacy">Privacy policy</a>
      </p>
      <p style={{ marginTop: '6px' }}>
        © {new Date().getFullYear()} ReviewPilot. All rights reserved.
      </p>
    </footer>
  )
}

const faqs = [
  {
    q: 'Is automated review responding allowed by Google?',
    a: "Yes. Google provides a Business Profile API that lets authorised apps post replies on behalf of a verified business owner. ReviewPilot uses this API and is fully compliant with Google's terms — it's the same method used by Birdeye, Podium, and other major reputation platforms serving thousands of UK businesses.",
  },
  {
    q: 'What happens when I get a bad review?',
    a: 'We never automatically post responses to 1 or 2-star reviews. The moment one comes in, you\'ll receive an immediate email alert so you can read it and decide how to respond — or pick up the phone and sort it directly. You stay in control of anything that needs a personal touch.',
  },
  {
    q: 'Will the responses actually sound like my business?',
    a: "Yes. During setup we ask you to describe your business and how you'd naturally talk to customers. ReviewPilot uses that to write responses in your voice — not a generic \"Thank you for your review\" template. You can also switch on approval mode if you'd prefer to check every response before it goes out.",
  },
  {
    q: 'How long does setup take?',
    a: 'About ten minutes. You connect your Google account, select your Business Profile, and write a short description of your business. After that, ReviewPilot monitors your profile and handles responses automatically — there\'s nothing else to do.',
  },
  {
    q: 'Is there a contract or minimum commitment?',
    a: "No. ReviewPilot is a simple monthly subscription — no annual contracts, no minimum terms, no cancellation fees. Cancel any time from your account settings. We'd rather earn your business every month than lock you into something you can't get out of.",
  },
]

export default function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="wrap">
        <span className="eyebrow">Questions</span>
        <h2 id="faq-heading">Straight answers.</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

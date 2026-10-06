export default function Problem() {
  return (
    <section className="problem" aria-labelledby="problem-heading">
      <div className="wrap problem-grid">
        <div className="problem-text">
          <span className="eyebrow">The problem</span>
          <h2 id="problem-heading">
            Every ignored review is a customer you didn&apos;t win.
          </h2>
          <p>
            You know you should be responding. You keep meaning to get round to it.
            But between running the business, managing the team, and actually doing
            the work — it just doesn&apos;t happen.
          </p>
          <p>
            Google&apos;s algorithm weighs your response rate as a local ranking
            signal. Every unanswered review quietly pushes your listing down while
            businesses that do respond climb above you.
          </p>
          <p>
            ReviewPilot handles all of it automatically. Connect your Google account
            once. Every 4 and 5-star review gets a professional, personal reply.
            Any bad review goes straight to your inbox so you stay in control.
          </p>
        </div>

        <div className="problem-visual" aria-label="Review response comparison">
          <div className="review-card">
            <div className="r-stars" aria-label="5 stars">★★★★★</div>
            <p className="r-text">
              &ldquo;Absolutely brilliant from start to finish. Made me feel so welcome
              and the results speak for themselves. Will definitely be recommending
              to everyone I know.&rdquo;
            </p>
            <p className="r-meta">Sarah M. &nbsp;·&nbsp; 4 days ago</p>
            <div className="r-no-reply" role="status">
              ⏱ No response — 4 days and counting
            </div>
          </div>

          <div className="review-card">
            <div className="r-stars" aria-label="5 stars">★★★★★</div>
            <p className="r-text">
              &ldquo;Came in on a Saturday with no appointment, they fit me in straight
              away. Genuinely lovely team, brilliant results, and really reasonable
              on price too.&rdquo;
            </p>
            <p className="r-meta">James H. &nbsp;·&nbsp; 1 week ago</p>
            <div className="r-reply">
              <span className="r-reply-label">Owner response</span>
              Thank you so much, James — so glad we could fit you in! Saturdays are
              always busy but we always try our best. Really appreciate you taking
              the time to leave a review, and hope to see you again soon.
              <p className="r-reply-meta">
                Responded automatically by ReviewPilot &nbsp;·&nbsp; within 16 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

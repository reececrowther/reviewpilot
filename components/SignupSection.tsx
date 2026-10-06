import TrialForm from './TrialForm'

export default function SignupSection() {
  return (
    <section className="signup" id="trial" aria-labelledby="signup-heading">
      <div className="wrap signup-wrap">
        <span className="eyebrow">Start your free trial</span>
        <h2 id="signup-heading">
          14 days free.
          <br />
          No card needed.
        </h2>
        <p className="signup-sub">
          Fill in your details below and we&apos;ll be in touch within a few hours
          to get your profile connected. Built in Merseyside — we&apos;re local
          and we actually pick up the phone.
        </p>
        <div className="form-card">
          <TrialForm />
        </div>
      </div>
    </section>
  )
}

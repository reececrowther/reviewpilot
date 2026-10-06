import Nav           from '@/components/Nav'
import Hero          from '@/components/Hero'
import ProofStrip    from '@/components/ProofStrip'
import Problem       from '@/components/Problem'
import HowItWorks    from '@/components/HowItWorks'
import Pricing       from '@/components/Pricing'
import SignupSection from '@/components/SignupSection'
import Faq           from '@/components/Faq'
import Footer        from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <HowItWorks />
        <Pricing />
        <SignupSection />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

import Hero from '../sections/Hero'
import FeaturedWorks from '../sections/FeaturedWorks'
import SocialProof from '../sections/SocialProof'
import Services from '../sections/Services'
import HowItWorks from '../sections/HowItWorks'
import FAQ from '../sections/FAQ'
import CTASection from '../sections/CTASection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <SocialProof />
      <Services />
      <HowItWorks />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  )
}

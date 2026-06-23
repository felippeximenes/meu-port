import AnimateOnScroll from '../components/AnimateOnScroll'

export default function CTASection() {
  return (
    <div className="cta-section">
      <AnimateOnScroll>
        <div className="cta-section__decoration" aria-hidden="true">🌸</div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={80}>
        <div className="cta-section__heading">
          <p className="cta-section__heading-muted">Book a call,</p>
          <p className="cta-section__heading-white">and I'll take care of the rest.</p>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={160}>
        <a href="#" className="cta-section__btn">
          Book a Call
        </a>
      </AnimateOnScroll>
    </div>
  )
}

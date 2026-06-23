import AnimateOnScroll from '../components/AnimateOnScroll'

export default function Hero() {
  return (
    <section className="hero">
      <AnimateOnScroll delay={0}>
        <div className="hero__availability">
          <div className="hero__dot-wrapper">
            <span className="hero__dot-ring" aria-hidden="true" />
            <span className="hero__dot" />
          </div>
          <span className="hero__availability-text">2 projects left in March</span>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={80}>
        <h1 className="hero__heading">
          Carter is solving problems through strategic design and compelling visuals
        </h1>
      </AnimateOnScroll>

      <AnimateOnScroll delay={160}>
        <p className="hero__description">
          As a digital product designer with a strong focus on visual design and Framer websites,
          he collaborates closely with teams to craft seamless, user-centered experiences. A
          reliable partner in bringing ideas to life.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={240}>
        <a href="mailto:hello@michaelcarter.design" className="hero__cta">
          Email Me
        </a>
      </AnimateOnScroll>

      <AnimateOnScroll delay={320} className="hero__image-wrapper">
        <div className="hero__image-placeholder" aria-label="Michael Carter — Digital Product Designer">
          <span>Photo coming soon</span>
        </div>
        <div className="hero__image-fade" aria-hidden="true" />
      </AnimateOnScroll>
    </section>
  )
}

import AnimateOnScroll from '../components/AnimateOnScroll'

const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

export default function SocialProof() {
  return (
    <section className="social-proof">
      {/* Awwwards Badge */}
      <AnimateOnScroll>
        <div className="awwwards">
          <div className="awwwards__row">
            <div className="awwwards__icon" aria-hidden="true">W.</div>
            <span className="awwwards__lamp" aria-hidden="true">💡</span>
            <span className="awwwards__title">Awwwards Nominee</span>
          </div>
          <p className="awwwards__subtitle">
            Recognized for excellence in web design and innovative digital experiences.
          </p>
        </div>
      </AnimateOnScroll>

      {/* Project Preview */}
      <AnimateOnScroll delay={80}>
        <div className="project-preview-card">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="project-preview-card__link"
            aria-label="View Planza project"
          >
            <IconExternalLink />
          </a>
          <div
            className="project-preview-card__placeholder"
            role="img"
            aria-label="Planza — Framer Website project preview"
          />
        </div>
      </AnimateOnScroll>

      {/* Testimonial */}
      <AnimateOnScroll delay={160}>
        <div className="testimonial-card">
          <div className="testimonial-card__quote" aria-hidden="true">"</div>
          <p className="testimonial-card__text">
            Carter's design expertise goes beyond aesthetics—he crafts experiences that truly
            connect with users. A great collaborator and a problem-solver at heart.
          </p>
          <div className="testimonial-card__footer">
            <div className="testimonial-card__avatar" aria-hidden="true">S</div>
            <div className="testimonial-card__info">
              <span className="testimonial-card__name">Samantha</span>
              <span className="testimonial-card__role">Founder at NexaTech</span>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Stats */}
      <AnimateOnScroll delay={240}>
        <div className="stats-card">
          <div className="stat-item">
            <div className="stat-item__icon stat-item__icon--purple" aria-hidden="true">🎨</div>
            <div className="stat-item__content">
              <span className="stat-item__number">20+</span>
              <span className="stat-item__label">projects completed</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-item__icon stat-item__icon--green" aria-hidden="true">⚡</div>
            <div className="stat-item__content">
              <span className="stat-item__number">5+</span>
              <span className="stat-item__label">years of experience</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-item__icon stat-item__icon--yellow" aria-hidden="true">😊</div>
            <div className="stat-item__content">
              <span className="stat-item__number">10+</span>
              <span className="stat-item__label">happy clients</span>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Trusted badge */}
      <AnimateOnScroll delay={320}>
        <div className="trusted-badge">
          <div className="trusted-badge__avatars" aria-hidden="true">
            {['A', 'B', 'C', 'D'].map((letter) => (
              <div key={letter} className="trusted-badge__avatar">{letter}</div>
            ))}
          </div>
          <span className="trusted-badge__text">Trusted by many</span>
        </div>
      </AnimateOnScroll>
    </section>
  )
}

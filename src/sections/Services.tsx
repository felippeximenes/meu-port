import AnimateOnScroll from '../components/AnimateOnScroll'

const IconDiagonalArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
)

interface PreviewColors {
  one: string
  two: string
  three: string
}

interface ServiceCardProps {
  variant: 'light' | 'purple'
  title: string
  description: string
  tags: string[]
  previews: PreviewColors
}

function ServiceCard({ variant, title, description, tags, previews }: ServiceCardProps) {
  return (
    <div className={`service-card service-card--${variant}`}>
      <div className="service-card__header">
        <h3 className="service-card__title">{title}</h3>
        <a href="#" className="service-card__link-btn" aria-label={`${title} — view more`}>
          <IconDiagonalArrow />
        </a>
      </div>

      <p className="service-card__description">{description}</p>

      <div className="service-card__previews" aria-hidden="true">
        <div className="service-card__preview">
          <div className="service-card__preview-placeholder" style={{ background: previews.one }} />
        </div>
        <div className="service-card__preview">
          <div className="service-card__preview-placeholder" style={{ background: previews.two }} />
        </div>
        <div className="service-card__preview">
          <div className="service-card__preview-placeholder" style={{ background: previews.three }} />
        </div>
      </div>

      <div className="service-card__tags">
        {tags.map((tag, i) => (
          <span key={tag} className="service-card__tag">
            {tag}{i < tags.length - 1 ? ' ·' : ''}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="services-section">
      <AnimateOnScroll>
        <span className="section-label">Services</span>
        <div className="services-section__heading">
          <p className="services-section__heading-normal">
            Design solutions that elevate brands and create seamless user experiences.
          </p>
          <p className="services-section__heading-italic">
            I help bring ideas to life with strategy and creativity.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="service-cards">
        <AnimateOnScroll delay={80}>
          <ServiceCard
            variant="light"
            title="Branding Design"
            description="I craft distinctive brand identities that resonate with your audience and stand the test of time — from initial concept to full brand system."
            tags={['Logo design', 'Brand guideline', 'Brand strategy', '+more']}
            previews={{
              one: 'linear-gradient(135deg, #f5e6ff 0%, #e0c5ff 100%)',
              two: 'linear-gradient(135deg, #ffeee6 0%, #ffccb5 100%)',
              three: 'linear-gradient(135deg, #e6f0ff 0%, #b5ccff 100%)',
            }}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={160}>
          <ServiceCard
            variant="purple"
            title="Framer Development"
            description="I build fast, responsive, and visually stunning websites in Framer — from landing pages to multi-page experiences with smooth animations."
            tags={['Landing page', 'Multipages', 'Web migration', '+more']}
            previews={{
              one: 'rgba(255,255,255,0.18)',
              two: 'rgba(255,255,255,0.12)',
              three: 'rgba(255,255,255,0.22)',
            }}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={240}>
          <ServiceCard
            variant="light"
            title="UI/UX Design"
            description="I design intuitive digital products and interfaces that balance aesthetics with usability — making complex flows feel effortless for your users."
            tags={['Web & app design', 'Design system', 'Prototyping', '+more']}
            previews={{
              one: 'linear-gradient(135deg, #e6fff0 0%, #b5ffd0 100%)',
              two: 'linear-gradient(135deg, #fff6e6 0%, #ffe4b5 100%)',
              three: 'linear-gradient(135deg, #e6f5ff 0%, #b5d9ff 100%)',
            }}
          />
        </AnimateOnScroll>
      </div>
    </section>
  )
}

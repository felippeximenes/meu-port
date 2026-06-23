import { Link } from 'react-router-dom'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { projects } from '../data/projects'

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function FeaturedWorks() {
  return (
    <section className="featured-works">
      <AnimateOnScroll>
        <div className="featured-works__header">
          <h2 className="featured-works__title">Featured works</h2>
          <Link to="/works" className="featured-works__see-all" aria-label="See all works">
            See all <IconArrow />
          </Link>
        </div>
      </AnimateOnScroll>

      {projects.map((project, i) => (
        <AnimateOnScroll key={project.id} delay={i * 80}>
          <Link
            to={`/works/${project.slug}`}
            className="works-card"
            aria-label={`${project.title} — ${project.tags.join(', ')}`}
          >
            <div className={`works-card__bg ${project.bgClass}`} />
            <div className="works-card__overlay" aria-hidden="true" />
            <div className="works-card__gradient" aria-hidden="true" />
            <div className="works-card__content">
              <span className="works-card__title">{project.title}</span>
              <div className="works-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="works-card__tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        </AnimateOnScroll>
      ))}
    </section>
  )
}

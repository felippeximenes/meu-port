import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import AnimateOnScroll from '../components/AnimateOnScroll'
import CTASection from '../sections/CTASection'
import Footer from '../components/Footer'

export default function Works() {
  return (
    <>
      <section className="works-page">
        <AnimateOnScroll>
          <div className="works-page__header">
            <h1 className="works-page__title">All works</h1>
            <p className="works-page__subtitle">
              A collection of selected projects spanning brand identity, UI/UX design, and Framer
              web development.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="works-grid">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 80}>
              <Link
                to={`/works/${project.slug}`}
                className="works-grid-card"
                aria-label={`${project.title} — ${project.tags.join(', ')}`}
              >
                <div className={`works-card__bg ${project.bgClass}`} style={{ position: 'absolute', inset: 0 }} />
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
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  )
}

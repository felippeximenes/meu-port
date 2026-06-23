import AnimateOnScroll from '../components/AnimateOnScroll'
import CTASection from '../sections/CTASection'
import Footer from '../components/Footer'

const skills = [
  'Visual Design',
  'UI/UX Design',
  'Framer Development',
  'Brand Identity',
  'Design Systems',
  'Prototyping',
  'Motion Design',
  'User Research',
  'Web Design',
  'Mobile Design',
]

const experience = [
  {
    company: 'Freelance Studio',
    role: 'Senior Product Designer',
    period: '2022 — Present',
  },
  {
    company: 'NexaTech',
    role: 'UI/UX Designer',
    period: '2020 — 2022',
  },
  {
    company: 'Bright Creative Agency',
    role: 'Visual Designer',
    period: '2019 — 2020',
  },
]

export default function About() {
  return (
    <>
      <section className="about-page">
        <AnimateOnScroll>
          <h1 className="about-page__title">
            Design is how it works, not just how it looks.
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={80}>
          <div className="about-page__photo-wrapper">
            <div className="about-page__photo-placeholder" aria-label="Michael Carter — Digital Product Designer">
              Photo coming soon
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={160}>
          <p className="about-page__bio">
            Hi, I'm Michael Carter — a digital product designer based in New York with 5+ years of
            experience crafting thoughtful, user-centered digital experiences. My work sits at the
            intersection of strategic thinking and visual craft, helping startups and established
            brands communicate their value through design.
            <br /><br />
            I specialize in brand identity, UI/UX design, and Framer web development. I believe
            great design is never decoration — it's a tool for solving real problems and creating
            genuine connections between products and the people who use them.
            <br /><br />
            When I'm not designing, you'll find me exploring typography, experimenting with motion,
            or mentoring aspiring designers.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={240}>
          <div>
            <h2 className="about-page__block-title">Skills & expertise</h2>
            <div className="about-page__skills">
              {skills.map((skill) => (
                <span key={skill} className="about-page__skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={320}>
          <div>
            <h2 className="about-page__block-title">Experience</h2>
            <div className="experience-list">
              {experience.map((exp) => (
                <div key={exp.company} className="experience-item">
                  <span className="experience-item__company">{exp.company}</span>
                  <span className="experience-item__role">{exp.role}</span>
                  <span className="experience-item__period">{exp.period}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <CTASection />
      <Footer />
    </>
  )
}

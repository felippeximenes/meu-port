import AnimateOnScroll from '../components/AnimateOnScroll'

const steps = [
  {
    number: '01',
    title: 'Book a Call',
    description:
      "Let's start with a conversation! We'll discuss your goals, ideas, and how I can help bring them to life. This is where we align expectations and ensure a great fit.",
  },
  {
    number: '02',
    title: 'Project Brief',
    description:
      "Once we're on the same page, we'll define the project scope, timeline, and deliverables. A structured brief ensures a smooth and efficient process.",
  },
  {
    number: '03',
    title: 'Develop',
    description:
      "This is where the magic happens! I'll craft thoughtful designs and refine them based on feedback, ensuring the final outcome meets your vision and goals.",
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      "The final product is polished and ready to go. Whether it's a brand identity, UI/UX design, or a Framer website, you'll receive all the necessary files and guidance for a seamless handoff.",
  },
  {
    number: '05',
    title: 'Support',
    description:
      "Enjoy one month of free support after project delivery. I'll be available to answer questions, make minor adjustments, and ensure everything runs smoothly.",
  },
]

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <AnimateOnScroll>
        <div className="how-it-works__top">
          <span className="how-it-works__label">How it works</span>
          <div className="how-it-works__heading">
            <p className="how-it-works__heading-muted">
              A simple and efficient workflow to bring your vision to life.
            </p>
            <p className="how-it-works__heading-white">
              From the first call to final delivery, every step is designed for clarity and
              efficiency.
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="steps-list">
        {steps.map((step, i) => (
          <AnimateOnScroll key={step.number} delay={i * 60}>
            <div className="step-card">
              <div className="step-card__badge" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__description">{step.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  )
}

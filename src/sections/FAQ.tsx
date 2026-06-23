import { useState } from 'react'
import AnimateOnScroll from '../components/AnimateOnScroll'

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Most projects take between 2 to 6 weeks depending on scope and complexity. A landing page can be completed in 1–2 weeks, while a full brand identity or multi-page website may take 4–6 weeks. I'll provide a clear timeline in your project brief.",
  },
  {
    question: 'Do you offer revisions?',
    answer:
      'Yes! Every project includes up to 3 rounds of revisions to ensure you are completely satisfied with the outcome. Additional revision rounds can be arranged if needed.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'To kick things off, I need a clear project brief covering your goals, target audience, references you love, and any existing brand materials. The more context you provide, the better the result.',
  },
  {
    question: 'Can you work with my existing brand guidelines?',
    answer:
      'Absolutely. I can work within your established brand guidelines to create consistent, on-brand assets — or help you evolve and refine them if needed.',
  },
  {
    question: 'Do you provide post-project support?',
    answer:
      'Yes — every project comes with 1 month of free support after delivery. This covers minor adjustments, questions, and guidance to make sure everything is running perfectly.',
  },
  {
    question: "What's the best way to reach you?",
    answer:
      'The fastest way is to email me at hello@michaelcarter.design. You can also book a discovery call directly using the calendar link. I typically respond within 24 hours on business days.',
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="faq-item" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="faq-item__header">
        <span className="faq-item__question">{question}</span>
        <span className={`faq-item__icon ${isOpen ? 'faq-item__icon--open' : ''}`} aria-hidden="true">
          +
        </span>
      </div>
      <div className={`faq-item__answer ${isOpen ? 'faq-item__answer--open' : ''}`}>
        <p className="faq-item__answer-text">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq-section">
      <AnimateOnScroll>
        <div className="faq-section__top">
          <span className="section-label">FAQs</span>
          <div className="faq-section__heading">
            <p className="faq-section__heading-normal">
              Answers to common questions to help you understand
            </p>
            <p className="faq-section__heading-bold">
              the process and how we can work together.
            </p>
          </div>
          <a href="mailto:hello@michaelcarter.design" className="faq-section__cta-btn">
            Email Me
          </a>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={80}>
        <div className="faq-container">
          <div className="faq-container__badge">I'm here to help you</div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  )
}

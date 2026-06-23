import { useState, FormEvent } from 'react'
import AnimateOnScroll from '../components/AnimateOnScroll'
import Footer from '../components/Footer'

interface FormState {
  name: string
  email: string
  project: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', project: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="contact-page">
        <AnimateOnScroll>
          <div className="contact-page__header">
            <h1 className="contact-page__title">Let's work together.</h1>
            <p className="contact-page__subtitle">
              Have a project in mind? Fill out the form below or send me an email at{' '}
              <a href="mailto:hello@michaelcarter.design" style={{ color: 'inherit', textDecoration: 'underline' }}>
                hello@michaelcarter.design
              </a>
              . I typically respond within 24 hours on business days.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={80}>
          {submitted ? (
            <div className="contact-success">
              ✓ Thanks for reaching out! I'll get back to you within 24 hours.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label className="form-field__label" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-field__input"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-field__input"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="project">
                  Project type
                </label>
                <input
                  id="project"
                  name="project"
                  type="text"
                  className="form-field__input"
                  placeholder="e.g. Framer website, Brand identity, UI/UX..."
                  value={form.project}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label className="form-field__label" htmlFor="message">
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-field__textarea"
                  placeholder="What are you building? Who is it for? What's your timeline?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-form__submit">
                Send message
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </section>

      <Footer />
    </>
  )
}

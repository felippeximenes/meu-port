import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-1.9-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.3 3 12 3 12 3s-4.3 0-6.8.1C4.6 3.2 3.3 3.2 2.2 4.4 1.3 5.1 1 7 1 7S.7 9.2.7 11.4v2.1c0 2.2.3 4.4.3 4.4s.3 1.9 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.5 22 12 22 12 22s4.3 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2.2.3-4.4v-2.1C23.3 9.2 23 7 23 7zm-13.5 8.5V8l6.5 3.7-6.5 3.8z" />
  </svg>
)

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__brand">
          Michael Carter
        </Link>

        <div className="navbar__right">
          <div className="navbar__links">
            <NavLink to="/works" className="navbar__link">Work</NavLink>
            <NavLink to="/about" className="navbar__link">About</NavLink>
            <NavLink to="/contact" className="navbar__link">Contact</NavLink>
          </div>

          <div className="navbar__socials">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="navbar__social-icon" aria-label="X (Twitter)">
              <IconX />
            </a>
            <a href="mailto:hello@michaelcarter.design" className="navbar__social-icon" aria-label="Email">
              <IconMail />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="navbar__social-icon" aria-label="YouTube">
              <IconYoutube />
            </a>
          </div>

          <a href="#" className="navbar__cta">
            Use For Free
          </a>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__header">
            <Link to="/" className="mobile-menu__brand" onClick={() => setMenuOpen(false)}>
              Michael Carter
            </Link>
            <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <IconClose />
            </button>
          </div>

          <Link to="/" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/works" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link to="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  )
}

import { Link } from 'react-router-dom'

const IconFramer = () => (
  <svg width="14" height="14" viewBox="0 0 14 21" fill="currentColor">
    <path d="M0 0h14v7H7L0 0zM0 7h7l7 7H0V7zM0 14h7l-7 7V14z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__divider" />

      <div className="footer__links">
        <div className="footer__col">
          <span className="footer__col-label">Navigation</span>
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/works" className="footer__link">Works</Link>
          <Link to="/about" className="footer__link">About</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>

        <div className="footer__col">
          <span className="footer__col-label">Connect</span>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer__link">X (Twitter)</a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="footer__link">Threads</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__link">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__link">Youtube</a>
        </div>

        <div className="footer__col">
          <span className="footer__col-label">Project</span>
          <a href="#" className="footer__link">Framer Templates</a>
          <a href="#" className="footer__link">Become Affiliate</a>
          <a href="#" className="footer__link">Hire me on Contra</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copyright">©Irise Studio 2026. All rights reserved.</span>
        <span className="footer__made-with">
          <IconFramer />
          &nbsp;Made in Framer · Created by Rosyid Qoim
        </span>
      </div>
    </footer>
  )
}

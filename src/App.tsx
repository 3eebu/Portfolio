import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import StitchedPortfolioTitle from './components/stitched-title/StitchedPortfolioTitle'
import ToolsRow from './components/ToolsRow'
import { projects, type PortfolioProject } from './data/projects'
import portrait from './assets/figma/portrait.png'
import cardShape from './assets/figma/card-shape.svg'
import oliveCircle from './assets/figma/olive-circle.svg'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Primary navigation">
      <a className="navbar__brand" href="#top">Muhammad Saad</a>
      <div className="navbar__links">
        <a href="#profile">Profile</a>
        <a href="#work">Work</a>
        <a href="#tools">Tools</a>
        <a href="#contact">Contact</a>
      </div>
      <span className="navbar__note" aria-hidden="true">Turning ideas<br />into real things.</span>
    </nav>
  )
}

function CraftDetails() {
  return (
    <div className="craft-details" aria-hidden="true">
      <svg className="craft-details__thread" viewBox="0 0 1440 1720" fill="none" preserveAspectRatio="none">
        <path d="M 82 -16 C 90 94 117 183 213 207 C 245 216 263 204 278 189 C 293 173 319 174 325 195" />
        <path d="M 1438 299 C 1394 302 1410 264 1370 252 C 1330 240 1309 268 1290 283" />
        <path d="M 1452 1451 C 1406 1497 1361 1512 1306 1549 C 1260 1580 1207 1642 1180 1725" />
        <path className="craft-details__fine-thread" d="M 59 1240 C 103 1275 67 1310 93 1355 C 111 1386 173 1412 205 1412" />
        <path className="craft-details__stitch" d="m 493 241 7 8 m -7 0 8 -8 M 1260 338 l 8 8 m -8 0 8 -8 M 1302 322 l 6 6 m -6 0 6 -6" />
      </svg>
      <span className="craft-note craft-note--hero">Build<br />Create<br />Experiment<br />Repeat<span className="craft-note__dots">···</span></span>
      <span className="craft-note craft-note--label">Good<br />ideas<br />take time.</span>
      <span className="craft-note craft-note--bottom">Better<br />things<br />ahead.</span>
      <span className="craft-details__paper-scrap" />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Portfolio by Muhammad Saad</h1>
      <StitchedPortfolioTitle />
    </section>
  )
}
function HeroTagline() {
  return (
    <div className="hero-tagline" aria-label="Ideas, people, products. Turning ideas into real things.">
      <p className="hero-tagline__themes"><span />IDEAS · PEOPLE · PRODUCTS<span /></p>
      <p className="hero-tagline__line">TURNING IDEAS INTO REAL THINGS</p>
    </div>
  )
}

function ProfileCard() {
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="profile" ref={cardRef} className={`profile-card ${visible ? 'profile-card--visible' : ''}`} aria-labelledby="about-heading">
      <img className="profile-card__shape" src={cardShape} alt="" aria-hidden="true" />
      <span className="profile-card__tape" aria-hidden="true" />
      <div className="portrait">
        <img className="portrait__circle" src={oliveCircle} alt="" aria-hidden="true" />
        <img className="portrait__person" src={portrait} alt="Portrait of Muhammad Saad" width="398" height="493" />
        <svg className="portrait__rays" viewBox="0 0 42 50" fill="none" aria-hidden="true">
          <path d="M 9 24 C 6 21 4 18 2 15 M 19 16 C 18 11 17 8 16 5 M 29 18 C 32 13 34 10 38 8" stroke="#73653d" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="profile-identity">
        <h2>Muhammad Saad</h2>
        <p>Creative Technologist · Entrepreneur ·<br />Digital Builder</p>
      </div>
      <div className="about-content">
        <p className="about-content__eyebrow">HEY THERE <span aria-hidden="true">👋</span></p>
        <h2 id="about-heading">About me</h2>
        <svg className="about-content__underline" viewBox="0 0 142 14" fill="none" aria-hidden="true">
          <path d="M 3 10 C 32 4 84 4 138 7 M 17 12 C 54 8 97 8 128 9" stroke="#776b3e" strokeWidth="3" strokeLinecap="round" opacity=".82" />
        </svg>
        <p className="about-content__body">Hi, I’m Muhammad Saad, a creative technologist who enjoys turning ideas into things people can actually use, experience, and remember. I work across web design, development, digital products, branding, automation, and visual media, combining technical problem-solving with a strong creative eye. I enjoy building from scratch, experimenting with new ideas, and turning concepts into real products and businesses.</p>
        <ToolsRow />
      </div>
    </section>
  )
}

function ProjectCard({ project, onPreview }: { project: PortfolioProject; onPreview: (project: PortfolioProject) => void }) {
  return (
    <article className={`project-card project-card--${project.theme}`}>
      <button
        className="project-card__preview"
        type="button"
        onClick={() => onPreview(project)}
        aria-label={`Open a larger screenshot of ${project.name}`}
        aria-haspopup="dialog"
      >
        <span className="project-card__browser" aria-hidden="true">
          <span className="project-card__browser-bar">
            <span className="project-card__browser-dots"><i /><i /><i /></span>
            <span className="project-card__browser-label">SITE CAPTURE</span>
            <span className="project-card__browser-mark" />
          </span>
          <span className="project-card__viewport">
            <img src={project.previewImage} alt="" loading="lazy" />
          </span>
          <span className="project-card__zoom">Enlarge preview</span>
        </span>
      </button>
      <div className="project-card__content">
        <div className="project-card__eyebrow">
          <span>{project.number} / {project.kind}</span>
          <span className="project-card__status">{project.status}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-card__tags" aria-label={`${project.name} focus areas`}>
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </article>
  )
}

function ProjectPreviewDialog({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      className="project-preview-modal"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="project-preview-modal__panel" role="dialog" aria-modal="true" aria-labelledby="project-preview-title">
        <header className="project-preview-modal__header">
          <div>
            <p className="section-kicker">PROJECT CAPTURE · {project.number}</p>
            <h2 id="project-preview-title">{project.name}</h2>
          </div>
          <button ref={closeButtonRef} className="project-preview-modal__close" type="button" onClick={onClose} aria-label="Close project preview">×</button>
        </header>
        <div className="project-preview-modal__image">
          <img src={project.previewImage} alt={project.previewAlt} />
        </div>
        <footer className="project-preview-modal__footer">
          <p>{project.description}</p>
          <ul className="project-card__tags" aria-label={`${project.name} focus areas`}>
            {project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        </footer>
      </section>
    </div>,
    document.body,
  )
}

function PortfolioSections() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null)

  return (
    <div className="portfolio-sections">
      <section id="work" className="work-section" aria-labelledby="work-heading">
        <div className="section-inner">
          <div className="section-heading section-heading--work">
            <div>
              <p className="section-kicker">01 / SELECTED WORK</p>
              <h2 id="work-heading">Made to be <em>used.</em></h2>
            </div>
            <p className="section-heading__note">Websites and digital products built around real people, clear ideas, and a reason to come back.</p>
          </div>
          <div className="project-grid">
            {projects.map(project => <ProjectCard key={project.name} project={project} onPreview={setActiveProject} />)}
          </div>

          <div className="product-work">
            <div className="product-work__mark" aria-hidden="true"><span>&lt;/&gt;</span></div>
            <div className="product-work__copy">
              <p className="section-kicker">PRODUCT ENGINEERING · CMMN</p>
              <h3>CMMN Shield</h3>
              <p>A TypeScript security foundation for Discord, focused on link checks, threat signals, and safer moderation workflows.</p>
              <ul className="project-card__tags" aria-label="CMMN Shield technologies">
                <li>TypeScript</li><li>Discord.js</li><li>Security</li>
              </ul>
            </div>
            <span className="product-work__note">Built for safer communities.</span>
          </div>
        </div>
      </section>

      <section className="approach-section" aria-labelledby="approach-heading">
        <div className="section-inner">
          <div className="section-heading section-heading--approach">
            <div>
              <p className="section-kicker">02 / HOW I WORK</p>
              <h2 id="approach-heading">From first sketch<br />to <em>finished thing.</em></h2>
            </div>
            <p className="section-heading__note">A simple process keeps the work thoughtful, useful, and ready for real people.</p>
          </div>
          <ol className="approach-list">
            <li>
              <span className="approach-list__number">01</span>
              <h3>Understand</h3>
              <p>Start with who it is for, what they need, and what a good result should feel like.</p>
            </li>
            <li>
              <span className="approach-list__number">02</span>
              <h3>Shape</h3>
              <p>Give the idea a clear structure, a distinct visual language, and an easy path through it.</p>
            </li>
            <li>
              <span className="approach-list__number">03</span>
              <h3>Build</h3>
              <p>Turn the design into a responsive, working experience, then refine the details that matter.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-card">
          <div className="contact-card__stitches" aria-hidden="true" />
          <p className="section-kicker">03 / CONTACT</p>
          <h2 id="contact-heading">Have an idea<br />worth <em>making?</em></h2>
          <p className="contact-card__copy">I’m always interested in thoughtful websites, products, and creative collaborations.</p>
          <a className="contact-card__link" href="https://github.com/3eebu" target="_blank" rel="noreferrer">Find me on GitHub</a>
          <span className="contact-card__scribble" aria-hidden="true">Let’s make<br />it real.</span>
        </div>
        <footer className="portfolio-footer">
          <a href="#top">Muhammad Saad</a>
          <span>Designed with care · Built for the web</span>
          <a href="#top">Back to top</a>
        </footer>
      </section>
      {activeProject && <ProjectPreviewDialog project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span className="scroll-indicator__mouse"><span /></span>
      <span>SCROLL TO EXPLORE</span>
      <span className="scroll-indicator__line" />
    </div>
  )
}

function useCanvasScale() {
  const [scale, setScale] = useState(() => typeof window === 'undefined' ? 1 : Math.min(1, document.documentElement.clientWidth / 1440))
  useEffect(() => {
    const update = () => setScale(Math.min(1, document.documentElement.clientWidth / 1440))
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

export default function App() {
  const scale = useCanvasScale()
  const siteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const site = siteRef.current
    if (!site) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let x = 0
    let y = 0
    const paint = () => {
      site.style.setProperty('--grain-x', `${x.toFixed(2)}px`)
      site.style.setProperty('--grain-y', `${y.toFixed(2)}px`)
      frame = 0
    }
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === 'touch') return
      x = (event.clientX / window.innerWidth - .5) * 6
      y = (event.clientY / window.innerHeight - .5) * 6
      if (!frame) frame = window.requestAnimationFrame(paint)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div id="top" ref={siteRef} className="site">
      <div className="site__texture" aria-hidden="true" />
      <Navbar />
      <main className="portfolio-main">
        <div className="canvas-shell" style={{ height: `${1720 * scale}px` }}>
          <div className="canvas" style={{ transform: `scale(${scale})` }}>
            <CraftDetails />
            <Hero />
            <HeroTagline />
            <ProfileCard />
            <ScrollIndicator />
          </div>
        </div>
        <PortfolioSections />
      </main>
    </div>
  )
}

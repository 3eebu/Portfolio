import { useEffect, useRef, useState } from 'react'
import StitchedPortfolioTitle from './components/stitched-title/StitchedPortfolioTitle'
import ToolsRow from './components/ToolsRow'
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
      <main className="canvas-shell" style={{ height: `${1720 * scale}px` }}>
        <div className="canvas" style={{ transform: `scale(${scale})` }}>
          <CraftDetails />
          <Hero />
          <HeroTagline />
          <ProfileCard />
          <ScrollIndicator />
        </div>
      </main>
    </div>
  )
}

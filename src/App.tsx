import { useEffect, useRef, useState, type CSSProperties } from 'react'
import StitchedPortfolioTitle from './components/stitched-title/StitchedPortfolioTitle'
import portrait from './assets/figma/portrait.png'
import cardShape from './assets/figma/card-shape.svg'
import oliveCircle from './assets/figma/olive-circle.svg'
import photoshop from './assets/figma/photoshop.png'
import premiere from './assets/figma/premiere.png'
import lightroom from './assets/figma/lightroom.png'
import davinci from './assets/figma/davinci.png'
import procreate from './assets/figma/procreate.png'
import illustrator from './assets/figma/illustrator.png'
import github from './assets/figma/github.png'
import figma from './assets/figma/figma.png'

const tools = [
  { name: 'Photoshop', src: photoshop },
  { name: 'Premiere Pro', src: premiere },
  { name: 'Lightroom', src: lightroom },
  { name: 'DaVinci Resolve', src: davinci },
  { name: 'Procreate', src: procreate },
  { name: 'Illustrator', src: illustrator },
  { name: 'GitHub', src: github },
  { name: 'Figma', src: figma },
]

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
    </nav>
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
        <div className="tool-stack">
          <h3>TOOLS I WORK WITH</h3>
          <ul>
            {tools.map((tool, index) => (
              <li key={tool.name} style={{ '--tool-index': index } as CSSProperties}>
                <img src={tool.src} alt={tool.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
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

  return (
    <div id="top" className="site">
      <Navbar />
      <main className="canvas-shell" style={{ height: `${1720 * scale}px` }}>
        <div className="canvas" style={{ transform: `scale(${scale})` }}>
          <Hero />
          <HeroTagline />
          <ProfileCard />
          <ScrollIndicator />
        </div>
      </main>
    </div>
  )
}

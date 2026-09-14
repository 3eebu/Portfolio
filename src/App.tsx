import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import portfolioP from './assets/figma/portfolio-p.png'
import portfolioLetters from './assets/figma/portfolio-letters.png'
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

type Stitch = {
  id: string
  path: string
  color: string
  duration: string
  begin: string
}

const stitches: Stitch[] = [
  {
    id: 'p',
    path: 'M 70 253 C 82 240 99 234 118 232 S 147 222 160 205',
    color: '#6b5437',
    duration: '11s',
    begin: '2s',
  },
  {
    id: 'r',
    path: 'M 365 141 C 381 145 400 145 416 139 S 441 127 450 116',
    color: '#e8dcc8',
    duration: '13s',
    begin: '5s',
  },
  {
    id: 'o',
    path: 'M 622 155 C 634 170 653 177 674 175 S 704 163 712 148',
    color: '#675836',
    duration: '15s',
    begin: '8s',
  },
]

function StitchAnimation() {
  return (
    <svg className="stitches" viewBox="0 0 1030 330" fill="none" aria-hidden="true">
      {stitches.map((stitch) => (
        <g key={stitch.id}>
          <path
            d={stitch.path}
            pathLength="100"
            stroke={stitch.color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="100"
            opacity=".78"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="100;100;0;0;100"
              keyTimes="0;0.17;0.58;0.7;1"
              dur={stitch.duration}
              begin={stitch.begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;.8;.8;0"
              keyTimes="0;0.16;0.24;0.66;1"
              dur={stitch.duration}
              begin={stitch.begin}
              repeatCount="indefinite"
            />
          </path>
          <g className="needle">
            <path d="M -8 0 L 7 0" stroke="#5f625d" strokeWidth="1.35" strokeLinecap="round" />
            <path d="M -8 0 L 7 0" stroke="#f7f3e8" strokeWidth=".45" strokeLinecap="round" transform="translate(0 -0.4)" />
            <ellipse cx="-5.5" cy="0" rx="1.5" ry=".75" fill="#514f49" />
            <animateMotion
              path={stitch.path}
              rotate="auto"
              keyPoints="0;0;1;1;1"
              keyTimes="0;0.17;0.58;0.7;1"
              calcMode="linear"
              dur={stitch.duration}
              begin={stitch.begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;1;1;0;1;1;0;0"
              keyTimes="0;0.17;0.22;0.38;0.42;0.49;0.57;0.68;1"
              dur={stitch.duration}
              begin={stitch.begin}
              repeatCount="indefinite"
            />
          </g>
        </g>
      ))}
    </svg>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = heroRef.current
    if (!hero) return
    const box = hero.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    hero.style.setProperty('--p-x', `${(x * -10).toFixed(2)}px`)
    hero.style.setProperty('--p-y', `${(y * -8).toFixed(2)}px`)
    hero.style.setProperty('--letters-x', `${(x * 7).toFixed(2)}px`)
    hero.style.setProperty('--letters-y', `${(y * 6).toFixed(2)}px`)
  }

  const reset = () => {
    const hero = heroRef.current
    if (!hero) return
    hero.style.setProperty('--p-x', '0px')
    hero.style.setProperty('--p-y', '0px')
    hero.style.setProperty('--letters-x', '0px')
    hero.style.setProperty('--letters-y', '0px')
  }

  return (
    <section className="hero" ref={heroRef} onPointerMove={move} onPointerLeave={reset} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Portfolio by Muhammad Saad</h1>
      <div className="hero__p">
        <img src={portfolioP} alt="" width="240" height="330" fetchPriority="high" />
      </div>
      <div className="hero__letters">
        <img src={portfolioLetters} alt="" width="790" height="190" fetchPriority="high" />
      </div>
      <StitchAnimation />
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

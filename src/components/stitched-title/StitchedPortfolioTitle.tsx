import { memo, useEffect, useId, useRef } from 'react'
import portfolioP from '../../assets/figma/portfolio-p.png'
import portfolioLetters from '../../assets/figma/portfolio-letters.png'
import { animateTitle } from './animate'
import { LETTERS, MOTION } from './config'
import styles from './StitchedPortfolioTitle.module.css'

/** Artwork and motion share one coordinate system at every screen size. */
function StitchedPortfolioTitle() {
  const root = useRef<HTMLDivElement>(null)
  const overlay = useRef<SVGSVGElement>(null)
  const needle = useRef<SVGGElement>(null)
  const needleClip = useRef<SVGRectElement>(null)
  const glint = useRef<SVGPathElement>(null)
  const thread = useRef<SVGPathElement>(null)
  const threadPaint = useRef<SVGGElement>(null)
  const seams = useRef<(SVGPathElement | null)[]>([])
  const id = useId().replace(/:/g, '')
  const metalId = `needle-metal-${id}`
  const clipId = `needle-pierce-${id}`
  const threadId = `active-thread-${id}`

  useEffect(() => {
    if (!root.current || !overlay.current || !needle.current || !needleClip.current || !glint.current || !thread.current || !threadPaint.current) return
    return animateTitle({
      root: root.current, overlay: overlay.current, needle: needle.current,
      needleClip: needleClip.current, glint: glint.current, thread: thread.current,
      threadPaint: threadPaint.current,
      seams: seams.current.filter((seam): seam is SVGPathElement => seam !== null),
    })
  }, [])

  return (
    <div ref={root} className={styles.title} data-stitched-title aria-hidden="true">
      <div className={styles.p}>
        <img src={portfolioP} alt="" width="240" height="330" fetchPriority="high" draggable="false" />
      </div>
      <div className={styles.letters}>
        <img src={portfolioLetters} alt="" width="790" height="190" fetchPriority="high" draggable="false" />
      </div>
      <svg ref={overlay} className={styles.overlay} viewBox={`0 0 ${MOTION.width} ${MOTION.height}`} fill="none" focusable="false">
        <defs>
          <path ref={thread} id={threadId} data-active-thread vectorEffect="non-scaling-stroke" />
          <linearGradient id={metalId} x1="0" y1="-2" x2="0" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#525955" />
            <stop offset=".35" stopColor="#e4e7df" />
            <stop offset=".52" stopColor="#fffdf4" />
            <stop offset=".72" stopColor="#9ca39a" />
            <stop offset="1" stopColor="#4f5754" />
          </linearGradient>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <rect ref={needleClip} x="-34" y="-5" width="34" height="10" />
          </clipPath>
        </defs>
        <g className={styles.seams}>
          {LETTERS.map((letter, index) => (
            <path key={letter.id} ref={node => { seams.current[index] = node }} stroke={letter.color} strokeDasharray="3.4 5.8" />
          ))}
        </g>
        <g ref={threadPaint} className={styles.thread} color={LETTERS[0].color}>
          <use href={`#${threadId}`} className={styles.threadBed} />
          <use href={`#${threadId}`} className={styles.threadCore} />
          <use href={`#${threadId}`} className={styles.threadFiber} />
        </g>
        <g ref={needle} className={styles.needle} data-needle>
          <g clipPath={`url(#${clipId})`}>
            <path d="M0 0 C-7-.8-24-1.8-29-1.6 C-33-1.5-33 1.5-29 1.6 C-24 1.8-7 .8 0 0Z" fill={`url(#${metalId})`} />
            <ellipse cx="-27" cy="0" rx="2.15" ry=".72" fill="#686458" stroke="#f1eee0" strokeWidth=".35" />
            <path ref={glint} d="M-22-.5-11-.25" stroke="#fffef5" strokeWidth=".7" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default memo(StitchedPortfolioTitle)

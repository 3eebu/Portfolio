import { LETTERS, MOTION, TIMING } from './config.ts'
import { ROUTES, sampleSequence, threadGeometry } from './sequence.ts'

export type AnimationElements = {
  root: HTMLDivElement
  overlay: SVGSVGElement
  needle: SVGGElement
  needleClip: SVGRectElement
  glint: SVGPathElement
  thread: SVGPathElement
  threadPaint: SVGGElement
  seams: SVGPathElement[]
}

/** Owns only the title's DOM. React never renders on an animation frame. */
export function animateTitle(elements: AnimationElements) {
  const { root, overlay, needle, needleClip, glint, thread, threadPaint, seams } = elements
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let disposed = false
  let visible = false
  let ready = false
  let frameId = 0
  let resizeId = 0
  let previousTime: number | null = null
  let elapsed = 0
  let needleScale = 1
  let arcScale = 1
  let previousColor = ''
  let previousPhase = ''
  let previousLetter = ''
  const completion = LETTERS.map(() => -1)

  const measure = () => {
    // Measurements happen at setup / resize, never in the sewing frame.
    const box = root.getBoundingClientRect()
    needleScale = Math.min(1.6, Math.max(1, 600 / Math.max(1, box.width)))
    arcScale = box.width < 600 ? .65 : 1
  }

  const canPlay = () => ready && visible && !document.hidden && !reducedMotion.matches && !disposed

  const tick = (now: number) => {
    frameId = 0
    if (!canPlay()) return
    if (previousTime !== null) elapsed += Math.min(64, now - previousTime) / 1000
    previousTime = now

    if (elapsed >= TIMING.intro) {
      const frame = sampleSequence(elapsed - TIMING.intro)
      const threadShape = threadGeometry(frame, needleScale, arcScale)
      overlay.style.opacity = frame.opacity.toFixed(3)
      needle.setAttribute('transform',
        `translate(${frame.tip.x.toFixed(3)} ${frame.tip.y.toFixed(3)}) rotate(${(frame.angle * 180 / Math.PI).toFixed(3)}) scale(${needleScale})`)
      // A local clip hides the leading section at each insertion, letting the
      // real textile show through while the eye and thread stay connected.
      needleClip.setAttribute('width', (MOTION.needleLength + 2 - frame.depth * 18).toFixed(2))
      thread.setAttribute('d', threadShape.path)
      glint.setAttribute('opacity', (.18 + .65 * Math.pow(Math.max(0, Math.sin(elapsed * 4.1)), 6)).toFixed(3))

      if (previousColor !== frame.letter.color) {
        threadPaint.setAttribute('color', frame.letter.color)
        previousColor = frame.letter.color
      }
      if (previousLetter !== frame.letter.id) {
        overlay.dataset.letter = frame.letter.id
        previousLetter = frame.letter.id
      }
      if (previousPhase !== frame.phase) {
        overlay.dataset.phase = frame.phase
        previousPhase = frame.phase
      }
      seams.forEach((seam, index) => {
        const completed = index < frame.index ? LETTERS[index].stitches : index === frame.index ? frame.completed : 0
        if (completion[index] !== completed) {
          seam.setAttribute('d', ROUTES[index].prefixes[completed])
          completion[index] = completed
        }
      })
    }
    frameId = requestAnimationFrame(tick)
  }

  const syncPlayback = () => {
    if (disposed) return
    if (frameId) cancelAnimationFrame(frameId)
    frameId = 0
    previousTime = null
    root.dataset.motion = reducedMotion.matches ? 'reduced' : canPlay() ? 'playing' : 'paused'
    if (reducedMotion.matches) overlay.style.opacity = '0'
    if (canPlay()) frameId = requestAnimationFrame(tick)
  }

  const resize = () => {
    cancelAnimationFrame(resizeId)
    // The page scales its desktop canvas in React after the resize event.
    // Measure after that commit, rather than retaining the old mobile scale.
    resizeId = requestAnimationFrame(() => {
      resizeId = requestAnimationFrame(measure)
    })
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    syncPlayback()
  }, { threshold: 0 })
  const resizeObserver = new ResizeObserver(resize)
  observer.observe(root)
  resizeObserver.observe(root)
  resizeObserver.observe(document.documentElement)
  measure()
  document.addEventListener('visibilitychange', syncPlayback)
  reducedMotion.addEventListener('change', syncPlayback)
  window.addEventListener('resize', resize, { passive: true })

  // Slow images never leave a needle sewing into an empty area.
  const images = Array.from(root.querySelectorAll('img'))
  void Promise.all(images.map(image => image.decode())).then(() => {
    if (disposed) return
    ready = true
    syncPlayback()
  }).catch(() => {
    if (!disposed) root.dataset.motion = 'static'
  })

  return () => {
    disposed = true
    cancelAnimationFrame(frameId)
    cancelAnimationFrame(resizeId)
    observer.disconnect()
    resizeObserver.disconnect()
    document.removeEventListener('visibilitychange', syncPlayback)
    reducedMotion.removeEventListener('change', syncPlayback)
    window.removeEventListener('resize', resize)
    overlay.style.opacity = '0'
  }
}

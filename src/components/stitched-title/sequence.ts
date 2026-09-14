import { LETTERS, MOTION, TIMING, type Letter, type Point } from './config.ts'

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
export const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mixPoint = (a: Point, b: Point, t: number): Point => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) })

// Sample the spline once. Playback only interpolates cached points: no SVG
// getPointAtLength / layout measurement in the animation frame.
function makeRoute(anchors: readonly Point[], count: number) {
  const samples: Point[] = []
  for (let segment = 0; segment < anchors.length - 1; segment++) {
    const a = anchors[Math.max(0, segment - 1)]
    const b = anchors[segment]
    const c = anchors[segment + 1]
    const d = anchors[Math.min(anchors.length - 1, segment + 2)]
    for (let step = 0; step < 20; step++) {
      const t = step / 20
      const coordinate = (key: 'x' | 'y') => .5 * (
        2 * b[key] + (-a[key] + c[key]) * t
        + (2 * a[key] - 5 * b[key] + 4 * c[key] - d[key]) * t * t
        + (-a[key] + 3 * b[key] - 3 * c[key] + d[key]) * t * t * t
      )
      samples.push({ x: coordinate('x'), y: coordinate('y') })
    }
  }
  samples.push(anchors[anchors.length - 1])
  const distances = [0]
  for (let i = 1; i < samples.length; i++) {
    distances.push(distances[i - 1] + Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y))
  }
  const length = distances[distances.length - 1]
  const at = (progress: number): Point => {
    const distance = clamp(progress) * length
    let low = 0
    let high = distances.length - 1
    while (low + 1 < high) {
      const mid = (low + high) >> 1
      if (distances[mid] < distance) low = mid
      else high = mid
    }
    return mixPoint(samples[low], samples[high], clamp((distance - distances[low]) / (distances[high] - distances[low] || 1)))
  }
  const tangent = (progress: number) => {
    const a = at(progress - .003)
    const b = at(progress + .003)
    return Math.atan2(b.y - a.y, b.x - a.x)
  }
  const prefixes = Array.from({ length: count + 1 }, (_, completed) => {
    if (!completed) return ''
    const points = samples.filter((_, i) => distances[i] < length * completed / count)
    points.push(at(completed / count))
    return points.map((point, i) => `${i ? 'L' : 'M'}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ')
  })
  return { at, tangent, prefixes }
}

export const ROUTES = LETTERS.map(letter => makeRoute(letter.anchors, letter.stitches))
export const LOOP_DURATION = LETTERS.reduce((sum, letter) => sum + letter.duration, 0)
  + (LETTERS.length - 1) * TIMING.transfer + TIMING.settle + TIMING.reset

export type Phase = 'stitch' | 'transfer' | 'settle' | 'reset'
export type Frame = {
  phase: Phase
  index: number
  letter: Letter
  progress: number
  completed: number
  tip: Point
  anchor: Point
  angle: number
  depth: number
  slack: number
  opacity: number
  loop: number
}

const angleMix = (a: number, b: number, t: number) =>
  a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * t

export function sampleSequence(seconds: number): Frame {
  const time = Math.max(0, seconds)
  const loop = Math.floor(time / LOOP_DURATION)
  let remaining = time % LOOP_DURATION
  for (let index = 0; index < LETTERS.length; index++) {
    const letter = LETTERS[index]
    const route = ROUTES[index]
    if (remaining < letter.duration) {
      const progress = remaining / letter.duration
      const stitch = progress * letter.stitches
      const current = Math.floor(stitch)
      const pulse = stitch - current
      const travel = smooth((pulse - .12) / .66)
      const distance = (current + travel) / letter.stitches
      const surface = route.at(distance)
      const angle = route.tangent(distance)
      const lift = Math.sin(travel * Math.PI) * MOTION.lift
      const depth = Math.sin(clamp((pulse - .72) / .28) * Math.PI)
      const completed = current + (pulse >= .94 ? 1 : 0)
      return {
        phase: 'stitch', index, letter, progress, completed,
        tip: { x: surface.x + Math.sin(angle) * lift, y: surface.y - Math.cos(angle) * lift },
        anchor: route.at(completed / letter.stitches),
        angle: angle + .2 + Math.sin(pulse * Math.PI * 2) * .1,
        depth, slack: Math.sin(Math.PI * clamp(pulse / .94)) * (1 - smooth((pulse - .6) / .4)),
        opacity: index === 0 ? smooth(remaining / .18) : 1, loop,
      }
    }
    remaining -= letter.duration
    if (index < LETTERS.length - 1) {
      if (remaining < TIMING.transfer) {
        const progress = remaining / TIMING.transfer
        const next = ROUTES[index + 1]
        const from = route.at(1)
        const to = next.at(0)
        const t = smooth(progress)
        const position = mixPoint(from, to, t)
        const travelAngle = Math.atan2(to.y - from.y, to.x - from.x)
        const angle = progress < .5
          ? angleMix(route.tangent(1) + .2, travelAngle, smooth(progress * 2))
          : angleMix(travelAngle, next.tangent(0) + .2, smooth((progress - .5) * 2))
        return {
          phase: 'transfer', index, letter: progress < .86 ? letter : LETTERS[index + 1],
          progress, completed: letter.stitches,
          tip: { x: position.x, y: position.y - Math.sin(t * Math.PI) * MOTION.transferArc },
          // The free end is pulled forward too, keeping the travelling thread
          // local to the needle instead of laying a line across letter gaps.
          anchor: mixPoint(from, to, smooth(clamp((progress - .17) / .83))),
          angle, depth: 0, slack: Math.sin(progress * Math.PI), opacity: 1, loop,
        }
      }
      remaining -= TIMING.transfer
    }
  }
  const index = LETTERS.length - 1
  const letter = LETTERS[index]
  const route = ROUTES[index]
  const reset = remaining >= TIMING.settle
  const progress = clamp(remaining / TIMING.settle)
  return {
    phase: reset ? 'reset' : 'settle', index, letter, progress,
    completed: letter.stitches, tip: route.at(1), anchor: route.at(1),
    angle: route.tangent(1) + .2, depth: 0, slack: .2 * (1 - progress),
    opacity: reset ? 0 : 1 - smooth((progress - .22) / .78), loop,
  }
}

/** Thread ends at the actual transformed eye, including the mobile needle scale. */
export function threadGeometry(frame: Frame, needleScale = 1, arcScale = 1) {
  const direction = { x: Math.cos(frame.angle), y: Math.sin(frame.angle) }
  const eye = {
    x: frame.tip.x - direction.x * MOTION.needleEye * needleScale,
    y: frame.tip.y - direction.y * MOTION.needleEye * needleScale,
  }
  const slack = (9 + MOTION.arc * frame.slack) * arcScale
  const trail = (46 + 12 * frame.slack) * arcScale
  const bend = {
    x: eye.x - direction.x * trail - direction.y * slack * .35,
    y: eye.y - direction.y * trail + direction.x * slack * .35,
  }
  const control1 = {
    x: frame.anchor.x - direction.x * trail * .2 - direction.y * slack,
    y: frame.anchor.y - direction.y * trail * .2 + direction.x * slack,
  }
  const control2 = {
    x: bend.x + direction.x * trail * .2 - direction.y * slack * .55,
    y: bend.y + direction.y * trail * .2 + direction.x * slack * .55,
  }
  const return1 = {
    x: bend.x - direction.x * trail * .2 + direction.y * slack * .7,
    y: bend.y - direction.y * trail * .2 - direction.x * slack * .7,
  }
  const return2 = {
    x: eye.x - direction.x * trail * .4 + direction.y * slack * .5,
    y: eye.y - direction.y * trail * .4 - direction.x * slack * .5,
  }
  const pair = (point: Point) => `${point.x.toFixed(3)},${point.y.toFixed(3)}`
  return {
    eye,
    path: `M${pair(frame.anchor)} C${pair(control1)} ${pair(control2)} ${pair(bend)} C${pair(return1)} ${pair(return2)} ${pair(eye)}`,
  }
}

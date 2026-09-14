import test from 'node:test'
import assert from 'node:assert/strict'
import { LETTERS, MOTION, TIMING } from '../src/components/stitched-title/config.ts'
import { LOOP_DURATION, ROUTES, sampleSequence, threadGeometry } from '../src/components/stitched-title/sequence.ts'
import { animateTitle } from '../src/components/stitched-title/animate.ts'

test('one 17-second cycle stitches PORTFOLIO in order, with three seconds on P', () => {
  assert.equal(LETTERS.map(letter => letter.label).join(''), 'PORTFOLIO')
  assert.ok(Math.abs(LOOP_DURATION - 17) < 1e-10)
  assert.equal(sampleSequence(2.999).index, 0)
  assert.equal(sampleSequence(2.999).phase, 'stitch')
  assert.equal(sampleSequence(3).phase, 'transfer')
  let start = 0
  for (let index = 0; index < LETTERS.length; index++) {
    const letter = LETTERS[index]
    for (const fraction of [.01, .25, .6, .99]) {
      const frame = sampleSequence(start + letter.duration * fraction)
      assert.equal(frame.phase, 'stitch')
      assert.equal(frame.index, index)
      assert.equal(frame.letter.color, letter.color)
      assert.ok(frame.completed >= 0 && frame.completed <= letter.stitches)
    }
    start += letter.duration + TIMING.transfer
  }
})

test('thread stays attached to the transformed needle eye throughout desktop and mobile loops', () => {
  for (const scale of [1, 1.6]) {
    for (let time = 0; time < LOOP_DURATION * 2; time += 1 / 60) {
      const frame = sampleSequence(time)
      const thread = threadGeometry(frame, scale, scale === 1 ? 1 : .65)
      assert.ok(Number.isFinite(frame.tip.x) && Number.isFinite(frame.tip.y))
      assert.ok(Math.abs(Math.hypot(thread.eye.x - frame.tip.x, thread.eye.y - frame.tip.y) - MOTION.needleEye * scale) < 1e-8)
      assert.ok(thread.path.endsWith(thread.eye.x.toFixed(3) + ',' + thread.eye.y.toFixed(3)))
      assert.ok(frame.tip.x >= 0 && frame.tip.x <= MOTION.width)
      assert.ok(frame.tip.y >= 0 && frame.tip.y <= MOTION.height)
    }
  }
})

test('needle transitions are continuous, and the loop resets only while hidden', () => {
  let boundary = 0
  for (let index = 0; index < LETTERS.length - 1; index++) {
    boundary += LETTERS[index].duration
    for (const time of [boundary, boundary + TIMING.transfer]) {
      const before = sampleSequence(time - .000001)
      const after = sampleSequence(time + .000001)
      assert.ok(Math.hypot(before.tip.x - after.tip.x, before.tip.y - after.tip.y) < .01)
      assert.ok(Math.abs(Math.sin(before.angle - after.angle)) < .001)
    }
    boundary += TIMING.transfer
  }
  assert.equal(sampleSequence(LOOP_DURATION - .1).phase, 'reset')
  assert.equal(sampleSequence(LOOP_DURATION - .1).opacity, 0)
  assert.equal(sampleSequence(LOOP_DURATION).opacity, 0)
  assert.equal(sampleSequence(LOOP_DURATION + .1).index, 0)
  assert.equal(sampleSequence(LOOP_DURATION + .1).loop, 1)
  for (let index = 0; index < LETTERS.length; index++) {
    assert.equal(ROUTES[index].prefixes[0], '')
    assert.ok(ROUTES[index].prefixes[LETTERS[index].stitches].length > 0)
  }
})

test('playback pauses offscreen and with reduced motion, and releases every callback on cleanup', async () => {
  const previous = new Map()
  const replace = (name, value) => {
    previous.set(name, Object.getOwnPropertyDescriptor(globalThis, name))
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
  }
  const eventTarget = () => {
    const listeners = new Map()
    return {
      listeners,
      addEventListener: (name, callback) => listeners.set(name, callback),
      removeEventListener: name => listeners.delete(name),
      dispatch: name => listeners.get(name)?.(),
    }
  }
  const media = { ...eventTarget(), matches: false }
  const page = { ...eventTarget(), hidden: false }
  const viewport = { ...eventTarget(), matchMedia: () => media }
  const pending = new Map()
  let id = 0
  let now = 0
  let intersection
  let disconnected = 0
  const element = () => ({
    attrs: new Map(), style: {}, dataset: {},
    setAttribute(name, value) { this.attrs.set(name, value) },
  })
  let renderedWidth = 354
  const root = {
    ...element(), getBoundingClientRect: () => ({ width: renderedWidth }),
    querySelectorAll: () => [{ decode: () => Promise.resolve() }],
  }
  const elements = {
    root, overlay: element(), needle: element(), needleClip: element(),
    glint: element(), thread: element(), threadPaint: element(), seams: LETTERS.map(element),
  }
  const step = () => {
    now += 16
    const callbacks = [...pending.values()]
    pending.clear()
    callbacks.forEach(callback => callback(now))
  }
  let dispose
  try {
    replace('window', viewport)
    replace('document', page)
    replace('requestAnimationFrame', callback => { pending.set(++id, callback); return id })
    replace('cancelAnimationFrame', handle => pending.delete(handle))
    replace('IntersectionObserver', class {
      constructor(callback) { intersection = callback }
      observe() {}
      disconnect() { disconnected++ }
    })
    replace('ResizeObserver', class { observe() {} disconnect() { disconnected++ } })
    dispose = animateTitle(elements)
    intersection([{ isIntersecting: true }])
    await new Promise(resolve => setImmediate(resolve))
    for (let i = 0; i < 130; i++) step()
    assert.equal(elements.overlay.dataset.letter, 'p')
    assert.equal(pending.size, 1)
    assert.ok(elements.needle.attrs.get('transform').endsWith('scale(1.6)'))
    viewport.dispatch('resize')
    step()
    renderedWidth = 1030
    step()
    step()
    assert.ok(elements.needle.attrs.get('transform').endsWith('scale(1)'))
    const position = elements.needle.attrs.get('transform')
    intersection([{ isIntersecting: false }])
    assert.equal(pending.size, 0)
    step()
    assert.equal(elements.needle.attrs.get('transform'), position)
    intersection([{ isIntersecting: true }])
    page.hidden = true
    page.dispatch('visibilitychange')
    assert.equal(pending.size, 0)
    page.hidden = false
    page.dispatch('visibilitychange')
    media.matches = true
    media.dispatch('change')
    assert.equal(pending.size, 0)
    assert.equal(root.dataset.motion, 'reduced')
    assert.equal(elements.overlay.style.opacity, '0')
    media.matches = false
    media.dispatch('change')
    assert.equal(pending.size, 1)
    dispose()
    dispose = undefined
    assert.equal(pending.size, 0)
    assert.equal(disconnected, 2)
    assert.equal(media.listeners.size + page.listeners.size + viewport.listeners.size, 0)
  } finally {
    dispose?.()
    for (const [name, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor)
      else delete globalThis[name]
    }
  }
})

export type Point = Readonly<{ x: number; y: number }>

export type Letter = Readonly<{
  id: string
  label: string
  color: string
  duration: number
  stitches: number
  anchors: readonly Point[]
}>

const points = (...coordinates: [number, number][]): Point[] =>
  coordinates.map(([x, y]) => ({ x, y }))

/**
 * All coordinates are in the original artwork's 1030 × 330 space.
 * The P is 240 × 330; the untouched ORTFOLIO image starts at x = 240.
 * Durations are seconds. Edit these zones to adjust where the needle sews.
 */
export const LETTERS: readonly Letter[] = [
  {
    id: 'p', label: 'P', color: '#d8c29b', duration: 3, stitches: 14,
    anchors: points([51, 298], [66, 273], [67, 229], [68, 182], [68, 135],
      [69, 82], [88, 48], [135, 42], [183, 61], [205, 98], [193, 140], [159, 164], [120, 174]),
  },
  {
    id: 'o-olive', label: 'O', color: '#78813d', duration: 1.1, stitches: 7,
    anchors: points([266, 145], [253, 117], [258, 75], [281, 39],
      [305, 33], [323, 60], [324, 105], [307, 144]),
  },
  {
    id: 'r', label: 'R', color: '#66503d', duration: 1.1, stitches: 7,
    anchors: points([372, 145], [373, 108], [373, 69], [382, 47],
      [407, 53], [422, 74], [403, 96], [389, 100], [420, 141]),
  },
  {
    id: 't', label: 'T', color: '#966d4c', duration: 1.05, stitches: 6,
    anchors: points([465, 35], [489, 35], [511, 35], [503, 54],
      [501, 88], [501, 124], [501, 154]),
  },
  {
    id: 'f', label: 'F', color: '#70753a', duration: 1.1, stitches: 6,
    anchors: points([632, 40], [609, 40], [583, 43], [580, 75],
      [581, 106], [581, 135], [581, 154]),
  },
  {
    id: 'o-tan', label: 'O', color: '#b58a52', duration: 1.1, stitches: 7,
    anchors: points([682, 148], [665, 119], [669, 82], [693, 49],
      [719, 45], [739, 65], [743, 98], [729, 136], [705, 154]),
  },
  {
    id: 'l', label: 'L', color: '#ded2ba', duration: 1, stitches: 6,
    anchors: points([774, 32], [774, 64], [775, 100], [776, 133],
      [786, 154], [808, 155], [824, 154]),
  },
  {
    id: 'i', label: 'I', color: '#555b2f', duration: .95, stitches: 5,
    anchors: points([851, 30], [852, 62], [853, 95], [854, 128], [856, 157]),
  },
  {
    id: 'o-charcoal', label: 'O', color: '#45443f', duration: 1.3, stitches: 7,
    anchors: points([921, 139], [908, 109], [912, 75], [934, 47],
      [961, 43], [985, 64], [992, 97], [980, 129], [958, 148], [936, 150]),
  },
]

export const TIMING = {
  intro: 1.5,
  transfer: .5,
  settle: .65,
  reset: .65,
} as const

export const MOTION = {
  width: 1030,
  height: 330,
  needleLength: 32,
  needleEye: 27,
  lift: 2.4,
  arc: 24,
  transferArc: 13,
} as const

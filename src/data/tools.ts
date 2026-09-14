import photoshop from '../assets/figma/photoshop.png'
import premiere from '../assets/figma/premiere.png'
import lightroom from '../assets/figma/lightroom.png'
import davinci from '../assets/figma/davinci.png'
import procreate from '../assets/figma/procreate.png'
import illustrator from '../assets/figma/illustrator.png'
import github from '../assets/figma/github.png'
import figma from '../assets/figma/figma.png'

export type PortfolioTool = {
  name: string
  src: string
  rating: number
  outOf: number
  summary: string
  learned: string
  tags: string[]
  /** Visible artwork fraction inside the exported image's transparent bounds. */
  visualFill: number
}

// Edit a tool's copy, rating, or tags here. The image assets live in src/assets/figma/.
export const tools: PortfolioTool[] = [
  {
    name: 'Photoshop', src: photoshop, rating: 4, outOf: 5,
    summary: 'Used for image editing, cleanup, composition work, and visual polish.',
    learned: 'I’ve learned how subtle retouching, texture, and color can make a visual feel more intentional.',
    tags: ['Retouching', 'Compositing', 'Visual polish'], visualFill: .74,
  },
  {
    name: 'Premiere Pro', src: premiere, rating: 3, outOf: 5,
    summary: 'Used for editing videos, creating sequences, and assembling visual stories.',
    learned: 'I’ve learned to pace a story, find its rhythm, and make every cut support the idea.',
    tags: ['Editing', 'Sequences', 'Storytelling'], visualFill: .74,
  },
  {
    name: 'Lightroom', src: lightroom, rating: 3, outOf: 5,
    summary: 'Used for color correction, tonal refinement, and photo enhancement.',
    learned: 'I’ve learned to use light and tone to give photographs a consistent mood without losing their character.',
    tags: ['Color', 'Photography', 'Tone'], visualFill: .67,
  },
  {
    name: 'DaVinci Resolve', src: davinci, rating: 4, outOf: 5,
    summary: 'Used for video editing, color work, and building polished visual content.',
    learned: 'I’ve learned how careful color choices bring separate shots together into one visual world.',
    tags: ['Color grading', 'Video', 'Finishing'], visualFill: .65,
  },
  {
    name: 'Procreate', src: procreate, rating: 5, outOf: 5,
    summary: 'Used for sketching, drawing, visual experimentation, and creative ideation.',
    learned: 'I’ve learned to explore quickly, keep the handmade energy, and let rough ideas grow into finished work.',
    tags: ['Sketching', 'Illustration', 'Ideas'], visualFill: .70,
  },
  {
    name: 'Illustrator', src: illustrator, rating: 5, outOf: 5,
    summary: 'Used for vector graphics, logo work, layouts, and clean scalable design.',
    learned: 'I’ve learned to simplify forms until they communicate clearly at every size.',
    tags: ['Vectors', 'Identity', 'Layouts'], visualFill: .77,
  },
  {
    name: 'GitHub', src: github, rating: 4, outOf: 5,
    summary: 'Used for repositories, version control, project collaboration, and deployment workflows.',
    learned: 'I’ve learned to build in small, reviewable steps and keep the history of an idea useful to a team.',
    tags: ['Version control', 'Collaboration', 'Shipping'], visualFill: 1,
  },
  {
    name: 'Figma', src: figma, rating: 5, outOf: 5,
    summary: 'Used for UI design, layout building, prototyping, and interface planning.',
    learned: 'I’ve learned how to design scalable systems, work with components, prototype interactions, and collaborate effectively with teams.',
    tags: ['UI Design', 'Wireframes', 'Prototyping'], visualFill: .72,
  },
]

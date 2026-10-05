import infinityFitnessPreview from '../assets/projects/infinity-fitness.png'
import cmmnCommunitiesPreview from '../assets/projects/cmmn-communities.png'
import petFluencePreview from '../assets/projects/petfluence.png'
import manzerPreview from '../assets/projects/manzer.png'
import hadusArcadePreview from '../assets/projects/hadus-arcade.png'

export type PortfolioProject = {
  number: string
  kind: string
  status: string
  name: string
  description: string
  tags: string[]
  theme: string
  previewImage: string
  previewAlt: string
}

export const projects: PortfolioProject[] = [
  {
    number: '01',
    kind: 'Website',
    status: 'Live',
    name: 'Infinity Fitness',
    description: 'A public-facing website for an Islamabad gym, bringing its training offer and next steps into one clear place.',
    tags: ['Next.js', 'React', 'TypeScript'],
    theme: 'fitness',
    previewImage: infinityFitnessPreview,
    previewAlt: 'Infinity Fitness homepage, with its gym photography, membership details, and Islamabad location.',
  },
  {
    number: '02',
    kind: 'Website',
    status: 'Live',
    name: 'Communities by CMMN',
    description: 'A brand and service site for building online communities, with dedicated spaces for creators, events, pricing, and community worlds.',
    tags: ['Community strategy', 'Brand experience', 'Web design'],
    theme: 'community',
    previewImage: cmmnCommunitiesPreview,
    previewAlt: 'Communities by CMMN homepage introducing its community design service.',
  },
  {
    number: '03',
    kind: 'Website',
    status: 'Live',
    name: 'PetFluence',
    description: 'A brand website for a pet-creator management service, built around animal personalities and creator culture.',
    tags: ['Creator management', 'Pet community', 'Digital product'],
    theme: 'petfluence',
    previewImage: petFluencePreview,
    previewAlt: 'PetFluence homepage showing its pet creator management service and animal photography.',
  },
  {
    number: '04',
    kind: 'Storefront concept',
    status: 'Live concept',
    name: 'MANZER',
    description: 'An editorial concept storefront for luxury bags, with a focused brand showcase and product browsing experience.',
    tags: ['E-commerce', 'Editorial design', 'Motion'],
    theme: 'manzer',
    previewImage: manzerPreview,
    previewAlt: 'MANZER storefront concept opening on its sculptural goat mark and luxury fashion imagery.',
  },
  {
    number: '05',
    kind: 'Interactive website',
    status: 'Live',
    name: "Hadu's Arcade",
    description: 'A social arcade experience for choosing a player name, meeting friends in game rooms, and making new memories together.',
    tags: ['Games', 'Multiplayer', 'Interactive design'],
    theme: 'arcade',
    previewImage: hadusArcadePreview,
    previewAlt: "Hadu's Arcade player setup screen, shown over the retro arcade experience.",
  },
]

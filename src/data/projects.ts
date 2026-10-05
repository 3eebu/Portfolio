export type PortfolioProject = {
  number: string
  kind: string
  status: string
  name: string
  description: string
  tags: string[]
  url: string
  theme: string
  category: string
  wordmark: string
  previewNote: string
}

export const projects: PortfolioProject[] = [
  {
    number: '01',
    kind: 'Website',
    status: 'Live',
    name: 'Infinity Fitness',
    description: 'A public-facing website for an Islamabad gym, bringing its training offer and next steps into one clear place.',
    tags: ['Next.js', 'React', 'TypeScript'],
    url: 'https://infinity-fitness-islamabad.biyabeebu.chatgpt.site/',
    theme: 'fitness',
    category: 'FITNESS · ISLAMABAD',
    wordmark: 'INFINITY FITNESS',
    previewNote: 'A home for the people who train here.',
  },
  {
    number: '02',
    kind: 'Website',
    status: 'Live',
    name: 'Communities by CMMN',
    description: 'A brand and service site for building online communities, with dedicated spaces for creators, events, pricing, and community worlds.',
    tags: ['Community strategy', 'Brand experience', 'Web design'],
    url: 'https://communitiesbycmmn.biyabeebu.chatgpt.site/',
    theme: 'community',
    category: 'COMMUNITIES · CMMN',
    wordmark: 'CMMN',
    previewNote: 'A community people belong to.',
  },
  {
    number: '03',
    kind: 'Website',
    status: 'Live',
    name: 'PetFluence',
    description: 'A brand website for a pet-creator management service, built around animal personalities and creator culture.',
    tags: ['Creator management', 'Pet community', 'Digital product'],
    url: 'https://petfluence.site/',
    theme: 'petfluence',
    category: 'CREATORS · PETS',
    wordmark: 'PetFluence',
    previewNote: 'Your pet has main-character energy.',
  },
  {
    number: '04',
    kind: 'Storefront',
    status: 'Live concept',
    name: 'MANZER',
    description: 'An editorial concept storefront for luxury bags, with a focused brand showcase and product browsing experience.',
    tags: ['E-commerce', 'Editorial design', 'Motion'],
    url: 'https://manzer-editorial.biyabeebu.chatgpt.site/',
    theme: 'manzer',
    category: 'LUXURY · COMMERCE',
    wordmark: 'MANZER',
    previewNote: 'A considered edit of bags and brands.',
  },
]

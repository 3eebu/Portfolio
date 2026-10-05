import infinityFitnessHero from '../assets/projects/infinity-fitness-01-hero.jpg'
import infinityFitnessStory from '../assets/projects/infinity-fitness-02-story.jpg'
import infinityFitnessFeatures from '../assets/projects/infinity-fitness-03-features.jpg'
import infinityFitnessDetails from '../assets/projects/infinity-fitness-04-details.jpg'
import infinityFitnessExperience from '../assets/projects/infinity-fitness-05-experience.jpg'
import infinityFitnessFinish from '../assets/projects/infinity-fitness-06-finish.jpg'
import cmmnHero from '../assets/projects/cmmn-communities-01-hero.jpg'
import cmmnStory from '../assets/projects/cmmn-communities-02-story.jpg'
import cmmnFeatures from '../assets/projects/cmmn-communities-03-features.jpg'
import cmmnDetails from '../assets/projects/cmmn-communities-04-details.jpg'
import cmmnExperience from '../assets/projects/cmmn-communities-05-experience.jpg'
import cmmnFinish from '../assets/projects/cmmn-communities-06-finish.jpg'
import petfluenceHero from '../assets/projects/petfluence-01-hero.jpg'
import petfluenceStory from '../assets/projects/petfluence-02-story.jpg'
import petfluenceFeatures from '../assets/projects/petfluence-03-features.jpg'
import petfluenceDetails from '../assets/projects/petfluence-04-details.jpg'
import petfluenceExperience from '../assets/projects/petfluence-05-experience.jpg'
import petfluenceFinish from '../assets/projects/petfluence-06-finish.jpg'
import manzerHero from '../assets/projects/manzer-01-hero.jpg'
import manzerStory from '../assets/projects/manzer-02-story.jpg'
import manzerFeatures from '../assets/projects/manzer-03-features.jpg'
import manzerDetails from '../assets/projects/manzer-04-details.jpg'
import manzerExperience from '../assets/projects/manzer-05-experience.jpg'
import manzerFinish from '../assets/projects/manzer-06-finish.jpg'
import arcadeHero from '../assets/projects/hadus-arcade-01-hero.jpg'
import arcadeStory from '../assets/projects/hadus-arcade-02-story.jpg'
import arcadeFeatures from '../assets/projects/hadus-arcade-03-features.jpg'
import arcadeDetails from '../assets/projects/hadus-arcade-04-details.jpg'
import arcadeExperience from '../assets/projects/hadus-arcade-05-experience.jpg'
import arcadeFinish from '../assets/projects/hadus-arcade-06-finish.jpg'

export type ProjectScreenshot = {
  label: string
  image: string
  alt: string
}

export type PortfolioProject = {
  number: string
  kind: string
  status: string
  name: string
  description: string
  tags: string[]
  theme: string
  gallery: ProjectScreenshot[]
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
    gallery: [
      { label: 'Home', image: infinityFitnessHero, alt: 'Infinity Fitness homepage and gym hero imagery.' },
      { label: 'About', image: infinityFitnessStory, alt: 'About page introducing the Infinity Fitness club.' },
      { label: 'Facilities', image: infinityFitnessFeatures, alt: 'Fitness facilities and training spaces.' },
      { label: 'Memberships', image: infinityFitnessDetails, alt: 'Membership options and pricing.' },
      { label: 'Trainers', image: infinityFitnessExperience, alt: 'Personal training and coaching section.' },
      { label: 'Contact', image: infinityFitnessFinish, alt: 'Contact page with location and enquiry details.' },
    ],
  },
  {
    number: '02',
    kind: 'Website',
    status: 'Live',
    name: 'Communities by CMMN',
    description: 'A brand and service site for building online communities, with dedicated spaces for creators, events, pricing, and community worlds.',
    tags: ['Community strategy', 'Brand experience', 'Web design'],
    theme: 'community',
    gallery: [
      { label: 'Home', image: cmmnHero, alt: 'Communities by CMMN homepage and community building introduction.' },
      { label: 'Community', image: cmmnStory, alt: 'Community page describing the service and its approach.' },
      { label: 'Creators', image: cmmnFeatures, alt: 'Creator community offerings and benefits.' },
      { label: 'Bots', image: cmmnDetails, alt: 'Community bot and tooling information.' },
      { label: 'Events', image: cmmnExperience, alt: 'Events page for community programming.' },
      { label: 'Pricing', image: cmmnFinish, alt: 'Pricing and membership options.' },
    ],
  },
  {
    number: '03',
    kind: 'Website',
    status: 'Live',
    name: 'PetFluence',
    description: 'A brand website for a pet-creator management service, built around animal personalities and creator culture.',
    tags: ['Creator management', 'Pet community', 'Digital product'],
    theme: 'petfluence',
    gallery: [
      { label: 'Overview', image: petfluenceHero, alt: 'PetFluence homepage introducing its pet creator service.' },
      { label: 'Services', image: petfluenceStory, alt: 'Social media services for pet creators.' },
      { label: 'How it works', image: petfluenceFeatures, alt: 'The PetFluence onboarding and process section.' },
      { label: 'Management', image: petfluenceDetails, alt: 'Managed creator profiles and account services.' },
      { label: 'Packages', image: petfluenceExperience, alt: 'Service packages and pricing options.' },
      { label: 'FAQ', image: petfluenceFinish, alt: 'Frequently asked questions for creators and pet owners.' },
    ],
  },
  {
    number: '04',
    kind: 'Storefront concept',
    status: 'Live concept',
    name: 'MANZER',
    description: 'An editorial concept storefront for luxury bags, with a focused brand showcase and product browsing experience.',
    tags: ['E-commerce', 'Editorial design', 'Motion'],
    theme: 'manzer',
    gallery: [
      { label: 'Coach edit', image: manzerHero, alt: 'MANZER featured designer carousel showing Coach.' },
      { label: 'Dior edit', image: manzerStory, alt: 'MANZER designer carousel showing Christian Dior.' },
      { label: 'Burberry edit', image: manzerFeatures, alt: 'MANZER designer carousel showing Burberry.' },
      { label: 'About', image: manzerDetails, alt: 'MANZER brand story and curated designer selection.' },
      { label: 'Brands', image: manzerExperience, alt: 'MANZER brand menu and designer collection grid.' },
      { label: 'Quality guide', image: manzerFinish, alt: 'MANZER quality guide with selectable condition levels.' },
    ],
  },
  {
    number: '05',
    kind: 'Interactive website',
    status: 'Live',
    name: "Hadu's Arcade",
    description: 'A social arcade experience for choosing a player name, meeting friends in game rooms, and making new memories together.',
    tags: ['Games', 'Multiplayer', 'Interactive design'],
    theme: 'arcade',
    gallery: [
      { label: 'Arcade room', image: arcadeHero, alt: "Hadu's Arcade room with its neon sign, city window, and cabinet." },
      { label: 'Game floor', image: arcadeStory, alt: 'The arcade game floor with the Neon Snake cabinet selected.' },
      { label: 'Night Pong', image: arcadeFeatures, alt: 'Night Pong game board and controls.' },
      { label: 'Four in a Row', image: arcadeDetails, alt: 'Four in a Row game board and strategy panel.' },
      { label: 'Leaderboard', image: arcadeExperience, alt: 'Arcade leaderboard and the lower game floor.' },
      { label: 'About', image: arcadeFinish, alt: "Hadu's Arcade about section and community message." },
    ],
  },
]

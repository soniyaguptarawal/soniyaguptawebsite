import {pageIntroQuery} from '@/lib/queries'
import {client, hasConfig} from '@/sanity/client'

export type PageKey =
  | 'publications'
  | 'teaching'
  | 'awards'
  | 'talks'
  | 'media-mentions'
  | 'academic-service'
  | 'research-lab'

interface PageIntro {
  title: string
  description: string
}

const defaults: Record<PageKey, PageIntro> = {
  publications: {
    title: 'Research & Publications',
    description: 'My research examines how digital technologies, innovation, and market institutions shape firm behaviour, consumer decision-making, and economic outcomes in emerging markets. I draw on quantitative methods, field-based research, and collaborations with organisations to investigate questions at the intersection of marketing, technology, and development.',
  },
  teaching: {
    title: 'Teaching',
    description: 'MBA teaching, course coordination, and undergraduate supervision across marketing, innovation, and customer engagement.',
  },
  awards: {
    title: 'Awards',
    description: 'Grants, fellowships, scholarships, and honours supporting research with real-world reach.',
  },
  talks: {
    title: 'Talks',
    description: 'Conference presentations, doctoral consortia, seminars, and workshops where research is tested and sharpened.',
  },
  'media-mentions': {
    title: 'Media Mentions',
    description: 'Research stories, press coverage, and ideas translated for audiences beyond academia.',
  },
  'academic-service': {
    title: 'Academic Service',
    description: 'Peer review, professional communities, and service that strengthen research institutions and scholarly exchange.',
  },
  'research-lab': {
    title: 'Research Lab',
    description: 'A collaborative home for research apprentices, assistants, and students working on markets at the margins.',
  },
}

export async function getPageIntro(page: PageKey): Promise<PageIntro> {
  if (!hasConfig) return defaults[page]

  const intro = await client.fetch(pageIntroQuery, {page}).catch(() => null)
  return intro ? {...defaults[page], ...intro} : defaults[page]
}

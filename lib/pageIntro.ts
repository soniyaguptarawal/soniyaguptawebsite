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
  eyebrow: string
  title: string
  description: string
}

const defaults: Record<PageKey, PageIntro> = {
  publications: {
    eyebrow: 'Research portfolio',
    title: 'Publications',
    description: 'Projects in motion and the papers, cases, reports, and public writing that emerge from them.',
  },
  teaching: {
    eyebrow: 'Learning by doing',
    title: 'Teaching',
    description: 'MBA teaching, course coordination, and undergraduate supervision across marketing, innovation, and customer engagement.',
  },
  awards: {
    eyebrow: 'Recognition',
    title: 'Awards',
    description: 'Grants, fellowships, scholarships, and honours supporting research with real-world reach.',
  },
  talks: {
    eyebrow: 'Ideas in conversation',
    title: 'Talks',
    description: 'Conference presentations, doctoral consortia, seminars, and workshops where research is tested and sharpened.',
  },
  'media-mentions': {
    eyebrow: 'In the public conversation',
    title: 'Media Mentions',
    description: 'Research stories, press coverage, and ideas translated for audiences beyond academia.',
  },
  'academic-service': {
    eyebrow: 'Contributing to the field',
    title: 'Academic Service',
    description: 'Peer review, professional communities, and service that strengthen research institutions and scholarly exchange.',
  },
  'research-lab': {
    eyebrow: 'Build research together',
    title: 'Research Lab',
    description: 'A collaborative home for research apprentices, assistants, and students working on markets at the margins.',
  },
}

export async function getPageIntro(page: PageKey): Promise<PageIntro> {
  if (!hasConfig) return defaults[page]

  const intro = await client.fetch(pageIntroQuery, {page}).catch(() => null)
  return intro ? {...defaults[page], ...intro} : defaults[page]
}

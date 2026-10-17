import {defineField, defineType} from 'sanity'

const pages = [
  {title: 'Publications', value: 'publications'},
  {title: 'Teaching', value: 'teaching'},
  {title: 'Awards', value: 'awards'},
  {title: 'Talks', value: 'talks'},
  {title: 'Media Mentions', value: 'media-mentions'},
  {title: 'Academic Service', value: 'academic-service'},
  {title: 'Research Lab', value: 'research-lab'},
]

export default defineType({
  name: 'pageIntro',
  title: 'Page Heading & Introduction',
  type: 'document',
  description: 'Controls the large heading area at the top of each website page.',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {list: pages},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'page'},
  },
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'doctoralDevelopment',
  title: 'Doctoral Seminar / Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Programme or workshop',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Details',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', year: 'year', detail: 'detail'},
    prepare({title, year, detail}) {
      return {title, subtitle: `${year} — ${detail}`}
    },
  },
})

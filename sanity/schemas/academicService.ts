import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'academicService',
  title: 'Academic Service',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          {title: 'Academic Reviewing Service', value: 'reviewing'},
          {title: 'Services & Memberships', value: 'membership'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Role or organisation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year or period',
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
      title: 'Display order within section',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Section and display order',
      name: 'sectionOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', year: 'year', category: 'category'},
    prepare({title, year, category}) {
      const section = category === 'reviewing' ? 'Reviewing' : 'Service & Membership'
      return {title, subtitle: `${section} · ${year}`}
    },
  },
})

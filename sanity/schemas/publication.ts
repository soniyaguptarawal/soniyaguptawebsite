import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "string",
      description: "Comma-separated list of authors",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Publication Type",
      type: "string",
      options: {
        list: [
          { title: "Working Papers", value: "working" },
          { title: "Journal Publications", value: "journal" },
          { title: "Case Studies", value: "chapter" },
          { title: "Reports", value: "report" },
          { title: "Op-Eds", value: "oped" },
          { title: "Conference Paper", value: "conference" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "journal",
      title: "Journal / Venue",
      type: "string",
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "doi",
      title: "DOI",
      type: "string",
    }),
    defineField({
      name: "pdfUrl",
      title: "PDF URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Year (Newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "journal", year: "year" },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${subtitle || ""} (${year})`,
      };
    },
  },
});

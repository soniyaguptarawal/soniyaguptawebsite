import type {StructureResolver} from 'sanity/structure'

const managedTypes = [
  'profile',
  'pageIntro',
  'project',
  'publication',
  'consultingProject',
  'teaching',
  'award',
  'talk',
  'doctoralDevelopment',
  'newsItem',
  'academicService',
  'raApplication',
  'teamMember',
  'collaborator',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Soniya Gupta-Rawal Website')
    .items([
      S.documentTypeListItem('profile').title('About'),
      S.documentTypeListItem('pageIntro').title('Page Headings & Introductions'),
      S.divider(),
      S.listItem()
        .title('Publications')
        .child(
          S.list()
            .title('Publications')
            .items([
              S.documentTypeListItem('project').title('Research Projects'),
              S.documentTypeListItem('publication').title('Publications'),
              S.documentTypeListItem('consultingProject').title('Consulting Projects'),
            ]),
        ),
      S.documentTypeListItem('teaching').title('Teaching'),
      S.documentTypeListItem('award').title('Awards'),
      S.listItem()
        .title('Talks')
        .child(
          S.list()
            .title('Talks')
            .items([
              S.documentTypeListItem('talk').title('Conference Presentations'),
              S.documentTypeListItem('doctoralDevelopment').title('Doctoral Seminars & Workshops'),
            ]),
        ),
      S.documentTypeListItem('newsItem').title('Media Mentions'),
      S.documentTypeListItem('academicService').title('Academic Service'),
      S.listItem()
        .title('Research Lab')
        .child(
          S.list()
            .title('Research Lab')
            .items([
              S.documentTypeListItem('raApplication').title('CJBS Research Apprenticeship Program'),
              S.documentTypeListItem('teamMember').title('Research Team'),
              S.documentTypeListItem('collaborator').title('Collaborators'),
            ]),
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !managedTypes.includes(item.getId()!),
      ),
    ])

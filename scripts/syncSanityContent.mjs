import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const pageIntros = [
  ['publications', 'Research & Publications', 'My research examines how digital technologies, innovation, and market institutions shape firm behaviour, consumer decision-making, and economic outcomes in emerging markets. I draw on quantitative methods, field-based research, and collaborations with organisations to investigate questions at the intersection of marketing, technology, and development.'],
  ['teaching', 'Teaching', 'MBA teaching, course coordination, and undergraduate supervision across marketing, innovation, and customer engagement.'],
  ['awards', 'Awards', 'Grants, fellowships, scholarships, and honours supporting research with real-world reach.'],
  ['talks', 'Talks', 'Conference presentations, doctoral consortia, seminars, and workshops where research is tested and sharpened.'],
  ['media-mentions', 'Media Mentions', 'Research stories, press coverage, and ideas translated for audiences beyond academia.'],
  ['academic-service', 'Academic Service', 'Peer review, professional communities, and service that strengthen research institutions and scholarly exchange.'],
  ['research-lab', 'Research Lab', 'A collaborative home for research apprentices, assistants, and students working on markets at the margins.'],
]

const doctoralDevelopment = [
  ['2026', 'ISMS Marketing Science Doctoral Consortium', 'Lisbon, Portugal · June 2026'],
  ['2025', 'Ivey-PhD Sustainability Academy Fellow', 'Selected among 14 PhD scholars globally'],
  ['2023', 'PhD Machine Learning Seminar: Causal Inference with ML', 'Max Farrell and Sanjog Misra · Chicago Booth School · Fully funded'],
  ['2023', 'MSI Marketing Strategy Doctoral Seminar', 'August–November · Selected among 24 global scholars'],
  ['2023', 'Manage Successful Field Research', 'World Bank DIME · Washington, DC · Fully funded'],
  ['2022', 'Marketing Management and Development', 'Rajesh Chandy and Om Narasimhan · London Business School · Fully funded'],
]

const reviewing = [
  ['2026', 'International Marketing Review', 'Reviewer'],
  ['2026', 'Journal of International Marketing', 'Reviewer'],
  ['2026', 'Journal of Sustainable Marketing', 'Reviewer'],
  ['2026', 'EMAC Spring Conference', 'Reviewer Workshop'],
  ['2026', 'AMA Spring Conference', 'Reviewer'],
  ['2025', 'Ivey-PhD Sustainability Academy', 'Peer Reviewer'],
]

const memberships = [
  ['2025–2026', 'ISBM Doctoral Fellow', 'Institute for the Study of Business Markets'],
  ['2025–2026', 'Ivey-PhD Sustainability Academy Fellow', 'Ivey Business School'],
  ['2026', 'AMA DocSIG', 'Volunteer'],
  ['2022–2024', 'Data Champion', 'University of Cambridge'],
  ['2023–2024', 'Athena Swan Self-Assessment Committee', 'Cambridge Judge Business School'],
  ['2022–2025', 'Impact Forum Coordinator', 'Cambridge Judge Business School'],
  ['2022–2023', 'World Economic Forum Global Shaper', 'Cambridge'],
  ['2021–2022', 'Regional Network Coordinator', 'Commonwealth Scholarship Commission, Cambridge'],
  ['2017', 'Advisory Research Intern', 'Grant Thornton India'],
  ['2016', 'Finance Intern', 'Aditya Birla Money Mart'],
  ['2015', 'Business Development Intern', 'Urban Company'],
]

const conferencePresentations = [
  {id: 2, title: 'Payment Architecture as Marketing Mix: Financial Control and Purchase Mix in Rural Retail', event: 'EMAC Spring Conference, University of Bath', date: '2026-06-01', location: 'Bath, UK', description: ''},
  {id: 5, title: 'Signals from Space, Decisions on Farms: Digital Leapfrogging for Agricultural Productivity, Climate Resilience & Sustainability', event: 'AI plus Management Doctoral Consortium, UCL School of Management', date: '2026-05-01', location: 'London, UK', description: ''},
  {id: 9, title: 'Match Frictions and Engagement: Two-sided Matching for Digital Business Mentoring in Indonesia', event: 'SEI Research Day, Bayes Business School', date: '2025-11-01', location: 'London, UK', description: ''},
  {id: 10, title: 'Match Frictions and Engagement: Two-sided Matching for Digital Business Mentoring in Indonesia', event: 'Cambridge Zero Research Symposia', date: '2024-11-15', location: 'Cambridge, UK', description: ''},
  {id: 11, title: 'Capital-centric Opportunities for Skill Training of Microentrepreneurs in Emerging Markets', event: 'Commonwealth Scholarship Commission Conference', date: '2023-06-15', location: 'Cambridge, UK', description: ''},
  {id: 12, title: 'The Future is Remote — Social Impact of Telemedicine Business in Emerging Markets', event: 'Cambridge Zero Research Symposia', date: '2021-11-15', location: 'Cambridge, UK', description: ''},
]

const redundantSeededTalkIds = [1, 3, 4, 6, 7, 8, 13, 14]

let transaction = client.transaction()

pageIntros.forEach(([page, title, description]) => {
  const id = `page-intro-${page}`
  transaction = transaction
    .createIfNotExists({_id: id, _type: 'pageIntro', page, title, description})
    .patch(id, (patch) => patch.set({page, title, description}).unset(['eyebrow']))
})

doctoralDevelopment.forEach(([year, title, detail], index) => {
  transaction = transaction.createIfNotExists({
    _id: `doctoral-development-${index + 1}`,
    _type: 'doctoralDevelopment',
    year,
    title,
    detail,
    order: index + 1,
  })
})

reviewing.forEach(([year, title, detail], index) => {
  transaction = transaction.createIfNotExists({
    _id: `academic-service-reviewing-${index + 1}`,
    _type: 'academicService',
    category: 'reviewing',
    year,
    title,
    detail,
    order: index + 1,
  })
})

memberships.forEach(([year, title, detail], index) => {
  transaction = transaction.createIfNotExists({
    _id: `academic-service-membership-${index + 1}`,
    _type: 'academicService',
    category: 'membership',
    year,
    title,
    detail,
    order: index + 1,
  })
})

const existingTalks = await client.fetch(`*[_type == "talk"]{title, event}`)
const existingTalkKeys = new Set(
  existingTalks.map(({title, event}) => `${title || ''}::${event || ''}`.toLowerCase().trim()),
)

conferencePresentations.forEach(({id, title, event, date, location, description}) => {
  const key = `${title}::${event}`.toLowerCase().trim()
  if (existingTalkKeys.has(key)) return

  transaction = transaction.createIfNotExists({
    _id: `cv-conference-presentation-${id}`,
    _type: 'talk',
    title,
    event,
    date,
    location,
    description,
  })
})

redundantSeededTalkIds.forEach((id) => {
  transaction = transaction.delete(`cv-conference-presentation-${id}`)
})

const result = await transaction.commit()
console.log(`Sanity content sync complete: ${result.results.length} documents processed.`)

import { groq } from "next-sanity";

export const siteSectionsQuery = groq`*[_type == "siteSection"] | order(order asc){
  key,
  order
}`;

export const pageIntroQuery = groq`*[_type == "pageIntro" && page == $page][0]{
  eyebrow,
  title,
  description
}`;

export const profileQuery = groq`*[_type == "profile"][0]{
  name,
  title,
  institution,
  tagline,
  bio,
  photo,
  "cvFile": cvFile.asset->url,
  email,
  googleScholar,
  twitter,
  linkedin,
  orcid
}`;

export const publicationsQuery = groq`*[_type == "publication"] | order(year desc, title asc){
  _id,
  title,
  authors,
  year,
  type,
  journal,
  abstract,
  doi,
  pdfUrl,
  featured
}`;

export const projectsQuery = groq`*[_type == "project"] | order(startDate desc){
  _id,
  title,
  slug,
  description,
  image,
  status,
  collaborators,
  dataPartners,
  startDate,
  endDate,
  url
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  body,
  image,
  status,
  collaborators,
  dataPartners,
  startDate,
  endDate,
  url,
  awardsAndGrants[] {
    title,
    organization,
    year,
    url
  },
  articles[] {
    title,
    excerpt,
    url,
    thumbnail
  }
}`;

export const talksQuery = groq`*[_type == "talk"] | order(date desc){
  _id,
  title,
  event,
  date,
  location,
  slidesUrl,
  videoUrl,
  description
}`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  photo,
  role,
  period,
  bio,
  currentAffiliation,
  isCurrent,
  linkedinUrl,
  order
}`;

export const collaboratorsQuery = groq`*[_type == "collaborator"]{
  _id,
  name,
  institution,
  url,
  logo
}`;

export const raApplicationQuery = groq`*[_type == "raApplication" && isActive == true][0]{
  _id,
  heading,
  introduction,
  position,
  languages,
  location,
  duration,
  commitment,
  startDate,
  projectDetailsUrl,
  applicationFormUrl,
  submissionTimeline,
  reviewTimeline,
  isActive
}`;

export const newsQuery = groq`*[_type == "newsItem"] | order(order asc, date desc){
  _id,
  title,
  summary,
  thumbnail,
  date,
  tag,
  url,
  order
}`;

export const consultingProjectsQuery = groq`*[_type == "consultingProject"] | order(order asc, startDate desc){
  _id,
  title,
  description,
  image,
  status,
  client,
  collaborators,
  startDate,
  endDate,
  url,
  order
}`;

export const awardsQuery = groq`*[_type == "award"] | order(order asc, date desc){
  _id,
  title,
  summary,
  thumbnail,
  date,
  organization,
  url,
  order
}`;

export const teachingQuery = groq`*[_type == "teaching"] | order(order asc){
  _id,
  title,
  role,
  course,
  professor,
  institution,
  period,
  description,
  courseOutlineUrl,
  photo,
  order
}`;

export const doctoralDevelopmentQuery = groq`*[_type == "doctoralDevelopment"] | order(order asc){
  _id,
  year,
  title,
  detail
}`;

export const academicServiceQuery = groq`*[_type == "academicService"] | order(category asc, order asc){
  _id,
  category,
  year,
  title,
  detail
}`;

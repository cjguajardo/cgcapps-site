/* ts */
export type Project = {
  name: string
  description: string
  longDescription: string
  image: string
  video?: string
  slug: string
  github: string
  tags: string[]
  stack: string[]
}

export type SkillType = {
  name: string
  since: number
}

export type getHeightProps = {
  since: number
  maxExperience: number
}
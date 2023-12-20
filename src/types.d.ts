/* ts */
export type Project = {
  name: string
  description: string
  longDescription: string
  image: string
  video?: string
  videoDescription?: string
  slug: string
  github?: string
  website?: string
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
export interface Movie {
  id: number
  title: string
  year: number
  rating: number
  genre: string[]
  type: 'movie'
  poster: string
  description: string
  language: string
  hero?: string
  objectPosition?: string
  director?: string
  cast?: string[]
  duration?: number
  country?: string
  trailer?: string
}

export interface Show {
  id: number
  title: string
  year: number
  rating: number
  genre: string[]
  type: 'series' | 'cartoon'
  poster: string
  description: string
  language: string
  hero?: string
  objectPosition?: string
  creator?: string
  cast?: string[]
  seasons?: number
  country?: string
  trailer?: string
}

export type ContentItem = Movie | Show

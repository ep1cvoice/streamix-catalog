export interface Movie {
  id: number
  title: string
  year: number
  rating: number
  genre: string[]
  type: 'movie'
  poster: string
  description: string
  cast: string[]
  language: string
  country: string
  trailer: string
  hero?: string
  objectPosition?: string
  director: string
  duration: number
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
  cast: string[]
  language: string
  country: string
  trailer: string
  hero?: string
  objectPosition?: string
  creator: string
  seasons: number
}

export type ContentItem = Movie | Show

export interface Tag {
  text: string
}

export interface PasswordRecord {
  id: string
  title: string
  url: string
  login: string
  password: string
  tags: Tag[]
  comment: string
  isFavorite: boolean
  createdAt: number
  updatedAt: number | null
}

export interface FindOptions {
  page: number
  pageSize: number
  query?: string
  tag?: string
  favoritesOnly?: boolean
}
export const CATEGORIES = [
  'film',
  'serie',
  'jeu',
  'album',
  'bd',
  'livre',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Entry {
  id: string
  title: string
  category: Category
  discovered: boolean
  rating?: number
  addedAt: string
}

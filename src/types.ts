export const CATEGORIES = [
  'film',
  'serie',
  'jeu',
  'album',
  'bd',
  'livre',
] as const

export type Category = (typeof CATEGORIES)[number]

export const STATUT_A_DECOUVRIR = 'a_decouvrir'
export const STATUT_DECOUVERT = 'decouvert'

export type Statut = typeof STATUT_A_DECOUVRIR | typeof STATUT_DECOUVERT

export interface EntryRow {
  id: string
  titre: string
  categorie: string
  statut: string
  note: string | null
  created_at: string
}

export interface Entry {
  id: string
  title: string
  category: Category
  discovered: boolean
  rating?: number
  addedAt: string
}

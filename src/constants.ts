import type { Category } from './types'

export const CATEGORY_LABELS: Record<Category, string> = {
  film: 'Film',
  serie: 'Série',
  jeu: 'Jeu vidéo',
  album: 'Album',
  bd: 'BD',
  livre: 'Livre',
}

export const STORAGE_KEY = 'bucket-list-entries'

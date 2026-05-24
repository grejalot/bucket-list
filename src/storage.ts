import { STORAGE_KEY } from './constants'
import type { Entry } from './types'

export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as Entry[]
  } catch {
    return []
  }
}

export function saveEntries(entries: Entry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

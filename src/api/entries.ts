import { supabase } from '../lib/supabase'
import {
  STATUT_A_DECOUVRIR,
  STATUT_DECOUVERT,
  type Category,
  type Entry,
  type EntryRow,
} from '../types'

function rowToEntry(row: EntryRow): Entry {
  const note = row.note?.trim()
  const rating = note ? Number(note) : undefined

  return {
    id: row.id,
    title: row.titre,
    category: row.categorie as Category,
    discovered: row.statut === STATUT_DECOUVERT,
    rating: rating && !Number.isNaN(rating) ? rating : undefined,
    addedAt: row.created_at,
  }
}

export async function fetchEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as EntryRow[]).map(rowToEntry)
}

export async function createEntry(input: {
  title: string
  category: Category
}): Promise<Entry> {
  const { data, error } = await supabase
    .from('entries')
    .insert({
      titre: input.title,
      categorie: input.category,
    })
    .select()
    .single()

  if (error) throw error
  return rowToEntry(data as EntryRow)
}

export async function updateEntry(
  id: string,
  patch: Partial<Pick<Entry, 'discovered' | 'rating'>>,
): Promise<Entry> {
  const updates: Partial<EntryRow> = {}

  if (patch.discovered !== undefined) {
    updates.statut = patch.discovered ? STATUT_DECOUVERT : STATUT_A_DECOUVRIR
  }

  if ('rating' in patch) {
    updates.note =
      patch.rating === undefined ? null : String(patch.rating)
  }

  const { data, error } = await supabase
    .from('entries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return rowToEntry(data as EntryRow)
}

export async function deleteEntry(id: string): Promise<void> {
  const { error } = await supabase.from('entries').delete().eq('id', id)
  if (error) throw error
}

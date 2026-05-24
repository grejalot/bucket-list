import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as entriesApi from '../api/entries'
import type { Entry } from '../types'

interface EntriesContextValue {
  entries: Entry[]
  loading: boolean
  error: string | null
  addEntry: (entry: Omit<Entry, 'id' | 'addedAt' | 'discovered'>) => Promise<void>
  updateEntry: (
    id: string,
    patch: Partial<Pick<Entry, 'discovered' | 'rating'>>,
  ) => Promise<void>
  removeEntry: (id: string) => Promise<void>
  refreshEntries: () => Promise<void>
}

const EntriesContext = createContext<EntriesContextValue | null>(null)

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshEntries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await entriesApi.fetchEntries()
      setEntries(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Impossible de charger les entrées',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshEntries()
  }, [refreshEntries])

  const addEntry = useCallback(
    async (data: Omit<Entry, 'id' | 'addedAt' | 'discovered'>) => {
      setError(null)
      try {
        const entry = await entriesApi.createEntry({
          title: data.title,
          category: data.category,
        })
        setEntries((prev) => [entry, ...prev])
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Impossible d'ajouter l'entrée",
        )
        throw err
      }
    },
    [],
  )

  const updateEntry = useCallback(
    async (
      id: string,
      patch: Partial<Pick<Entry, 'discovered' | 'rating'>>,
    ) => {
      setError(null)
      const previous = entries
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      )

      try {
        const updated = await entriesApi.updateEntry(id, patch)
        setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)))
      } catch (err) {
        setEntries(previous)
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de modifier l'entrée",
        )
      }
    },
    [entries],
  )

  const removeEntry = useCallback(
    async (id: string) => {
      setError(null)
      const previous = entries
      setEntries((prev) => prev.filter((e) => e.id !== id))

      try {
        await entriesApi.deleteEntry(id)
      } catch (err) {
        setEntries(previous)
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de supprimer l'entrée",
        )
      }
    },
    [entries],
  )

  const value = useMemo(
    () => ({
      entries,
      loading,
      error,
      addEntry,
      updateEntry,
      removeEntry,
      refreshEntries,
    }),
    [entries, loading, error, addEntry, updateEntry, removeEntry, refreshEntries],
  )

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  )
}

export function useEntries() {
  const ctx = useContext(EntriesContext)
  if (!ctx) throw new Error('useEntries must be used within EntriesProvider')
  return ctx
}

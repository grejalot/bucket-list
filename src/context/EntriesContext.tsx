import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadEntries, saveEntries } from '../storage'
import type { Entry } from '../types'

interface EntriesContextValue {
  entries: Entry[]
  addEntry: (entry: Omit<Entry, 'id' | 'addedAt' | 'discovered'>) => void
  updateEntry: (id: string, patch: Partial<Pick<Entry, 'discovered' | 'rating'>>) => void
  removeEntry: (id: string) => void
}

const EntriesContext = createContext<EntriesContextValue | null>(null)

export function EntriesProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>(() => loadEntries())

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const addEntry = useCallback(
    (data: Omit<Entry, 'id' | 'addedAt' | 'discovered'>) => {
      const entry: Entry = {
        ...data,
        id: crypto.randomUUID(),
        discovered: false,
        addedAt: new Date().toISOString(),
      }
      setEntries((prev) => [entry, ...prev])
    },
    [],
  )

  const updateEntry = useCallback(
    (id: string, patch: Partial<Pick<Entry, 'discovered' | 'rating'>>) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      )
    },
    [],
  )

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const value = useMemo(
    () => ({ entries, addEntry, updateEntry, removeEntry }),
    [entries, addEntry, updateEntry, removeEntry],
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

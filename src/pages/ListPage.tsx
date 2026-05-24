import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CATEGORY_LABELS } from '../constants'
import { useEntries } from '../context/EntriesContext'
import { CATEGORIES, type Category } from '../types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function ListPage() {
  const { entries, loading, error, updateEntry, removeEntry } = useEntries()
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [hideDiscovered, setHideDiscovered] = useState(false)

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (filter !== 'all' && e.category !== filter) return false
      if (hideDiscovered && e.discovered) return false
      return true
    })
  }, [entries, filter, hideDiscovered])

  return (
    <Layout>
      <header className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-900">Ma liste</h1>
        <span className="text-sm text-gray-400">{filtered.length}</span>
      </header>

      <div className="mb-6 space-y-4 rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            Tout
          </FilterChip>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </FilterChip>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={hideDiscovered}
            onChange={(e) => setHideDiscovered(e.target.checked)}
            className="size-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
          />
          Masquer les découverts
        </label>
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-gray-400 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          Chargement…
        </p>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-gray-400 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {entries.length === 0
            ? 'Aucune entrée pour l’instant.'
            : 'Aucun résultat avec ces filtres.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((entry) => (
            <li
              key={entry.id}
              className={`rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition ${
                entry.discovered ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-medium text-gray-900 ${
                      entry.discovered ? 'line-through decoration-gray-300' : ''
                    }`}
                  >
                    {entry.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    <span className="gradient-text font-medium">
                      {CATEGORY_LABELS[entry.category]}
                    </span>
                    <span className="mx-1.5">·</span>
                    {formatDate(entry.addedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="shrink-0 text-xs text-gray-300 transition hover:text-red-400"
                  aria-label="Supprimer"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-gray-50 pt-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={entry.discovered}
                    onChange={(e) =>
                      updateEntry(entry.id, { discovered: e.target.checked })
                    }
                    className="size-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  Découvert
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-500">
                  Note
                  <select
                    value={entry.rating ?? ''}
                    onChange={(e) => {
                      const v = e.target.value
                      updateEntry(entry.id, {
                        rating: v === '' ? undefined : Number(v),
                      })
                    }}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-1 text-sm text-gray-700 outline-none focus:border-violet-300"
                  >
                    <option value="">—</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}/5
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-center">
        <Link
          to="/"
          className="text-sm text-gray-400 underline-offset-4 transition hover:text-gray-600 hover:underline"
        >
          Ajouter une entrée
        </Link>
      </p>
    </Layout>
  )
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active
          ? 'gradient-accent text-white shadow-sm'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { CATEGORY_LABELS } from '../constants'
import { useEntries } from '../context/EntriesContext'
import { CATEGORIES, type Category } from '../types'

export function HomePage() {
  const { addEntry } = useEntries()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('film')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addEntry({ title: trimmed, category })
    setTitle('')
    navigate('/liste')
  }

  return (
    <Layout>
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          <span className="gradient-text">À découvrir</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500">Références culturelles</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:p-8"
      >
        <label className="block">
          <span className="sr-only">Titre</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            required
            autoFocus
            className="w-full border-0 border-b border-gray-200 bg-transparent pb-3 text-lg text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-violet-400"
          />
        </label>

        <label className="mt-6 block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-400">
            Catégorie
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="gradient-accent mt-8 w-full rounded-xl py-3.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition hover:opacity-95 active:scale-[0.99]"
        >
          Ajouter
        </button>
      </form>

      <p className="mt-8 text-center">
        <Link
          to="/liste"
          className="text-sm text-gray-400 underline-offset-4 transition hover:text-gray-600 hover:underline"
        >
          Voir la liste
        </Link>
      </p>
    </Layout>
  )
}

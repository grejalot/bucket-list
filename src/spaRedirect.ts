const REDIRECT_KEY = 'bucket-list-redirect'

/** Restaure l’URL après redirection depuis 404.html (GitHub Pages). */
export function restoreSpaRedirect(): void {
  const stored = sessionStorage.getItem(REDIRECT_KEY)
  if (!stored) return

  sessionStorage.removeItem(REDIRECT_KEY)
  const base = import.meta.env.BASE_URL
  const path = stored.startsWith('/') ? stored.slice(1) : stored
  window.history.replaceState(null, '', `${base}${path}`)
}

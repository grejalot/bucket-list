# Bucket list culturelle

Application web personnelle pour suivre films, séries, jeux, albums, BD et livres à découvrir.

## Lancer le projet

```bash
cd bucket-list
npm install
npm run dev
```

Ouvrir l’URL affichée dans le terminal (généralement http://localhost:5173).

## Scripts

| Commande        | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build de production      |
| `npm run preview` | Prévisualiser le build |

## Fonctionnalités

- **/** — Saisie minimaliste (titre + catégorie)
- **/liste** — Filtres par catégorie, case « Découvert », option « Masquer les découverts », note optionnelle 1–5
- Données persistées dans **Supabase** (table `entries`)

## Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier l’URL et la clé anon dans `.env` (voir `.env.example`)
3. Exécuter le SQL de `supabase/migrations/001_create_entries.sql` dans l’éditeur SQL Supabase

Pour le déploiement GitHub Pages, ajouter les secrets `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les paramètres du dépôt GitHub.

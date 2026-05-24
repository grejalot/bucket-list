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
- Données persistées dans `localStorage` (clé `bucket-list-entries`)

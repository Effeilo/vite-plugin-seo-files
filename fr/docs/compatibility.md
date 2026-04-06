# Compatibilité

---

## Prérequis d'environnement

| Environnement | Version minimale | Raison |
|---|---|---|
| Node.js | 18+ | `import()` dynamique ESM natif, `fs`, `path`, `url` |
| Vite | 4+ | API plugin (`configResolved`, `closeBundle`) |

---

## Compatibilité Vite

| Version Vite | Statut |
|---|---|
| Vite 4.x | Supporté |
| Vite 5.x | Supporté |
| Vite 6.x | Supporté |

Le plugin utilise l'API plugin Vite standard et ne repose sur aucun élément interne spécifique à une version.

---

## Compatibilité frameworks

`vite-plugin-seo-files` fonctionne avec tout projet construit avec Vite, quel que soit le framework frontend.

| Framework / Configuration | Statut | Notes |
|---|---|---|
| HTML vanilla | Supporté | Utilise le mode scan des fichiers HTML |
| React (Vite) | Supporté | Utiliser `routesFile` pour les routes SPA |
| Vue 3 (Vite) | Supporté | Utiliser `routesFile` pour les routes SPA |
| Svelte (Vite) | Supporté | Utiliser `routesFile` pour les routes SPA |
| SvelteKit | Non applicable | SvelteKit a son propre format de build |
| Nuxt | Non applicable | Nuxt dispose de sa propre solution de sitemap |
| Astro | Compatible | Le mode scan HTML fonctionne avec les sorties statiques |

---

## Format de module

Depuis la v2.0.0, le plugin est **ESM natif uniquement**. Il n'y a pas de build CommonJS.

| Style d'import | Statut |
|---|---|
| `import seoFiles from 'vite-plugin-seo-files'` | Supporté |
| `const seoFiles = require('vite-plugin-seo-files')` | Non supporté |

Votre `vite.config.js` ou `vite.config.ts` doit utiliser la syntaxe ESM (`import`). Si votre projet utilise `"type": "module"` dans `package.json` ou des fichiers config `.mjs`, c'est déjà le cas.

---

## Dépendances

| Package | Type | Rôle |
|---|---|---|
| [glob](https://www.npmjs.com/package/glob) | Exécution | Scan des fichiers `**/*.html` dans le répertoire de sortie |
| [vite](https://vite.dev/) | Pair | Types de l'API plugin et cycle de vie du build |
| [typescript](https://www.typescriptlang.org/) | Dev | Compilateur |
| [@types/node](https://www.npmjs.com/package/@types/node) | Dev | Déclarations de types Node.js |

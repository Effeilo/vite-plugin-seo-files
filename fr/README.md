[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-seo-files-300.png" alt="logo vite-plugin-seo-files"/>
</div>

# vite-plugin-seo-files

**Une solution simple et automatisée pour générer les fichiers SEO techniques (sitemap.xml, robots.txt) dans tous vos projets Vite.**

BrowserUX SEO Files est un plugin Vite léger et configurable qui s'intègre parfaitement dans votre processus de build. Il génère automatiquement les fichiers essentiels à l'indexation et au crawl par les moteurs de recherche après chaque build. Compatible avec les sites statiques et les SPAs, il prend en charge les routes personnalisées, les exclusions ciblées et les règles d'accès pour les robots, le tout sans aucune configuration manuelle.

- [Site du projet](https://browserux.com/fr/seo-files/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B%20%7C%206%2B-646CFF.svg?logo=vite&logoColor=white)

## Fonctionnalités

- 🗺 Génère `sitemap.xml` avec `<loc>`, `<lastmod>` et `<priority>`
- 🤖 Génère `robots.txt` avec `User-agent`, `Disallow` et `Sitemap`
- 🔍 Deux modes de découverte des URLs : scan des fichiers HTML (statique) ou fichier de liste de routes (SPA)
- 🔁 Déduplication des URLs, pas d'entrées dupliquées en combinant les sources
- 🚫 Exclusion de fichiers par patterns glob via `exclude`
- ➕ URLs supplémentaires via `additionalUrls`
- 🔒 Chemins `Disallow` configurables pour `robots.txt`
- 📂 Répertoire de sortie lu depuis `build.outDir` de Vite, aucun chemin codé en dur
- 🔧 Désactiver le sitemap ou le robots indépendamment
- 📦 ESM natif, TypeScript, déclarations de types incluses

## Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

## Utilisation

```js
// vite.config.js
import { defineConfig } from 'vite';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
  plugins: [
    seoFiles({
      siteUrl: 'https://example.com',
    }),
  ],
});
```

## Options

| Option | Type | Défaut | Description |
|---|---|---|---|
| `siteUrl` | `string` | — |   **Requis.** URL de base du site, doit commencer par `http://` ou `https://` |
| `generateSitemap` | `boolean` | `true` | Générer `sitemap.xml` |
| `generateRobots` | `boolean` | `true` | Générer `robots.txt` |
| `routesFile` | `string` | `'src/routes-list.js'` | Chemin vers un fichier JS exportant un tableau de routes (mode SPA) |
| `exclude` | `string[]` | `[]` | Patterns glob pour exclure du scan HTML |
| `additionalUrls` | `string[]` | `[]` | Chemins d'URLs supplémentaires à ajouter au sitemap |
| `disallow` | `string[]` | `[]` | Chemins à ajouter comme lignes `Disallow` dans `robots.txt` |

## Routes SPA

Pour les applications single-page, créez un fichier de routes :

```js
// src/routes-list.js
export default ['/', '/about', '/blog', '/contact'];
```

Le plugin l'importe dynamiquement et l'utilise à la place du scan des fichiers HTML.

## Documentation

Pour la documentation complète, voir [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : ce que fait le plugin, quand l'utiliser, fonctionnalités
- [Démarrage](docs/guide/getting-started.md) : installation et configuration
- [Fonctionnement](docs/guide/how-it-works.md) : génération du sitemap, du robots.txt, déduplication
- [Routes SPA](docs/guide/spa-routes.md) : utiliser un fichier `routes-list.js` pour les SPAs

### Référence

- [Options](docs/reference/options.md) : toutes les options avec types, valeurs par défaut et exemples
- [Hooks](docs/reference/hooks.md) : hooks `configResolved` et `closeBundle`
- [Sortie](docs/reference/output.md) : format des fichiers `sitemap.xml` et `robots.txt` générés

### Référence complémentaire

- [Compatibilité](docs/compatibility.md) : Node.js, versions Vite, format de module, dépendances
- [Contribuer](docs/contributing.md) : signaler un bug, suggérer une amélioration, soumettre une PR

## Licence

MIT © 2026 [Effeilo](https://github.com/Effeilo)

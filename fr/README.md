[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-pages.png" alt="logo vite-plugin-seo-pages"/>
</div>

# vite-plugin-seo-files

**`vite-plugin-seo-files`** est un plugin Vite qui automatise la génération des fichiers SEO techniques essentiels (`sitemap.xml`, `robots.txt`) **après le build**. Il est compatible ESM et CommonJS grâce à un double système d'exports.

Il s’intègre facilement dans votre configuration Vite, sans dépendance à `.env`, et fonctionne avec tous les frameworks (HTML statique, React, Vue, Svelte…).

> Pratique pour améliorer l’indexation et le crawl de vos sites statiques ou SPA.

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B-646CFF.svg?logo=vite&logoColor=white)


## 🚀 Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

## ⚙️ Utilisation

Ajoutez le plugin dans votre fichier `vite.config.js` ou `vite.config.mjs`:

```js
import { defineConfig } from 'vite';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
    plugins: [
        seoFiles({
            siteUrl: 'https://example.com', // ✅ Obligatoire
            generateSitemap: true, // facultatif, défaut : true
            generateRobots: true, // facultatif, défaut : true
            exclude: ['test.html', 'drafts/**'], // facultatif, glob patterns
            disallow: ['/private/', '/secret.html'] // facultatif, chemins à exclure dans robots.txt
        })
    ]
});
```

## 🧾 Fichiers générés

Après `vite build`, le plugin écrit automatiquement dans `dist/` :

| Fichier        | Description                                     |
|----------------|-------------------------------------------------|
| `sitemap.xml`  | Liste des pages HTML avec `lastmod`, `priority` |
| `robots.txt`   | Fichier d’accès pour les moteurs de recherche   |

## 🔧 Options disponibles

| Option            | Type       | Par défaut | Description                                                         |
|-------------------|------------|------------|---------------------------------------------------------------------|
| `siteUrl`         | `string`   | -          | URL de base du site, utilisée dans le `sitemap.xml` et `robots.txt` |
| `generateSitemap` | `boolean`  | `true`     | Active/désactive la génération du `sitemap.xml`                     |
| `generateRobots`  | `boolean`  | `true`     | Active/désactive la génération du `robots.txt`                      |
| `exclude`         | `string[]` | `[]`       | Liste de patterns glob à ignorer dans le `sitemap.xml`              |
| `disallow`        | `string[]` | `[]`       | Liste de chemins à exclure via `robots.txt` (directive Disallow)    |

## ✨ Fonctionnalités incluses

- Extraction de la date de modification réelle (`lastmod`) des fichiers `.html`
- Compatible avec tous les projets Vite (SPA, MPA, static)
- Exclusion personnalisée via `exclude`
- Règles Disallow personnalisables via `disallow`
- Aucun besoin de `.env` 

## 📁 Exemples

### Structure

```bash
dist/
├── index.html
├── about/
├   └── index.html
├── offline.html
├── sitemap.xml # généré automatiquement
└── robots.txt # généré automatiquement
```

### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://browserux.com/offline.html</loc>
        <lastmod>2025-06-07</lastmod>
        <priority>0.50</priority>
    </url>
    <url>
        <loc>https://browserux.com/</loc>
        <lastmod>2025-06-07</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>https://browserux.com/about/</loc>
        <lastmod>2025-06-07</lastmod>
        <priority>0.50</priority>
    </url>
</urlset>
```

### robots.txt

```bash
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow: /private/
Disallow: /secret.html

# Sitemap file
Sitemap: https://browserux.com/sitemap.xml
```

## 📌 Bonnes pratiques

- Le champ `siteUrl` doit être une URL absolue (commençant par `https://`)
- Le plugin s’exécute uniquement lors du `vite build`, pas en dev
- Utilisez `exclude` pour retirer des pages de brouillon, erreurs, etc.
- Utilisez `disallow` pour empêcher l’indexation de chemins spécifiques via `robots.txt`

## ⚖️ Licence

MIT © 2025 [Effeilo](https://github.com/Effeilo)
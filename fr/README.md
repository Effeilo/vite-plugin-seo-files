[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-seo-files-300.png" alt="logo vite-plugin-seo-files"/>
</div>

# vite-plugin-seo-files

**`vite-plugin-seo-files`** est un plugin Vite qui automatise la génération des fichiers SEO techniques essentiels (`sitemap.xml`, `robots.txt`) **après le build**.

Il s'intègre facilement dans votre configuration Vite et fonctionne avec tous les frameworks (HTML statique, React, Vue, Svelte…).

> Pratique pour améliorer l'indexation et le crawl de vos sites statiques ou SPA.

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B%20%7C%206%2B-646CFF.svg?logo=vite&logoColor=white)

## Fonctionnalités

- 🗺️ Génère automatiquement un `sitemap.xml` complet à chaque build
- 🤖 Crée un fichier `robots.txt` optimisé pour le crawl des moteurs de recherche
- 📁 Prend en charge les fichiers `.html` du répertoire de sortie sans configuration supplémentaire
- 📌 Supporte les Single Page Applications via `src/routes-list.js` (configurable)
- ➕ Permet d'ajouter des URLs personnalisées au sitemap (`additionalUrls`)
- 🚫 Exclut facilement des pages du sitemap grâce à `exclude` (glob pattern)
- 🛑 Bloque des chemins sensibles dans `robots.txt` avec `disallow`
- 📅 Calcule automatiquement la date de dernière modification (`lastmod`) des pages
- 🔧 Fonctionne avec tous les frameworks Vite (React, Vue, Svelte, etc.)
- 🔁 Respecte `build.outDir` de votre config Vite — aucun dossier `dist/` codé en dur
- 🚫 Déduplique automatiquement les URLs pour éviter les conflits dans le sitemap
- ⚙️ Configuration ultra-légère, intégration immédiate dans `vite.config.js`
- 🚀 Automatisation totale après `vite build`, aucune étape manuelle requise


## Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

## Utilisation

Ajoutez le plugin dans votre fichier `vite.config.js` ou `vite.config.mjs` :

```js
import { defineConfig } from 'vite';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
    plugins: [
        seoFiles({
            siteUrl: 'https://exemple.com', // ✅ Requis : URL de base du site
            generateSitemap: true, // Facultatif : génère sitemap.xml (défaut : true)
            generateRobots: true, // Facultatif : génère robots.txt (défaut : true)
            exclude: ['test.html', 'drafts/**'], // Facultatif : fichiers à exclure du sitemap (glob)
            additionalUrls: ['/external-page', '/api/landing'], // Facultatif : URLs à ajouter manuellement dans le sitemap
            disallow: ['/private/', '/secret.html'], // Facultatif : chemins à bloquer dans robots.txt
            routesFile: 'src/routes-list.js' // Facultatif : chemin personnalisé vers le fichier de routes (défaut : 'src/routes-list.js')
        })
    ]
});
```

### Cas des SPA (React, Vue, etc.)

Pour les projets en Single Page Application, vous pouvez ajouter un fichier `routes-list.js` dans le dossier `src/`.
Si ce fichier est détecté, il sera automatiquement utilisé pour générer le sitemap à partir des routes déclarées.
Sinon, le plugin utilisera par défaut les fichiers `.html` présents dans le répertoire de sortie.

Vous pouvez modifier le chemin par défaut via l'option `routesFile` :

```js
seoFiles({
    siteUrl: 'https://exemple.com',
    routesFile: 'app/my-routes.js' // chemin personnalisé, relatif à la racine du projet
})
```

**Exemple de fichier** `routes-list.js` :

```js
export default [
    '/',
    '/about'
];
```

## Fichiers générés

Après `vite build`, le plugin écrit automatiquement dans le répertoire de sortie (respecte `build.outDir`) :

| Fichier        | Description                                     |
|----------------|-------------------------------------------------|
| `sitemap.xml`  | Liste des pages HTML avec `lastmod`, `priority` |
| `robots.txt`   | Fichier d'accès pour les moteurs de recherche   |

## Options disponibles

| Option            | Type       | Par défaut               | Description                                                         |
|-------------------|------------|--------------------------|---------------------------------------------------------------------|
| `siteUrl`         | `string`   | -                        | URL de base du site, utilisée dans le `sitemap.xml` et `robots.txt` |
| `generateSitemap` | `boolean`  | `true`                   | Active/désactive la génération du `sitemap.xml`                     |
| `generateRobots`  | `boolean`  | `true`                   | Active/désactive la génération du `robots.txt`                      |
| `exclude`         | `string[]` | `[]`                     | Liste de patterns glob à ignorer dans le `sitemap.xml`              |
| `additionalUrls`  | `string[]` | `[]`                     | URLs personnalisées à ajouter manuellement dans le `sitemap.xml`    |
| `disallow`        | `string[]` | `[]`                     | Liste de chemins à exclure via `robots.txt` (directive Disallow)    |
| `routesFile`      | `string`   | `'src/routes-list.js'`   | Chemin personnalisé vers le fichier de routes pour les SPA          |

## Fonctionnalités incluses

- Compatible avec tous les projets Vite (SPA, MPA, static)
- Lit `build.outDir` depuis la config Vite — fonctionne avec n'importe quel répertoire de sortie
- Extraction de la date de modification réelle (`lastmod`) des fichiers `.html`
- Utilisation automatique de `src/routes-list.js` si présent (configurable via `routesFile`)
- Déduplique les URLs pour éviter les entrées en double dans le sitemap
- Ajout d'URLs personnalisées avec `additionalUrls`
- Exclusion personnalisée via `exclude`
- Règles Disallow personnalisables via `disallow`

## Exemples

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

## Bonnes pratiques

- Le champ `siteUrl` doit être une URL absolue (commençant par `https://`)
- Le plugin s'exécute uniquement lors du `vite build`, pas en dev
- Utilisez `exclude` pour retirer des pages de brouillon, erreurs, etc.
- Utilisez `disallow` pour empêcher l'indexation de chemins spécifiques via `robots.txt`
- Utilisez `routesFile` si votre fichier de routes SPA n'est pas au chemin par défaut `src/routes-list.js`

## Prise en charge de TypeScript & ESM

Le plugin est entièrement écrit en **TypeScript** et publié en tant que module **ESM** natif (`"type": "module"` dans le `package.json`).

Si vous utilisez un fichier `vite.config.ts`, vous bénéficiez automatiquement du support complet des types :

```ts
import seoFiles from 'vite-plugin-seo-files';

seoFiles({
  siteUrl: 'https://example.com'
});
```

## Licence

MIT © 2025 [Effeilo](https://github.com/Effeilo)

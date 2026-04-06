# Démarrage

## Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

---

## Configuration minimale

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

`siteUrl` est la seule option requise. Après `vite build`, `sitemap.xml` et `robots.txt` sont écrits dans le répertoire de sortie.

---

## Configuration TypeScript

```ts
// vite.config.ts
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

Les déclarations de types sont incluses, aucun package `@types` séparé n'est nécessaire.

---

## Exemple de configuration complète

```js
import { defineConfig } from 'vite';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
  plugins: [
    seoFiles({
      siteUrl: 'https://example.com',
      generateSitemap: true,
      generateRobots: true,
      routesFile: 'src/routes-list.js',
      exclude: ['admin/**', 'preview/**'],
      additionalUrls: ['/blog', '/contact'],
      disallow: ['/admin/', '/api/'],
    }),
  ],
});
```

---

## Désactiver des fichiers individuellement

```js
// Générer uniquement robots.txt
seoFiles({
  siteUrl: 'https://example.com',
  generateSitemap: false,
})

// Générer uniquement sitemap.xml
seoFiles({
  siteUrl: 'https://example.com',
  generateRobots: false,
})
```

---

## Exécuter le build

```bash
vite build
```

Le plugin affiche sa sortie dans le terminal :

```
----------------------------------------
🔍  BrowserUX SEO Files
----------------------------------------
✅ sitemap.xml generated
✅ robots.txt generated
```

# vite-plugin-seo-files

`vite-plugin-seo-files` est un plugin Vite qui génère automatiquement `sitemap.xml` et `robots.txt` à la fin de chaque build de production. Il supporte les sites statiques (scan des fichiers HTML) et les SPAs (fichier de liste de routes), avec déduplication des URLs, patterns d'exclusion et règles Disallow configurables.

---

## Documentation

### Guide

- [Introduction](guide/introduction.md), ce que fait le plugin, quand l'utiliser, fonctionnalités
- [Démarrage](guide/getting-started.md), installation et configuration minimale
- [Fonctionnement](guide/how-it-works.md), génération du sitemap, du robots.txt, déduplication des URLs
- [Routes SPA](guide/spa-routes.md), utiliser un fichier `routes-list.js` pour les applications single-page

### Référence

- [Options](reference/options.md), toutes les options du plugin avec types et valeurs par défaut
- [Hooks](reference/hooks.md), hooks Vite utilisés par le plugin
- [Sortie](reference/output.md), format des fichiers `sitemap.xml` et `robots.txt` générés

### Autres

- [Compatibilité](compatibility.md), Node.js, versions Vite, matrice des dépendances
- [Contribuer](contributing.md), signaler des problèmes et soumettre des pull requests
- [Changelog](../../CHANGELOG.md)

---

## Exemple rapide

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

Après `vite build`, `sitemap.xml` et `robots.txt` sont écrits dans le répertoire de sortie.

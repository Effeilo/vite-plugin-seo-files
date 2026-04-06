# Fonctionnement

## Cycle de vie Vite

Le plugin enregistre deux hooks Vite :

- **`configResolved`**, lit `config.build.outDir` pour savoir où écrire les fichiers de sortie.
- **`closeBundle`**, s'exécute après que Vite a terminé d'écrire tous les fichiers de build. Génère `sitemap.xml` et `robots.txt` dans le répertoire de sortie.

---

## Génération du sitemap

### Découverte des URLs, deux modes

**Mode 1 : fichier de routes (SPA)**

Si un fichier de routes existe au chemin configuré (défaut : `src/routes-list.js`), le plugin l'importe dynamiquement et utilise son tableau de chaînes de routes exporté.

```js
// src/routes-list.js
export default ['/', '/about', '/blog', '/contact'];
```

- Route racine `/` → `<priority>1.00</priority>`, `<lastmod>` aujourd'hui
- Toutes les autres routes → `<priority>0.50</priority>`, `<lastmod>` aujourd'hui

**Mode 2 : scan des fichiers HTML (statique)**

Si aucun fichier de routes n'est trouvé, le plugin scanne `**/*.html` dans le répertoire de sortie via `glob`. Les fichiers `404.html` et `403.html` sont toujours exclus, ainsi que les patterns de l'option `exclude`.

- `index.html` → `<priority>1.00</priority>`, `<lastmod>` depuis le `mtime` du fichier
- Tous les autres fichiers HTML → `<priority>0.50</priority>`, `<lastmod>` depuis le `mtime` du fichier

### URLs supplémentaires

Après la découverte des routes/fichiers, les chemins de `additionalUrls` sont ajoutés :

- Priorité : `0.50`
- `<lastmod>` : date du jour

### Déduplication des URLs

Toutes les URLs sont suivies dans un `Set`. Si la même URL apparaît plusieurs fois (par exemple depuis `additionalUrls` et le fichier de routes), seule la première occurrence est conservée.

### Format de sortie

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-04-04</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-04-04</lastmod>
    <priority>0.50</priority>
  </url>
</urlset>
```

---

## Génération du robots.txt

Le fichier `robots.txt` généré contient toujours :

1. Un bloc `User-agent: *`
2. Des lignes `Disallow` depuis l'option `disallow` (ou un `Disallow:` vide si aucun n'est configuré)
3. Une ligne `Sitemap:` pointant vers `{siteUrl}/sitemap.xml`

### Format de sortie, sans règles Disallow

```
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow:

# Sitemap file
Sitemap: https://example.com/sitemap.xml
```

### Format de sortie, avec règles Disallow

```
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow: /admin/
Disallow: /api/

# Sitemap file
Sitemap: https://example.com/sitemap.xml
```

---

## Validation de siteUrl

Le plugin valide `siteUrl` au démarrage. S'il est absent ou ne commence pas par `http://` ou `https://`, une erreur est levée immédiatement :

```
Error: [vite-plugin-seo-files] You must provide a valid siteUrl.
```

Les barres obliques de fin dans `siteUrl` sont supprimées automatiquement avant utilisation.

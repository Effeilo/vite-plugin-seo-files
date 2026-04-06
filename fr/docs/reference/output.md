# Sortie

## sitemap.xml

Le sitemap généré suit le [protocole Sitemaps](https://www.sitemaps.org/protocol.html).

### Format

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

### Champs

| Champ | Description |
|---|---|
| `<loc>` | URL complète : `siteUrl` + route ou chemin scanné |
| `<lastmod>` | Date ISO (`YYYY-MM-DD`). Depuis le `mtime` du fichier en mode scan ; date du jour en mode SPA et `additionalUrls` |
| `<priority>` | `1.00` pour l'URL racine (`/` ou `index.html`), `0.50` pour toutes les autres |

### Règles de priorité

| URL | Priorité |
|---|---|
| `/` (fichier de routes) ou `index.html` (scan) | `1.00` |
| Toutes les autres URLs | `0.50` |
| `additionalUrls` | `0.50` |

---

## robots.txt

### Format, sans règles Disallow

```
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow:

# Sitemap file
Sitemap: https://example.com/sitemap.xml
```

### Format, avec règles Disallow

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

### Notes

- Un seul bloc `User-agent: *` est généré. Les règles par bot ne sont pas supportées.
- La directive `Sitemap:` pointe toujours vers `{siteUrl}/sitemap.xml` quelle que soit l'activation de la génération du sitemap.
- Le fichier est écrit en texte brut (UTF-8).

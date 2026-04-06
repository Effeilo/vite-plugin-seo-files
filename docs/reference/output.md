# Output

## sitemap.xml

The generated sitemap follows the [Sitemaps protocol](https://www.sitemaps.org/protocol.html).

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

### Fields

| Field | Description |
|---|---|
| `<loc>` | Full URL: `siteUrl` + route or scanned path |
| `<lastmod>` | ISO date (`YYYY-MM-DD`). From file `mtime` in scan mode; today's date in SPA and `additionalUrls` mode |
| `<priority>` | `1.00` for the root URL (`/` or `index.html`), `0.50` for all others |

### Priority rules

| URL | Priority |
|---|---|
| `/` (routes file) or `index.html` (scan) | `1.00` |
| All other URLs | `0.50` |
| `additionalUrls` | `0.50` |

---

## robots.txt

### Format, no disallow rules

```
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow:

# Sitemap file
Sitemap: https://example.com/sitemap.xml
```

### Format, with disallow rules

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

- Only one `User-agent: *` block is generated. Per-bot rules are not supported.
- The `Sitemap:` directive always points to `{siteUrl}/sitemap.xml` regardless of whether sitemap generation is enabled.
- The file is written as plain text (UTF-8).

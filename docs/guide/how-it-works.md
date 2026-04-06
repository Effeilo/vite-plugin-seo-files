# How it works

## Vite lifecycle

The plugin registers two Vite hooks:

- **`configResolved`**, reads `config.build.outDir` to know where to write output files.
- **`closeBundle`**, runs after Vite finishes writing all build output. Generates `sitemap.xml` and `robots.txt` in the output directory.

---

## Sitemap generation

### URL discovery, two modes

**Mode 1: routes file (SPA)**

If a routes file exists at the configured path (default: `src/routes-list.js`), the plugin imports it dynamically and uses its exported array of route strings.

```js
// src/routes-list.js
export default ['/', '/about', '/blog', '/contact'];
```

- Root route `/` → `<priority>1.00</priority>`, `<lastmod>` today
- All other routes → `<priority>0.50</priority>`, `<lastmod>` today

**Mode 2: HTML file scan (static)**

If no routes file is found, the plugin scans `**/*.html` in the output directory using `glob`. Files `404.html` and `403.html` are always excluded, plus any patterns from the `exclude` option.

- `index.html` → `<priority>1.00</priority>`, `<lastmod>` from file `mtime`
- All other HTML files → `<priority>0.50</priority>`, `<lastmod>` from file `mtime`

### Additional URLs

After route/file discovery, paths from `additionalUrls` are appended:

- Priority: `0.50`
- `<lastmod>`: today's date

### URL deduplication

All URLs are tracked in a `Set`. If the same URL appears multiple times (e.g., from both `additionalUrls` and the routes file), only the first occurrence is kept.

### Output format

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

## robots.txt generation

The generated `robots.txt` always contains:

1. A `User-agent: *` block
2. `Disallow` lines from the `disallow` option (or an empty `Disallow:` if none are configured)
3. A `Sitemap:` line pointing to `{siteUrl}/sitemap.xml`

### Output format, no disallow rules

```
# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
Disallow:

# Sitemap file
Sitemap: https://example.com/sitemap.xml
```

### Output format, with disallow rules

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

## siteUrl validation

The plugin validates `siteUrl` at startup. If it is missing or does not start with `http://` or `https://`, an error is thrown immediately:

```
Error: [vite-plugin-seo-files] You must provide a valid siteUrl.
```

Trailing slashes in `siteUrl` are stripped automatically before use.

# Options

All options are passed to the plugin function. Only `siteUrl` is required.

```ts
interface SeoFilesPluginOptions {
  siteUrl: string;
  generateSitemap?: boolean;
  generateRobots?: boolean;
  exclude?: string[];
  additionalUrls?: string[];
  disallow?: string[];
  routesFile?: string;
}
```

---

## `siteUrl`

**Type:** `string`, **Required**

The base URL of the site. Used as the prefix for all sitemap URLs and as the base for the `Sitemap:` line in `robots.txt`.

- Must start with `http://` or `https://`.
- Trailing slashes are stripped automatically.
- An invalid or missing `siteUrl` throws an error immediately at build time.

```js
seoFiles({ siteUrl: 'https://example.com' })
```

---

## `generateSitemap`

**Type:** `boolean`, **Default:** `true`

Whether to generate `sitemap.xml`. Set to `false` to skip sitemap generation entirely.

```js
seoFiles({ siteUrl: 'https://example.com', generateSitemap: false })
```

---

## `generateRobots`

**Type:** `boolean`, **Default:** `true`

Whether to generate `robots.txt`. Set to `false` to skip robots.txt generation entirely.

```js
seoFiles({ siteUrl: 'https://example.com', generateRobots: false })
```

---

## `routesFile`

**Type:** `string`, **Default:** `'src/routes-list.js'`

Path to a JS file that exports an array of route strings, used for SPA projects. Resolved from `process.cwd()`.

If the file exists, it takes priority over HTML file scanning. If it does not exist, the plugin silently falls back to scanning `**/*.html` in the output directory.

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'config/routes.js',
})
```

The file must be a native ES module with a default export:

```js
// config/routes.js
export default ['/', '/about', '/contact'];
```

---

## `exclude`

**Type:** `string[]`, **Default:** `[]`

Glob patterns for HTML files to exclude from the sitemap scan. Only applies when using HTML file scanning mode (no routes file). `404.html` and `403.html` are always excluded regardless of this option.

```js
seoFiles({
  siteUrl: 'https://example.com',
  exclude: ['admin/**', 'preview/**', 'draft-*.html'],
})
```

---

## `additionalUrls`

**Type:** `string[]`, **Default:** `[]`

Additional URL paths to include in the sitemap, appended after the routes file or HTML scan results. Each value must start with `/`.

- Priority: `0.50`
- `<lastmod>`: today's date

Duplicates are silently ignored, if a URL from this list already exists in the sitemap, it is not added again.

```js
seoFiles({
  siteUrl: 'https://example.com',
  additionalUrls: ['/blog', '/contact', '/sitemap'],
})
```

---

## `disallow`

**Type:** `string[]`, **Default:** `[]`

Paths to add as `Disallow` lines in `robots.txt`. These tell crawlers not to index the specified paths.

If empty, a single `Disallow:` line (allowing all) is written instead.

```js
seoFiles({
  siteUrl: 'https://example.com',
  disallow: ['/admin/', '/api/', '/private/'],
})
```

Generates:

```
Disallow: /admin/
Disallow: /api/
Disallow: /private/
```

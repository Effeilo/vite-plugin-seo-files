# SPA routes

For single-page applications (React, Vue, Angular, etc.), the built output typically contains only one `index.html`. HTML file scanning would produce a sitemap with a single URL. The plugin solves this by accepting an explicit list of routes.

---

## How it works

If a routes file exists at the configured path (default: `src/routes-list.js`), the plugin imports it dynamically and uses its exported array of strings as the URL list. HTML file scanning is skipped entirely.

---

## Creating the routes file

```js
// src/routes-list.js
export default [
  '/',
  '/about',
  '/blog',
  '/blog/my-first-post',
  '/contact',
];
```

Requirements:
- **Default export**, the plugin reads `routesModule.default`.
- **Array of strings**, each string is a path starting with `/`.
- **ES module format**, the file is imported with dynamic `import()`.

---

## Configuring the routes file path

By default, the plugin looks for `src/routes-list.js`. Use `routesFile` to configure a different path:

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'config/routes.js',
})
```

The path is resolved from the current working directory (`process.cwd()`).

---

## Priority rules

| Route | Priority |
|---|---|
| `/` | `1.00` |
| All other routes | `0.50` |

All SPA routes use today's date as `<lastmod>` (ISO format, date only).

---

## Combining with `additionalUrls`

Routes from the file and `additionalUrls` are merged, with deduplication:

```js
// src/routes-list.js
export default ['/', '/about', '/blog'];
```

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'src/routes-list.js',
  additionalUrls: ['/blog', '/special-page'],  // '/blog' is already in the routes file
})
```

The resulting sitemap contains `/`, `/about`, `/blog`, `/special-page`, no duplicates.

---

## Fallback to HTML scanning

If the routes file does not exist at the configured path, the plugin falls back to scanning `**/*.html` in the output directory. No error is thrown, the fallback is silent.

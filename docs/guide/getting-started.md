# Getting started

## Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

---

## Minimal configuration

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

`siteUrl` is the only required option. After `vite build`, both `sitemap.xml` and `robots.txt` are written to the output directory.

---

## TypeScript config

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

Type declarations are bundled, no separate `@types` package needed.

---

## Full configuration example

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

## Disabling individual files

```js
// Generate only robots.txt
seoFiles({
  siteUrl: 'https://example.com',
  generateSitemap: false,
})

// Generate only sitemap.xml
seoFiles({
  siteUrl: 'https://example.com',
  generateRobots: false,
})
```

---

## Running the build

```bash
vite build
```

The plugin logs its output to the terminal:

```
----------------------------------------
🔍  BrowserUX SEO Files
----------------------------------------
✅ sitemap.xml generated
✅ robots.txt generated
```

**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-files.png" alt="logo vite-plugin-seo-files"/>
</div>

# vite-plugin-seo-files

**`vite-plugin-seo-files`** is a Vite plugin that automates the generation of essential technical SEO files (`sitemap.xml`, `robots.txt`) **after the build**. It supports both ESM and CommonJS through dual exports.

It integrates easily into your Vite configuration and works with all frameworks (static HTML, React, Vue, Svelte…).

> A practical way to improve indexing and crawling for your static sites or SPAs.

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B%20%7C%206%2B-646CFF.svg?logo=vite&logoColor=white)


## 🚀 Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

## ⚙️ Usage

Add the plugin in your `vite.config.js` or `vite.config.mjs` file:

```js
import { defineConfig } from 'vite';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
    plugins: [
        seoFiles({
            siteUrl: 'https://example.com', // ✅ Required: base URL of your site
            generateSitemap: true,          // Optional: generate sitemap.xml (default: true)
            generateRobots: true,           // Optional: generate robots.txt (default: true)
            exclude: ['test.html', 'drafts/**'], // Optional: glob patterns to exclude from sitemap
            additionalUrls: ['/external-page', '/api/landing'], // Optional: extra URLs to manually include in sitemap
            disallow: ['/private/', '/secret.html'] // Optional: paths to disallow in robots.txt
        })
    ]
});
```

### SPA Use Case (React, Vue, etc.)

For Single Page Application projects, you can add a `routes-list.js` file inside the `src/` directory.  
If this file is detected (`src/routes-list.js`), it will automatically be used to generate the sitemap based on the declared routes.  
Otherwise, the plugin will fall back to scanning `.html` files in the `dist/` directory.

**Example file** `routes-list.js`:

```js
export default [
    '/',
    '/about'
];
```

## 🧾 Generated Files

After `vite build`, the plugin automatically writes to `dist/`:

| File          | Description                                        |
|---------------|----------------------------------------------------|
| `sitemap.xml` | List of HTML pages with `lastmod`, `priority`     |
| `robots.txt`  | Access rules for search engine crawlers            |

## 🔧 Available Options

| Option            | Type       | Default   | Description                                                      |
|-------------------|------------|-----------|------------------------------------------------------------------|
| `siteUrl`         | `string`   | -         | Base site URL used in `sitemap.xml` and `robots.txt`             |
| `generateSitemap` | `boolean`  | `true`    | Enable/disable sitemap generation                                |
| `generateRobots`  | `boolean`  | `true`    | Enable/disable robots.txt generation                             |
| `exclude`         | `string[]` | `[]`      | List of glob patterns to exclude from the sitemap                |
| `additionalUrls`  | `string[]` | `[]`      | Custom URLs to manually include in the `sitemap.xml`             |
| `disallow`        | `string[]` | `[]`      | List of paths to disallow in robots.txt                          |

## ✨ Included Features

- Compatible with all Vite projects (SPA, MPA, static)
- Extracts real `lastmod` modification dates from `.html` files
- Automatic use of `src/routes-list.js` if present (for SPAs)
- Added custom URLs with additionalUrls
- Custom exclusion via `exclude`
- robots.txt disallow rules via `disallow`

## 📁 Examples

### Structure

```bash
dist/
├── index.html
├── about/
├   └── index.html
├── offline.html
├── sitemap.xml # generated automatically
└── robots.txt # generated automatically
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

## 📌 Best Practices

- The `siteUrl` field must be an absolute URL (starting with `https://`)
- The plugin only runs during `vite build`, not during development
- Use `exclude` to ignore draft or error pages from the sitemap
- Use `disallow` to prevent indexing of specific paths in robots.txt

## 🧑‍💻 TypeScript & ESM Support

As of version **2.0.0**, the plugin is now fully written in **TypeScript** and published as native **ESM** (`"type": "module"` in `package.json`).

If you're using `vite.config.ts`, you can now benefit from full typings automatically:

```ts
import seoFiles from 'vite-plugin-seo-files';

seoFiles({
  siteUrl: 'https://example.com'
});
```

## ⚖️ License

MIT © 2025 [Effeilo](https://github.com/Effeilo)
**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-pages.png" alt="logo vite-plugin-seo-pages"/>
</div>

# vite-plugin-seo-files

**`vite-plugin-seo-files`** is a Vite plugin that automates the generation of essential technical SEO files (`sitemap.xml`, `robots.txt`) **after the build**. It supports both ESM and CommonJS through dual exports.

It integrates easily into your Vite configuration without any `.env` dependency and works with all frameworks (static HTML, React, Vue, Svelte…).

> A practical way to improve indexing and crawling for your static sites or SPAs.

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B-646CFF.svg?logo=vite&logoColor=white)


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
            siteUrl: 'https://example.com', // ✅ Required
            generateSitemap: true, // optional, default: true
            generateRobots: true, // optional, default: true
            exclude: ['test.html', 'drafts/**'] // optional, glob patterns
        })
    ]
});
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

## ✨ Included Features

- Extracts real `lastmod` modification dates from `.html` files
- Compatible with all Vite projects (SPA, MPA, static)
- Custom exclusion via `exclude`
- No need for `.env` configuration

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

User-agent: *
Disallow:

Sitemap: https://browserux.com/sitemap.xml
```

## 📌 Best Practices

- The `siteUrl` field must be an absolute URL (starting with `https://`)
- The plugin only runs during `vite build`, not during development
- Use `exclude` to ignore draft or error pages from the sitemap

## ⚖️ License

MIT © 2025 [Effeilo](https://github.com/Effeilo)
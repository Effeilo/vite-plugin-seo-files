**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-seo-files-300.png" alt="logo vite-plugin-seo-files"/>
</div>

# BrowserUX SEO Files

**A simple and automated solution to generate SEO technical files (sitemap.xml, robots.txt) in all your Vite projects.**

BrowserUX SEO Files is a lightweight and configurable Vite plugin that integrates seamlessly into your build process. It automatically generates the essential files for search engine indexing and crawling after each build. Compatible with both static sites and SPAs, it supports custom routes, targeted exclusions, and robot access rules, all with zero manual setup.

- [Project website](https://browserux.com/seo-files/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

[![npm version](https://img.shields.io/npm/v/vite-plugin-seo-files.svg)](https://www.npmjs.com/package/vite-plugin-seo-files)
![vite compatibility](https://img.shields.io/badge/Vite-4%2B%20%7C%205%2B%20%7C%206%2B-646CFF.svg?logo=vite&logoColor=white)

## Features

- 🗺 Generates `sitemap.xml` with `<loc>`, `<lastmod>`, and `<priority>`
- 🤖 Generates `robots.txt` with `User-agent`, `Disallow`, and `Sitemap`
- 🔍 Two URL discovery modes: HTML file scan (static) or routes list file (SPA)
- 🔁 URL deduplication, no duplicate entries when combining sources
- 🚫 Glob-based file exclusion via `exclude`
- ➕ Extra URLs via `additionalUrls`
- 🔒 Configurable `Disallow` paths for `robots.txt`
- 📂 Output directory read from Vite's `build.outDir`, no hardcoded paths
- 🔧 Disable sitemap or robots independently
- 📦 Native ESM, TypeScript, bundled type declarations

## Installation

```bash
npm install vite-plugin-seo-files --save-dev
```

## Usage

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

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `siteUrl` | `string` | — |   **Required.** Base URL of the site, must start with `http://` or `https://` |
| `generateSitemap` | `boolean` | `true` | Generate `sitemap.xml` |
| `generateRobots` | `boolean` | `true` | Generate `robots.txt` |
| `routesFile` | `string` | `'src/routes-list.js'` | Path to a JS file exporting an array of route strings (SPA mode) |
| `exclude` | `string[]` | `[]` | Glob patterns to exclude from HTML scan |
| `additionalUrls` | `string[]` | `[]` | Extra URL paths to add to the sitemap |
| `disallow` | `string[]` | `[]` | Paths to add as `Disallow` lines in `robots.txt` |

## SPA routes

For single-page applications, create a routes file:

```js
// src/routes-list.js
export default ['/', '/about', '/blog', '/contact'];
```

The plugin imports it dynamically and uses it instead of scanning HTML files.

## Documentation

For detailed documentation, see [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : what it does, when to use it, features overview
- [Getting started](docs/guide/getting-started.md) : installation and configuration
- [How it works](docs/guide/how-it-works.md) : sitemap generation, robots.txt, URL deduplication
- [SPA routes](docs/guide/spa-routes.md) : using a `routes-list.js` file for SPAs

### Reference

- [Options](docs/reference/options.md) : all options with types, defaults, and examples
- [Hooks](docs/reference/hooks.md) : `configResolved` and `closeBundle` hooks
- [Output](docs/reference/output.md) : format of generated `sitemap.xml` and `robots.txt`

### Additional reference

- [Compatibility](docs/compatibility.md) : Node.js, Vite versions, module format, dependencies
- [Contributing](docs/contributing.md) : report a bug, suggest an improvement, submit a PR

## License

MIT © 2026 [Effeilo](https://github.com/Effeilo)

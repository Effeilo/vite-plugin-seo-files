# vite-plugin-seo-files

`vite-plugin-seo-files` is a Vite plugin that automatically generates `sitemap.xml` and `robots.txt` at the end of every production build. It supports both static sites (HTML file scanning) and SPAs (route list file), with URL deduplication, exclusion patterns, and configurable disallow rules.

---

## Documentation

### Guide

- [Introduction](guide/introduction.md), what the plugin does, when to use it, features overview
- [Getting started](guide/getting-started.md), installation and minimal configuration
- [How it works](guide/how-it-works.md), sitemap generation, robots.txt generation, URL deduplication
- [SPA routes](guide/spa-routes.md), using a `routes-list.js` file for single-page applications

### Reference

- [Options](reference/options.md), all plugin options with types and defaults
- [Hooks](reference/hooks.md), Vite lifecycle hooks used by the plugin
- [Output](reference/output.md), format of generated `sitemap.xml` and `robots.txt`

### Other

- [Compatibility](compatibility.md), Node.js, Vite version, and dependency matrix
- [Contributing](contributing.md), how to report issues and submit pull requests
- [Changelog](../CHANGELOG.md)

---

## Quick example

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

After `vite build`, `sitemap.xml` and `robots.txt` are written to the output directory.

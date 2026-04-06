# Compatibility

---

## Environment requirements

| Environment | Minimum version | Reason |
|---|---|---|
| Node.js | 18+ | Native ESM dynamic `import()`, `fs`, `path`, `url` |
| Vite | 4+ | Plugin API (`configResolved`, `closeBundle`) |

---

## Vite compatibility

| Vite version | Status |
|---|---|
| Vite 4.x | Supported |
| Vite 5.x | Supported |
| Vite 6.x | Supported |

The plugin uses the standard Vite plugin API and does not rely on any version-specific internals.

---

## Framework compatibility

`vite-plugin-seo-files` works with any project built with Vite, regardless of the frontend framework.

| Framework / Setup | Status | Notes |
|---|---|---|
| Vanilla HTML | Supported | Uses HTML file scanning mode |
| React (Vite) | Supported | Use `routesFile` for SPA routes |
| Vue 3 (Vite) | Supported | Use `routesFile` for SPA routes |
| Svelte (Vite) | Supported | Use `routesFile` for SPA routes |
| SvelteKit | Not applicable | SvelteKit has its own build output format |
| Nuxt | Not applicable | Nuxt has its own sitemap solution |
| Astro | Compatible | HTML scan mode works with static output |

---

## Module format

Since v2.0.0, the plugin is **native ESM only**. There is no CommonJS build.

| Import style | Status |
|---|---|
| `import seoFiles from 'vite-plugin-seo-files'` | Supported |
| `const seoFiles = require('vite-plugin-seo-files')` | Not supported |

Your `vite.config.js` or `vite.config.ts` must use ESM syntax (`import`). If your project uses `"type": "module"` in `package.json` or `.mjs` config files, this is already the case.

---

## Dependencies

| Package | Type | Role |
|---|---|---|
| [glob](https://www.npmjs.com/package/glob) | Runtime | Scanning `**/*.html` files in the output directory |
| [vite](https://vite.dev/) | Peer | Plugin API types and build lifecycle |
| [typescript](https://www.typescriptlang.org/) | Dev | Compiler |
| [@types/node](https://www.npmjs.com/package/@types/node) | Dev | Node.js type declarations |

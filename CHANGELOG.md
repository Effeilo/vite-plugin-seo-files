**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-seo-files-300.png" alt="logo vite-plugin-seo-files"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com)
and this project adheres to [Semantic Versioning](https://semver.org).

---

<br>

## [2.1.1] – 2026-04-01

### 🛠️ Fixed

- Re-published with correct `dist/` build output (2.1.0 was accidentally published without a fresh build)

<br>

---

<br>

## [2.1.0] – 2026-03-29

### ✨ Added

- New `routesFile` option to configure the path to the SPA routes file (default: `'src/routes-list.js'`)
- Automatic URL deduplication in `sitemap.xml`, prevents duplicate entries when combining `additionalUrls` with routes or scanned files

### 🐛 Fixed

- Output directory is now read from Vite's `build.outDir` config via `configResolved` hook, no longer hardcoded to `dist/`

### 📘 Updated

- README: removed incorrect "No external dependencies" claim
- README: corrected module format description (native ESM only since v2.0.0, no CJS)
- README: updated Vite badge to include Vite 6+
- README: documented new `routesFile` option

<br>

---

<br>

## [2.0.0] – 2025-07-04

### ✨ Changed

- Fully migrated codebase to **TypeScript** and **native ESM** (`"type": "module"`)
- Plugin typings are now bundled (`index.d.ts`) for usage in `vite.config.ts`
- Updated tsconfig and packaging for Vite 6+ compatibility

<br>

---

<br>


## [1.3.2] – 2025-06-09

### ✅ Updated

- Declared compatibility with Vite 6 (`vite@^6.0.0`) in `peerDependencies`

<br>

---

<br>

## [1.3.1] – 2025-06-08

### ✨ Added

- Added custom URLs via `additionalUrls` in the sitemap
- Updated documentation and usage examples

<br>

---

<br>

## [1.2.1] – 2025-06-08

### 🐛 Fixed

- Fixed dynamic import of `routes-list.js` using `import()` in ESM

<br>

---

<br>

## [1.2.0] – 2025-06-08

### ✨ Added

- Automatic detection of a `src/routes-list.js` file for SPA projects (React, Vue, etc.)
- Uses the listed routes to generate `sitemap.xml` if the file is present
- Falls back to standard HTML file scanning if not found
- Documentation updated with a `routes-list.js` example

<br>

---

<br>

## [1.1.0] – 2025-06-07

### ✨ Added

- `disallow` option to specify paths excluded from robots.txt
- Documentation and usage examples for the new `disallow` option
- Example output showing Disallow directives in `robots.txt`

<br>

---

<br>

## [1.0.0] – 2025-06-07

### ✨ Added

- Initial release of `vite-plugin-seo-files`
- Generates `sitemap.xml` and `robots.txt` after Vite build
- Supports ESM and CommonJS via dual exports
- Supports glob-based exclusion (`exclude` option)

<br>

### 📘 Presentation

- Clear overview of project goals, installation methods and file structure
  - `README.md` (English)
  - `fr/README.md` (French)
  
<br>

---
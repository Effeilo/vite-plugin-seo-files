**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-files.png" alt="logo vite-plugin-seo-files"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com)
and this project adheres to [Semantic Versioning](https://semver.org).

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
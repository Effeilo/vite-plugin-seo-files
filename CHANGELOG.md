**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-pages.png" alt="logo vite-plugin-seo-pages"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com)
and this project adheres to [Semantic Versioning](https://semver.org).

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
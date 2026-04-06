# Introduction

## What it does

`vite-plugin-seo-files` is a Vite plugin that runs after every production build and writes two files to the output directory:

- **`sitemap.xml`**, an XML sitemap listing all public URLs of the site, with `<lastmod>` and `<priority>` fields.
- **`robots.txt`**, a standard robots file pointing crawlers to the sitemap and optionally restricting access to specific paths.

Both files are generated in the `closeBundle` hook, after Vite has finished writing all build output. The output directory is read from Vite's own `build.outDir` configuration.

---

## When to use it

- You want `sitemap.xml` and `robots.txt` generated automatically on every build without a manual step.
- You have a static site and want URLs discovered from built HTML files.
- You have a SPA (React, Vue, etc.) and want to list routes explicitly via a `routes-list.js` file.
- You want to block specific paths from crawlers via `Disallow` rules.

---

## What it does not do

- It does not submit the sitemap to search engines, do that manually or via a separate tool.
- It does not generate `<image:image>` or `<video:video>` sitemap extensions.
- It does not watch for file changes in dev mode, it only runs during `vite build`.
- It does not generate dynamic per-page `<lastmod>` values for SPA routes (today's date is used).

---

## Features

- Generates `sitemap.xml` with `<loc>`, `<lastmod>`, and `<priority>`
- Generates `robots.txt` with `User-agent`, `Disallow`, and `Sitemap`
- Two URL discovery modes: HTML file scan (static) or routes file (SPA)
- Configurable routes file path via `routesFile`
- URL deduplication, no duplicate entries when combining `additionalUrls` with routes or scanned files
- Glob-based exclusion patterns via `exclude`
- Additional URLs via `additionalUrls`
- Configurable disallow paths via `disallow`
- Individual generation control, disable sitemap or robots independently
- Output directory read from Vite's `build.outDir`, no hardcoded paths
- Native ESM, TypeScript, bundled type declarations
- One runtime dependency: `glob`

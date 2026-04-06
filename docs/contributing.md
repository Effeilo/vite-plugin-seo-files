# Contributing

Contributions are welcome. Whether you want to report a bug, suggest an improvement, or submit a pull request, feel free to participate.

---

## Reporting an issue

Open an issue on the GitHub repository to:

- Report a bug or unexpected behavior.
- Suggest an improvement or new feature.
- Discuss an idea before submitting a pull request.

When reporting a bug, include:

- Your Node.js version (`node -v`)
- Your Vite version (`vite --version`)
- Your `vite-plugin-seo-files` version
- Your plugin configuration (options object)
- Whether you are using a routes file or HTML scan mode
- The error message and terminal output if applicable
- A minimal reproduction (`vite.config.js` + project structure)

---

## Submitting a pull request

1. Fork the repository.
2. Create a dedicated branch:

```bash
git checkout -b my-change
```

3. Make your changes.
4. Build the plugin to verify output:

```bash
npm run build
```

5. Commit with a clear message:

```bash
git commit -m "Fix: description of the change"
```

6. Push the branch and open a pull request on GitHub.

---

## Running locally

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch mode
npm run dev
```

---

## Good practices

- Stay within the focused scope of the plugin: generating `sitemap.xml` and `robots.txt` after Vite builds.
- Only change what is necessary. Targeted changes are easier to review.
- Verify that both HTML scan mode and routes file mode work after any change to URL discovery logic.
- Verify that URL deduplication still works when combining `routesFile`, `additionalUrls`, and `exclude`.
- Confirm that `configResolved` correctly reads `build.outDir` for non-default output directories.
- Confirm that `siteUrl` validation throws an appropriate error for missing or malformed values.
- Consult the [changelog](../CHANGELOG.md) to understand the history of past decisions.

---

## Project structure

```
├── dist/
│   ├── index.js            compiled ESM output
│   └── index.d.ts          bundled TypeScript declarations
├── src/
│   └── index.ts            plugin source, all logic in a single file
├── docs/                   English documentation
├── fr/docs/                French documentation
├── tsconfig.json
└── package.json
```

---

## Acknowledgements

`vite-plugin-seo-files` is built with:

- [TypeScript](https://www.typescriptlang.org/), typed language and compiler
- [Vite](https://vite.dev/), build tool and plugin API
- [glob](https://www.npmjs.com/package/glob), HTML file pattern matching

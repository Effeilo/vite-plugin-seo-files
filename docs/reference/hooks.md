# Hooks

`vite-plugin-seo-files` uses two Vite plugin hooks.

---

## `configResolved`

**Vite hook:** [`configResolved`](https://vite.dev/guide/api-plugin.html#configresolved)

Called after Vite has resolved its final configuration. The plugin reads `config.build.outDir` (resolved against `config.root`) and stores it for use in `closeBundle`.

```ts
configResolved(config: ResolvedConfig) {
  outDir = path.resolve(config.root, config.build.outDir);
}
```

This ensures the output directory is always correct regardless of what `build.outDir` is set to in the Vite config, it is never hardcoded to `dist/`.

---

## `closeBundle`

**Vite hook:** [`closeBundle`](https://vite.dev/guide/api-plugin.html#closebundle)

Called after Vite has finished writing all build output to disk. This is where `sitemap.xml` and `robots.txt` are generated.

Execution order:

1. Resolve the output directory (`outDir` from `configResolved`, or `process.cwd()/dist` as fallback).
2. Ensure the output directory exists (creates it recursively if needed).
3. If `generateSitemap` is `true`: discover URLs and write `sitemap.xml`.
4. If `generateRobots` is `true`: write `robots.txt`.

The hook is `async` to support dynamic `import()` of the routes file.

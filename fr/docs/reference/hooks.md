# Hooks

`vite-plugin-seo-files` utilise deux hooks du plugin Vite.

---

## `configResolved`

**Hook Vite :** [`configResolved`](https://vite.dev/guide/api-plugin.html#configresolved)

Appelé après que Vite a résolu sa configuration finale. Le plugin lit `config.build.outDir` (résolu par rapport à `config.root`) et le stocke pour utilisation dans `closeBundle`.

```ts
configResolved(config: ResolvedConfig) {
  outDir = path.resolve(config.root, config.build.outDir);
}
```

Cela garantit que le répertoire de sortie est toujours correct quel que soit le `build.outDir` défini dans la config Vite, il n'est jamais codé en dur à `dist/`.

---

## `closeBundle`

**Hook Vite :** [`closeBundle`](https://vite.dev/guide/api-plugin.html#closebundle)

Appelé après que Vite a terminé d'écrire tous les fichiers de build sur le disque. C'est là que `sitemap.xml` et `robots.txt` sont générés.

Ordre d'exécution :

1. Résoudre le répertoire de sortie (`outDir` depuis `configResolved`, ou `process.cwd()/dist` comme fallback).
2. S'assurer que le répertoire de sortie existe (le crée récursivement si nécessaire).
3. Si `generateSitemap` est `true` : découvrir les URLs et écrire `sitemap.xml`.
4. Si `generateRobots` est `true` : écrire `robots.txt`.

Le hook est `async` pour supporter l'`import()` dynamique du fichier de routes.

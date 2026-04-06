# Options

Toutes les options sont passées à la fonction du plugin. Seule `siteUrl` est requise.

```ts
interface SeoFilesPluginOptions {
  siteUrl: string;
  generateSitemap?: boolean;
  generateRobots?: boolean;
  exclude?: string[];
  additionalUrls?: string[];
  disallow?: string[];
  routesFile?: string;
}
```

---

## `siteUrl`

**Type :** `string`, **Requis**

L'URL de base du site. Utilisée comme préfixe pour toutes les URLs du sitemap et comme base pour la ligne `Sitemap:` dans `robots.txt`.

- Doit commencer par `http://` ou `https://`.
- Les barres obliques de fin sont supprimées automatiquement.
- Une `siteUrl` invalide ou absente lève une erreur immédiatement au moment du build.

```js
seoFiles({ siteUrl: 'https://example.com' })
```

---

## `generateSitemap`

**Type :** `boolean`, **Défaut :** `true`

Si `false`, la génération de `sitemap.xml` est entièrement ignorée.

```js
seoFiles({ siteUrl: 'https://example.com', generateSitemap: false })
```

---

## `generateRobots`

**Type :** `boolean`, **Défaut :** `true`

Si `false`, la génération de `robots.txt` est entièrement ignorée.

```js
seoFiles({ siteUrl: 'https://example.com', generateRobots: false })
```

---

## `routesFile`

**Type :** `string`, **Défaut :** `'src/routes-list.js'`

Chemin vers un fichier JS qui exporte un tableau de chaînes de routes, utilisé pour les projets SPA. Résolu depuis `process.cwd()`.

Si le fichier existe, il a la priorité sur le scan des fichiers HTML. S'il n'existe pas, le plugin bascule silencieusement vers le scan de `**/*.html` dans le répertoire de sortie.

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'config/routes.js',
})
```

Le fichier doit être un module ES natif avec un export par défaut :

```js
// config/routes.js
export default ['/', '/about', '/contact'];
```

---

## `exclude`

**Type :** `string[]`, **Défaut :** `[]`

Patterns glob pour exclure des fichiers HTML du scan du sitemap. S'applique uniquement en mode scan des fichiers HTML (pas de fichier de routes). `404.html` et `403.html` sont toujours exclus quelle que soit cette option.

```js
seoFiles({
  siteUrl: 'https://example.com',
  exclude: ['admin/**', 'preview/**', 'draft-*.html'],
})
```

---

## `additionalUrls`

**Type :** `string[]`, **Défaut :** `[]`

Chemins d'URLs supplémentaires à inclure dans le sitemap, ajoutés après les résultats du fichier de routes ou du scan HTML. Chaque valeur doit commencer par `/`.

- Priorité : `0.50`
- `<lastmod>` : date du jour

Les doublons sont silencieusement ignorés, si une URL de cette liste existe déjà dans le sitemap, elle n'est pas ajoutée à nouveau.

```js
seoFiles({
  siteUrl: 'https://example.com',
  additionalUrls: ['/blog', '/contact', '/sitemap'],
})
```

---

## `disallow`

**Type :** `string[]`, **Défaut :** `[]`

Chemins à ajouter comme lignes `Disallow` dans `robots.txt`. Ces lignes indiquent aux crawlers de ne pas indexer les chemins spécifiés.

Si vide, une seule ligne `Disallow:` (autorisant tout) est écrite à la place.

```js
seoFiles({
  siteUrl: 'https://example.com',
  disallow: ['/admin/', '/api/', '/private/'],
})
```

Génère :

```
Disallow: /admin/
Disallow: /api/
Disallow: /private/
```

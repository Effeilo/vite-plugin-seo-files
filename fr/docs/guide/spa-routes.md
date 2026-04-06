# Routes SPA

Pour les applications single-page (React, Vue, Angular, etc.), le build généré ne contient généralement qu'un seul `index.html`. Le scan des fichiers HTML produirait un sitemap avec une seule URL. Le plugin résout ce problème en acceptant une liste explicite de routes.

---

## Fonctionnement

Si un fichier de routes existe au chemin configuré (défaut : `src/routes-list.js`), le plugin l'importe dynamiquement et utilise son tableau de chaînes exporté comme liste d'URLs. Le scan des fichiers HTML est entièrement ignoré.

---

## Créer le fichier de routes

```js
// src/routes-list.js
export default [
  '/',
  '/about',
  '/blog',
  '/blog/mon-premier-article',
  '/contact',
];
```

Prérequis :
- **Export par défaut**, le plugin lit `routesModule.default`.
- **Tableau de chaînes**, chaque chaîne est un chemin commençant par `/`.
- **Format ES module**, le fichier est importé avec `import()` dynamique.

---

## Configurer le chemin du fichier de routes

Par défaut, le plugin cherche `src/routes-list.js`. Utilisez `routesFile` pour configurer un chemin différent :

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'config/routes.js',
})
```

Le chemin est résolu depuis le répertoire de travail courant (`process.cwd()`).

---

## Règles de priorité

| Route | Priorité |
|---|---|
| `/` | `1.00` |
| Toutes les autres routes | `0.50` |

Toutes les routes SPA utilisent la date du jour comme `<lastmod>` (format ISO, date uniquement).

---

## Combinaison avec `additionalUrls`

Les routes du fichier et `additionalUrls` sont fusionnées, avec déduplication :

```js
// src/routes-list.js
export default ['/', '/about', '/blog'];
```

```js
seoFiles({
  siteUrl: 'https://example.com',
  routesFile: 'src/routes-list.js',
  additionalUrls: ['/blog', '/page-speciale'],  // '/blog' est déjà dans le fichier de routes
})
```

Le sitemap résultant contient `/`, `/about`, `/blog`, `/page-speciale`, sans doublons.

---

## Fallback vers le scan HTML

Si le fichier de routes n'existe pas au chemin configuré, le plugin bascule silencieusement vers le scan de `**/*.html` dans le répertoire de sortie. Aucune erreur n'est levée, le fallback est silencieux.

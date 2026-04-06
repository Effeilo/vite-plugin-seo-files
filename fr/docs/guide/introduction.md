# Introduction

## Ce que fait le plugin

`vite-plugin-seo-files` est un plugin Vite qui s'exécute après chaque build de production et écrit deux fichiers dans le répertoire de sortie :

- **`sitemap.xml`**, un sitemap XML listant toutes les URLs publiques du site, avec les champs `<lastmod>` et `<priority>`.
- **`robots.txt`**, un fichier robots standard pointant les crawlers vers le sitemap et restreignant optionnellement l'accès à certains chemins.

Les deux fichiers sont générés dans le hook `closeBundle`, après que Vite a terminé d'écrire tous les fichiers de build. Le répertoire de sortie est lu depuis la propre configuration `build.outDir` de Vite.

---

## Quand l'utiliser

- Vous souhaitez générer `sitemap.xml` et `robots.txt` automatiquement à chaque build sans étape manuelle.
- Vous avez un site statique et voulez que les URLs soient découvertes depuis les fichiers HTML générés.
- Vous avez une SPA (React, Vue, etc.) et souhaitez lister les routes explicitement via un fichier `routes-list.js`.
- Vous souhaitez bloquer certains chemins pour les crawlers via des règles `Disallow`.

---

## Ce qu'il ne fait pas

- Il ne soumet pas le sitemap aux moteurs de recherche, faites-le manuellement ou via un outil séparé.
- Il ne génère pas les extensions de sitemap `<image:image>` ou `<video:video>`.
- Il ne surveille pas les changements de fichiers en mode dev, il s'exécute uniquement lors de `vite build`.
- Il ne génère pas de valeurs `<lastmod>` dynamiques par page pour les routes SPA (la date du jour est utilisée).

---

## Fonctionnalités

- Génère `sitemap.xml` avec `<loc>`, `<lastmod>` et `<priority>`
- Génère `robots.txt` avec `User-agent`, `Disallow` et `Sitemap`
- Deux modes de découverte des URLs : scan des fichiers HTML (statique) ou fichier de routes (SPA)
- Chemin du fichier de routes configurable via `routesFile`
- Déduplication des URLs, pas d'entrées dupliquées en combinant `additionalUrls` avec les routes ou les fichiers scannés
- Patterns d'exclusion glob via `exclude`
- URLs supplémentaires via `additionalUrls`
- Chemins Disallow configurables via `disallow`
- Contrôle individuel de la génération, désactiver le sitemap ou le robots indépendamment
- Répertoire de sortie lu depuis `build.outDir` de Vite, aucun chemin codé en dur
- ESM natif, TypeScript, déclarations de types incluses
- Une seule dépendance à l'exécution : `glob`

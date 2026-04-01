[EN](../CHANGELOG.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-seo-files-300.png" alt="logo vite-plugin-seo-files"/>
</div>

# 📦 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)  
et ce projet suit les recommandations de versionnage [SemVer](https://semver.org/lang/fr/).

---

<br>

## [2.1.0] – 29-03-2026

### ✨ Ajout

- Nouvelle option `routesFile` pour configurer le chemin vers le fichier de routes SPA (défaut : `'src/routes-list.js'`)
- Déduplication automatique des URLs dans le `sitemap.xml` — évite les entrées en double lors de la combinaison d'`additionalUrls` avec les routes ou les fichiers scannés

### 🐛 Correction

- Le répertoire de sortie est désormais lu depuis `build.outDir` dans la config Vite via le hook `configResolved` — plus codé en dur sur `dist/`

### 📘 Mis à jour

- README : suppression de l'affirmation incorrecte "Aucune dépendance externe"
- README : correction de la description du format de module (ESM natif uniquement depuis v2.0.0, pas de CJS)
- README : badge Vite mis à jour pour inclure Vite 6+
- README : documentation de la nouvelle option `routesFile`

<br>

---

<br>

## [2.0.0] – 04-07-2025

### ✨ Modifications

- Migration complète du code vers TypeScript et ESM natif ("type": "module")
- Les types du plugin sont désormais générés (index.d.ts) pour une utilisation directe dans vite.config.ts
- Mise à jour du tsconfig et du système de build pour assurer la compatibilité avec Vite 6+

<br>

---

<br>

## [1.3.2] – 09-06-2025

### ✅ Mis à jour

- Déclaration de compatibilité avec Vite 6 (`vite@^6.0.0`) dans `peerDependencies`

<br>

---

<br>

## [1.3.1] – 08-06-2025

### ✨ Ajout

- Ajout d’URLs personnalisées avec `additionalUrls` dans le sitemap
- Mise à jour de la documentation et des exemples d’utilisation

<br>

---

<br>

## [1.2.1] – 08-06-2025

### 🐛 Correction

- Correction de l'import dynamique de `routes-list.js` via `import()` en ESM

<br>

---

<br>

## [1.2.0] – 08-06-2025

### ✨ Ajout

- Détection automatique d’un fichier `src/routes-list.js` pour les projets SPA (React, Vue, etc.)
- Utilisation des routes listées pour générer le `sitemap.xml` si le fichier est présent
- Fallback sur le scan classique des fichiers HTML sinon
- Documentation mise à jour avec un exemple de `routes-list.js`

<br>

---

<br>

## [1.1.0] – 07-06-2025

### ✨ Ajout

- Option `disallow` permettant de définir des chemins à exclure dans `robots.txt`
- Documentation et exemples d'utilisation de l'option `disallow`
- Exemple de code avec directives Disallow dans `robots.txt`

<br>

---

<br>

## [1.0.0] – 07-06-2025

### ✨ Ajout

- Première version de `vite-plugin-seo-files`
- Génère automatiquement `sitemap.xml` et `robots.txt` après le build Vite
- Compatible ESM et CommonJS via un système d’exports double
- Prend en charge l’exclusion basée sur des motifs glob (`option exclude`)

<br>

### 📘 Présentation

- Présentation claire des objectifs, de l’installation et de la structure des fichiers : 
  - `README.md` (anglais)
  - `fr/README.md` (français)
  
<br>

---
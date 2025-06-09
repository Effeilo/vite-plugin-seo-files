[EN](../CHANGELOG.md) | **FR**

<div>
  <img src="https://browserux.com/assets/img/logo/logo-vite-plugin-seo-pages.png" alt="logo vite-plugin-seo-pages"/>
</div>

# 📦 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)  
et ce projet suit les recommandations de versionnage [SemVer](https://semver.org/lang/fr/).

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
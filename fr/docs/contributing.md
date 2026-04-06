# Contribuer

Les contributions sont les bienvenues. Que vous souhaitiez signaler un bug, suggérer une amélioration ou soumettre une pull request, n'hésitez pas à participer.

---

## Signaler un problème

Ouvrez une issue sur le dépôt GitHub pour :

- Signaler un bug ou un comportement inattendu.
- Suggérer une amélioration ou une nouvelle fonctionnalité.
- Discuter d'une idée avant de soumettre une pull request.

Lors du signalement d'un bug, précisez :

- Votre version de Node.js (`node -v`)
- Votre version de Vite (`vite --version`)
- Votre version de `vite-plugin-seo-files`
- Votre configuration du plugin (objet d'options)
- Si vous utilisez un fichier de routes ou le mode scan HTML
- Le message d'erreur et la sortie terminal si applicable
- Une reproduction minimale (`vite.config.js` + structure du projet)

---

## Soumettre une pull request

1. Forkez le dépôt.
2. Créez une branche dédiée :

```bash
git checkout -b ma-proposition
```

3. Effectuez vos modifications.
4. Compilez le plugin pour vérifier la sortie :

```bash
npm run build
```

5. Committez avec un message clair :

```bash
git commit -m "Fix: description de la modification"
```

6. Poussez la branche et ouvrez une pull request sur GitHub.

---

## Exécuter en local

```bash
# Installer les dépendances
npm install

# Compiler le plugin
npm run build

# Mode watch
npm run dev
```

---

## Bonnes pratiques

- Restez fidèle au périmètre focalisé du plugin : générer `sitemap.xml` et `robots.txt` après les builds Vite.
- Ne modifiez que ce qui est nécessaire. Les changements ciblés sont plus faciles à relire.
- Vérifiez que le mode scan HTML et le mode fichier de routes fonctionnent tous deux après tout changement de la logique de découverte des URLs.
- Vérifiez que la déduplication des URLs fonctionne toujours en combinant `routesFile`, `additionalUrls` et `exclude`.
- Confirmez que `configResolved` lit correctement `build.outDir` pour les répertoires de sortie non standard.
- Confirmez que la validation de `siteUrl` lève une erreur appropriée pour les valeurs absentes ou malformées.
- Consultez le [changelog](../../CHANGELOG.md) pour comprendre l'historique des décisions.

---

## Structure du projet

```
├── dist/
│   ├── index.js            sortie ESM compilée
│   └── index.d.ts          déclarations TypeScript incluses
├── src/
│   └── index.ts            source du plugin, toute la logique dans un seul fichier
├── docs/                   documentation en anglais
├── fr/docs/                documentation en français
├── tsconfig.json
└── package.json
```

---

## Remerciements

`vite-plugin-seo-files` est construit avec :

- [TypeScript](https://www.typescriptlang.org/), langage typé et compilateur
- [Vite](https://vite.dev/), outil de build et API plugin
- [glob](https://www.npmjs.com/package/glob), correspondance de patterns pour les fichiers HTML

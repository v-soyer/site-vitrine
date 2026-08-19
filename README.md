# Portfolio Valentin Soyer

Portfolio construit avec Vinext, Vite et Nitro.

## Prérequis

- Node.js `>=22.13.0`
- npm

## Développement local

```bash
npm install
npm run dev
```

## Build de production

Le build local utilise le preset Node de Nitro et produit `.output/` :

```bash
npm run build
npm start
```

Le build destiné à Vercel utilise son preset et produit la Build Output API
dans `.vercel/output/` :

```bash
NITRO_PRESET=vercel npm run build
```

## Tests

```bash
npm test
npm run test:vercel
npm run lint
```

Le premier test démarre le serveur Nitro local et vérifie la route `/`. Le
second vérifie la configuration Vercel générée et appelle directement sa
fonction Nitro pour cette même route.

## Déploiement Vercel

Connecter directement la branche `main` du dépôt à Vercel avec le preset
**Nitro**. Ne pas définir de réécriture vers `index.html` : le rendu est assuré
par la fonction serveur générée par Nitro.

Le projet n'utilise actuellement aucune variable d'environnement obligatoire.

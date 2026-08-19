# Déployer le portfolio sur Vercel

## Paramètres du projet

- Framework Preset : `Nitro`
- Build Command : ne pas surcharger (`npm run build` est détecté)
- Output Directory : ne pas surcharger (Nitro génère `.vercel/output/`)
- Root Directory : `.`
- Production Branch : `main`

Vercel installe les dépendances depuis `package-lock.json`, détecte son
environnement pendant `vite build`, puis Nitro génère une fonction serveur et
la configuration Build Output API. Aucune GitHub Action ni aucun `vercel.json`
n'est nécessaire.

## Vérification locale

```bash
npm install
npm run build
npm test
NITRO_PRESET=vercel npm run build
node --test tests/vercel-output.test.mjs
```

Le build local standard produit `.output/`. Le preset Vercel produit
`.vercel/output/`, qui est le format natif attendu par Vercel et contient la
route générique vers la fonction Nitro prenant notamment `/` en charge.

## Variables d'environnement

Aucune variable d'environnement n'est nécessaire pour le portfolio actuel.

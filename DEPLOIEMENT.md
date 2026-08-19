# Déployer le portfolio

Cette archive contient le code source complet du portfolio, ses images, le C.V. et ses composants interactifs.

## Prérequis

- Node.js 22.13 ou une version plus récente
- npm
- Un environnement compatible avec Cloudflare Workers

## Installation locale

```bash
npm ci
npm run dev
```

Le serveur de développement affiche ensuite l'adresse locale à ouvrir dans le navigateur.

## Construction de production

```bash
npm run build
```

Le résultat est généré dans `dist/`. L'entrée Worker est `dist/server/index.js` et les ressources publiques compilées sont placées dans le même dossier de sortie.

Le projet utilise Vinext et le runtime Cloudflare Worker : choisissez ce preset sur votre plateforme, ou déployez le contenu de `dist/` avec votre configuration Cloudflare habituelle.

## Configuration

- Aucune variable d'environnement n'est requise actuellement.
- Les fichiers propres à l'hébergement précédent, l'historique Git, les dépendances installées et les builds temporaires ont été exclus.
- Le fichier `.openai/hosting.json` présent dans l'archive est volontairement neutre et ne contient aucun identifiant de projet.

## Fichiers principaux

- `app/page.tsx` : contenu principal du site
- `app/globals.css` : direction artistique et responsive
- `app/HeroEcosystem.tsx` : orbites technologiques
- `app/ProjectsCarousel.tsx` : carrousel des réalisations
- `app/TestimonialsMarquee.tsx` : témoignages défilants
- `app/ContactSwitcher.tsx` : composant de contact animé
- `public/` : images, logos, favicon et C.V.

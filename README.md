# Aftercinema

<p align="center">
<img src="web-app/public/logos/logo500x500px.png" width="250" height="250" />
</p>

Ce dépôt contient le code source du site web vitrine du podcast Aftercinema ([/web-app](/web-app)). Sa _stack_ technique est la suivante : TypeScript, React, NextJS, PostHog.

Il contient également l'API d'Aftercinema, qui sert à rendre accessible en ligne pour le site web les données statistques du podcast ([/api](/api)). Sa _stack_ technique est la suivante : Python, FastAPI.

Pour rendre accessible ces données statistiques, un Notebook Python récupère les données des systèmes sources et les stocke dans une base de données PostgreSQL ([/get-stats-data](/get-stats-data)).

## api

### local

#### MACOS

```
cd api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export POSTGRESQL_CONN_STRING=XXX
uvicorn main:app --reload
```

#### WINDOWS

```
cd api
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r requirements.txt
$Env:POSTGRESQL_CONN_STRING = 'XXX'
uvicorn main:app --reload
```

Où _XXX_ est la chaîne de connexion à la base PostgreSQL [disponible ici](https://www.notion.so/gas-perso/projets-ecd7b57cf1f14923905b834e808d904a?pvs=4#c75f80609d4049da8dae52568b578191).

Ajoutez l. 27 de `web-app/app/stats/page.tsx` :

```js
const res = await fetch("http://127.0.0.1:8000/get-stats-data");
```

### prod

Publié à [api.aftercinema.fr](https://api.aftercinema.fr) automatiquement via la Github Action [deploy-api-to-vps.yml](/.github/workflows/deploy-api-to-vps).

## web-app

### local

```
cd web-app
npm install
npm run dev
```

La console affiche une erreur relative à PostHog, car les variables d'environnements _NEXT_PUBLIC_POSTHOG_HOST_ et _NEXT_PUBLIC_POSTHOG_KEY_ ne sont pas définies. Aucune utilité d'envoyer des informations à PostHog en dev.

### prod

Publié à [aftercinema.fr](https://aftercinema.fr) automatiquement via la Github Action [deploy-web-app-to-vps.yml](/.github/workflows/deploy-web-app-to-vps).

## get-stats-data

### local

#### MACOS

```
cd get-stats-data
python3 -m venv .venv
source .venv/bin/activate
pip install jupyter
```

#### WINDOWS

```
cd get-stats-data
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install jupyter
```

Il faut ensuite copier coller le code de définition des variables d'environnements dans la cellule vide prévue à cet effet [disponible ici](https://www.notion.so/gas-perso/projets-ecd7b57cf1f14923905b834e808d904a?pvs=4#c75f80609d4049da8dae52568b578191), il faut remplacer ACAST_TOKEN par un nouveau token obtenu sur [acast.com](https://www.acast.com).

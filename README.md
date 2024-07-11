# Aftercinema

<p align="center">
<img src="web-app/public/logos/logo500x500px.png" width="250" height="250" />
</p>

Ce dépôt contient le code source du site web vitrine du podcast Aftercinema ([/web-app](/web-app)). Sa *stack* technique est la suivante : TypeScript, React, NextJS.

Il contient également l'API d'Aftercinema, qui sert à rendre accessible en ligne pour le site web les données statistques du podcast ([/api](/api)). Sa *stack* technique est la suivante : Python, FastAPI.

Pour rendre accessible ces données statistiques, un Notebook Python récupère les données des systèmes sources et les stocke dans une base de données PostgreSQL ([/get-stats-data](/get-stats-data)).

## api

### local

```
cd api
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r requirements.txt
$Env:POSTGRESQL_CONN_STRING='XXX'
uvicorn main:app --reload
```
Où *XXX* est la châine de connexion à la base PostgreSQL [disponible ici](https://www.notion.so/gas-perso/projets-ecd7b57cf1f14923905b834e808d904a?pvs=4#c75f80609d4049da8dae52568b578191).

### prod

Publié à [api.aftercinema.fr](https://api.aftercinema.fr) automatiquement via la Github Action [deploy-api-to-vps.yml](/.github/workflows/deploy-api-to-vps).

## web-app

### local

```
cd web-app
npm install
npm run dev
```

### prod

Publié à [aftercinema.fr](https://aftercinema.fr) automatiquement via la Github Action [deploy-web-app-to-vps.yml](/.github/workflows/deploy-web-app-to-vps).

## get-stats-data

### local

```
cd get-stats-data
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install jupyter
```
Il faut ensuite copier coller le code de définition des variables d'environnements dans la cellule vide prévue à cet effet [disponible ici](https://www.notion.so/gas-perso/projets-ecd7b57cf1f14923905b834e808d904a?pvs=4#c75f80609d4049da8dae52568b578191).
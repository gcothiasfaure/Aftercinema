# Aftercinema

<p align="center">
<img src="web-app/public/logos/logo500x500px.png" width="250" height="250" />
</p>

## api

### local

```
cd api/app
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

### prod

Le dossier **api** est copié sur le VPS puis le docker-compose.yml lancé via [.github\workflows\deploy-api-to-vps.yml](.github\workflows\deploy-api-to-vps.yml).

Publié à [api.aftercinema.fr](https://api.aftercinema.fr).

## web-app

### local

```
cd web-app
npm install
npm run dev
```

### prod

Le docker-compose.yml est copié sur le VPS puis lancé via [.github\workflows\deploy-web-app-to-vps.yml](.github\workflows\deploy-web-app-to-vps.yml)

Publié à [aftercinema.fr](https://aftercinema.fr).

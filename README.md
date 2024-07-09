# Aftercinema

<p align="center">
<img src="web-app/public/logos/logo500x500px.png" width="250" height="250" />
</p>

## api

### local

```
cd api
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r requirements.txt
$Env:POSTHOG_API_KEY='XXX'
$Env:POSTGRESQL_CONN_STRING='XXX'
uvicorn main:app --reload
```

### prod

Publié à [api.aftercinema.fr](https://api.aftercinema.fr).

## web-app

### local

```
cd web-app
npm install
npm run dev
```

### prod

Publié à [aftercinema.fr](https://aftercinema.fr).

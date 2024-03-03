import sqlite3
from fastapi import FastAPI, HTTPException
import re
import requests
import xml.etree.ElementTree as ET
from fastapi.middleware.cors import CORSMiddleware
import uuid
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

class Email(BaseModel):
    email: str

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connexion à la base de données
conn = sqlite3.connect('database.db')
cur = conn.cursor()

# Code SQL de création la table emails
# DROP TABLE emails;CREATE TABLE emails (id TEXT PRIMARY KEY,email TEXT UNIQUE)

@app.get("/")
async def hello():
    return {"Hello":"World"}

@app.post("/store-email/")
async def store_email(email :Email):
    print(email.email)
    # if not bool(re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)):
    #     raise HTTPException(status_code=400, detail="Invalid email adress")
    
    # cur.execute("INSERT INTO emails (id,email) VALUES (?,?)", (str(uuid.uuid4()),email.email))
    # conn.commit()
    
    return "ij"
    
    try:
        cur.execute("INSERT INTO emails (id,email) VALUES (?,?)", (str(uuid.uuid4()),email))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")

    return {"message": "Email stored successfully", "email": email},200

@app.get("/delete-email")
async def delete_email(email: str):
    try:
        cur.execute("DELETE FROM emails WHERE email = ?", (email,))
        conn.commit()
    except:
        with open("html-templates/fail-deleted-email.html", "r",encoding="utf-8") as file:
            html_content = file.read()
        return HTMLResponse(content=html_content,status_code=400)
    with open("html-templates/deleted-email.html", "r",encoding="utf-8") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content)

@app.get("/get-episodes")
async def get_episodes():
    response = requests.get("https://feeds.acast.com/public/shows/aftercinema")
    root = ET.fromstring(response.content)
    return {"episode-ids":[item.text for item in root.findall('.//{https://schema.acast.com/1.0/}episodeId')]}
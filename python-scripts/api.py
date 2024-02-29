import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import re

app = FastAPI()

class Email(BaseModel):
    email: str

# Connexion à la base de données
conn = sqlite3.connect('database.db')
cur = conn.cursor()

# Code SQL de création la table emails
# DROP TABLE emails;CREATE TABLE emails (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE)

def add_email(email):
    try:
        cur.execute("INSERT INTO emails (email) VALUES (?)", (email,))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")

@app.get("/")
async def hello():
    return {"Hello":"World"}

@app.post("/store-email/")
async def store_email(email: Email):

    if not bool(re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email.email)):
        raise HTTPException(status_code=400, detail="Invalid email adress")

    add_email(email.email)
    return {"message": "Email stored successfully", "email": email.email}

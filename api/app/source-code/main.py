import sqlite3
import uuid
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from email_validator import validate_email, EmailNotValidError
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail,ReplyTo,From
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

conn = sqlite3.connect(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..","..","db", "database.db"))
cur = conn.cursor()

@app.get("/")
async def hello():
    return {"Hello":"Worlds"}

@app.get("/store-email")
async def store_email(email :str):
    
    try:
        email = validate_email(email).normalized
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail="Invalid email adress")
    try:
        cur.execute("INSERT INTO emails (id,email) VALUES (?,?)", (str(uuid.uuid4()),email))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")

    return {"message": "Email stored successfully", "email": email}

@app.get("/delete-email")
async def delete_email(email: str):
    cur.execute("DELETE FROM emails WHERE email = ?", (email,))
    conn.commit()
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "html-template", "deleted-email.html"), "r",encoding="utf-8") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content)

@app.get("/emails")
async def get_emails():
    cur.execute("SELECT email FROM emails")
    emails = [row[0] for row in cur.fetchall()]
    
    return {"emails":emails}

@app.post("/send-news")
async def upload_file(subject: str, newsletter_file: UploadFile = File(...)):

    try:
        content = newsletter_file.file.read().decode("utf-8")

        cur.execute("SELECT email FROM emails")
        emails = [row[0] for row in cur.fetchall()]

        response_code = []

        for email in emails:
            message = Mail(
                to_emails=email,
                subject=subject,
                html_content=content)
            message.from_email = From(
                email="news@aftercinema.fr",
                name="Aftercinema"
            )
            message.reply_to = ReplyTo(
                email="contact@aftercinema.fr",
                name="Aftercinema"
            )
            response = sg.send(message)
            response_code.append({email:response.status_code})

    except:
        return {"message": "There was an error sending news"}
    finally:
        newsletter_file.file.close()

    return {"response_codes":response_code}
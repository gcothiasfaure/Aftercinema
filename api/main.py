from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from sqlmodel import Field, Session, SQLModel, create_engine, select
from sqlalchemy import exc
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, ReplyTo, From
from email_validator import validate_email, EmailNotValidError
import os
import uuid

sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

class Email(SQLModel,table=True):
    id: str = Field(index=True,primary_key=True)
    email: str = Field(default=None, index=True,unique=True)

engine = create_engine(os.environ.get("POSTGRESQL_CONN_STRING"))

def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://aftercinema.fr', 'https://www.aftercinema.fr','http://localhost:3000'],
    allow_methods=["GET","POST"]
)

@app.get("/")
def hello():
    return {"Hello":"World"}

@app.get("/store-email")
def create_email(*, session: Session = Depends(get_session),email:str):
    try:
        email = validate_email(email).normalized
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail="Invalid email adress")
    emailObj = Email(id=str(uuid.uuid4()),email=email)
    try:
        session.add(emailObj)
        session.commit()
        session.refresh(emailObj)
    except exc.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "Email stored successfully", "email": email}

@app.get("/delete-email")
def delete_email(*, session: Session = Depends(get_session),email:str):
    statement = select(Email).where(Email.email == email)
    results = session.exec(statement).all()
    if len(results)==0:
        raise HTTPException(status_code=404, detail="Email not found")
    session.delete(results[0])
    session.commit()
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "html-template-deleted-email.html"), "r",encoding="utf-8") as file:
        html_content = file.read()
    
    return HTMLResponse(content=html_content)

@app.get("/emails")
def get_emails(*, session: Session = Depends(get_session)):
    statement = select(Email)
    results = session.exec(statement).all()
    return {"emails":results}

@app.post("/send-news")
async def upload_file(*, session: Session = Depends(get_session),subject: str, newsletter_file: UploadFile = File(...)):
    try:
        content = newsletter_file.file.read().decode("utf-8")
        statement = select(Email)
        emails = session.exec(statement).all()
        response_code = []
        for email in emails:
            message = Mail(
                to_emails=email.email,
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
            response_code.append({email.email:response.status_code})
    except:
        return {"message": "There was an error sending news"}
    finally:
        newsletter_file.file.close()
    return {"response_codes":response_code}
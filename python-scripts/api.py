from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re
import uuid
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Création de la base de données
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Définition du modèle SQLAlchemy pour la table "emails"
class Email(Base):
    __tablename__ = "emails"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)

# Création de la table dans la base de données
Base.metadata.create_all(bind=engine)

# Définition du modèle Pydantic pour l'e-mail
class EmailRequest(BaseModel):
    email: str

app = FastAPI()

# Configuration des paramètres CORS
origins = ["http://127.0.0.1:5500"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fonction pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Fonction pour vérifier si l'e-mail existe déjà
def email_exists(db: Session, email: str):
    return db.query(Email).filter(Email.email == email).first()

# Route pour stocker l'e-mail
@app.post("/store-email", response_model=EmailRequest)
async def store_email(email: EmailRequest, db: Session = Depends(get_db)):
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email.email):
        raise HTTPException(status_code=400, detail="Invalid email address")
    if email_exists(db, email.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    db.add(Email(id=str(uuid.uuid4()), email=email.email))
    db.commit()
    return email

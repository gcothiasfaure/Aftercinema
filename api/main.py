from fastapi import Depends, FastAPI
from sqlmodel import Session, create_engine
import os
from sqlmodel import select
from model import Stats_Data

engine = create_engine(os.environ.get("POSTGRESQL_CONN_STRING"))

def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI(docs_url=None)

@app.get("/")
def hello():
    return {"Hello":"World"}

@app.get("/get-stats-data")
def get_data_stats(*, session: Session = Depends(get_session)):
    results = session.exec(select(Stats_Data)).all()
    export = {}
    for result in results:
        export[result.data_name] = {}
        export[result.data_name]["data"]=result.data
        export[result.data_name]["store_date"]=result.date
    return export
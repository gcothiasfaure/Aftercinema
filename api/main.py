from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, create_engine
import os
from datetime import datetime,timezone
import pytz

from utility_functions.data import get_acast_stats,get_posthog_data
from utility_functions.db import delete_data_if_exists,insert_data_in_db,select_all_data_in_db
from model import Stats_Data

engine = create_engine(os.environ.get("POSTGRESQL_CONN_STRING"))

def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://aftercinema.fr', 'https://www.aftercinema.fr','http://localhost:3000'],
    allow_methods=["GET"]
)

@app.get("/")
def hello():
    return {"Hello":"World"}

@app.get("/store-data-stats")
def store_data_stats(*, session: Session = Depends(get_session),acast_token:str):
    date_now = datetime.now(tz=timezone.utc).astimezone(pytz.timezone('Europe/Paris')).strftime("%Y-%m-%dT%H:%M:%S")
    try:
        delete_data_if_exists(session,"acast")
        acast_data_stats = get_acast_stats(acast_token)
        stats_data_obj = Stats_Data(data_name="acast",data=acast_data_stats,store_date=date_now)
        insert_data_in_db(session,stats_data_obj)
    except:
        raise HTTPException(status_code=400, detail="Error with acast data")
    try:
        delete_data_if_exists(session,"posthog")
        posthog_data = {}
        for event in ["Page viewed","Menu button clicked","Action button clicked","Platform button clicked"]:
            posthog_data[event] = get_posthog_data(event)
        stats_data_obj = Stats_Data(data_name="posthog",data=posthog_data,store_date=date_now)
        insert_data_in_db(session,stats_data_obj)
    except:
        raise HTTPException(status_code=400, detail="Error with posthog data")
    return {"status":"ok"}

@app.get("/get-data-stats")
def get_data_stats(*, session: Session = Depends(get_session)):
    results = select_all_data_in_db(session,Stats_Data)
    export = {}
    for result in results:
        export[result.data_name] = {"data":results[0].data,"store_date":results[0].store_date}
    return export
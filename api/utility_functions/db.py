from sqlmodel import select
from model import Stats_Data

def delete_data_if_exists(session,data_name):
    statement = select(Stats_Data).where(Stats_Data.data_name == data_name)
    results = session.exec(statement).all()
    if len(results)>0:
        session.delete(results[0])
        session.commit()

def insert_data_in_db(session,obj):
    session.add(obj)
    session.commit()
    session.refresh(obj)

def delete_data_in_db(session,obj):
    session.delete(obj)
    session.commit()

def select_all_data_in_db(session,obj):
    statement = select(obj)
    return session.exec(statement).all()
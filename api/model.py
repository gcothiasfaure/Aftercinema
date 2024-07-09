from sqlmodel import Field, SQLModel, JSON, Column

class Stats_Data(SQLModel,table=True):
    data_name: str = Field(index=True,primary_key=True)
    store_date: str = Field(index=True)
    data: dict = Field(sa_column=Column(JSON))

class MyException(Exception):
    pass
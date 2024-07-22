from sqlmodel import Field, SQLModel, JSON, Column

class Stats_Data(SQLModel,table=True):
    data_name: str = Field(index=True,primary_key=True)
    data: dict = Field(sa_column=Column(JSON))
    date: str = Field(index=True)
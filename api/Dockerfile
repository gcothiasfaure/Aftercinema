FROM python:3.8

COPY ./app /aftercinema-api/app

COPY ./db /aftercinema-api/db

WORKDIR /aftercinema-api/app

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
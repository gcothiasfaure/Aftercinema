FROM python:3.12

COPY ./ /aftercinema-api

WORKDIR /aftercinema-api

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
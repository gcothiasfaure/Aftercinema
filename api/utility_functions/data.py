from datetime import datetime,timezone
import requests
import pytz
import os
import json

from model import MyException
from utility_functions.general import get_episodes

def get_acast_episode_download_stats(date_now,headers,stat_type):
    data = []
    for episode_acast_id in get_episodes():
        if stat_type == "listeners":
            request = requests.get("https://insights-api.acast.com/api/v2/charts/downloads/65d49906c4c0ce0016eadf8c/episode/"+episode_acast_id+"?from=2024-02-19T23:00:00.000Z&to="+date_now+"&interval=day&timeZone=Europe/Paris",headers=headers)
        else:
            request = requests.get("https://insights-api.acast.com/api/v2/shows/65d49906c4c0ce0016eadf8c/reach/histogram/episode/"+episode_acast_id+"?from=2024-02-20T00:00:00Z&to="+date_now+"&interval=day",headers=headers)
        values = []
        for objet in request.json():
            values.append(objet["value"])
        data.append({"episode_acast_id":episode_acast_id,"values":values})
    return data

def get_acast_platforms_download_stats(date_now,headers):
    request = requests.get("https://insights-api.acast.com/api/v2/shows/65d49906c4c0ce0016eadf8c/clients/histogram?from=2024-02-19T23:00:00.000Z&to="+date_now+"&timeZone=Europe/Paris&clients=Spotify,Deezer,Apple+Podcasts,Other,Chrome,Safari,Acast+embed-player,Firefox,iVoox,CastBox,Podcast+Addict&interval=day",headers=headers)

    platforms_data = []
    values_other_platforms = []

    for platform in request.json():

        if platform["name"] == "Spotify" or platform["name"] == "Deezer" or platform["name"] == "Apple Podcasts":
            labels = []
            values = []
            for objet in platform["values"]:
                labels.append(objet["label"].split("T")[0])
                values.append(objet["value"])
            platforms_data.append({
                "platform_name":platform["name"],
                "values": values
            })
        else:
            values = []
            for objet in platform["values"]:
                values.append(objet["value"])
            if len(values_other_platforms)>0:
                values_other_platforms = [x + y for x, y in zip(values, values_other_platforms)]
            else:
                values_other_platforms = values
    platforms_data.append({
        "platform_name":"Autres",
        "values": values_other_platforms
    })
    return {"labels":labels,"values":platforms_data}

def get_acast_stats(token):
    date_now = datetime.now(tz=timezone.utc).astimezone(pytz.timezone('Europe/Paris')).strftime("%Y-%m-%dT%H:%M:%S")
    headers = {"Authorization": f"Bearer {token}"}
    platforms_download_stats = get_acast_platforms_download_stats(date_now,headers) 
    return {
        "labels":platforms_download_stats["labels"],
        "platforms_download_stats":platforms_download_stats["values"],
        "episode_download_stats":get_acast_episode_download_stats(date_now,headers,'downloads'),
        "episode_listener_stats":get_acast_episode_download_stats(date_now,headers,'listeners')
    }

def get_posthog_data(event_type):
    token = os.environ.get("POSTHOG_API_KEY")
    headers = {"Authorization": f"Bearer {token}"}
    with open("./static_files/POSTHOG_QUERIES.json", 'r') as fichier:
        queries = json.load(fichier)
    data = {
        "query": {
            "kind": "HogQLQuery",
            "query": queries[event_type]
        }
    }
    request = requests.post("https://eu.posthog.com/api/projects/20861/query",headers=headers,json=data)
    request_data = request.json()
    if request_data["hasMore"]:
        raise MyException("Il y a des resultats en plus qui ne sont pas arrivés")
    columns = request_data["columns"]
    final_data = {}
    final_data["data"] = {}
    final_data["columns"] = request_data["columns"]
    for i in range(0,len(columns)):
        column_name = columns[i]
        final_data["data"][column_name] = []
        for values in request_data["results"]:
            final_data["data"][column_name].append(values[i])
    return final_data
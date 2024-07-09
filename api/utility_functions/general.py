import requests
import xml.etree.ElementTree as ET

def get_episodes():
    response = requests.get("https://feeds.acast.com/public/shows/aftercinema")
    root = ET.fromstring(response.content)
    return [item.text for item in root.findall('.//{https://schema.acast.com/1.0/}episodeId')]
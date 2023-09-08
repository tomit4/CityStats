#!/usr/bin/env python3
import json
import requests
from bs4 import BeautifulSoup as BS
import os

city_id = 2
base_url = 'https://www.akroncitycouncil.org'
city_council_url = 'https://www.akroncitycouncil.org/members'

path_id = '00' + str(city_id)
img_path = './new_council_members/img/' + str(path_id) + '/'
os.makedirs(os.path.dirname(img_path), exist_ok=True)


def scrape_data():
    html = requests.get(city_council_url).content
    soup = BS(html, 'lxml')
    results = soup.findAll('div', {"class": "item"})
    finalArr = []
    imgArr = []
    # generates JSON data and creates img urls for downloading
    for i, result in enumerate(results):
        name = result.find('div', attrs={'class': 'name'})
        data = {}
        data['city_id'] = city_id
        data['council_member'] = name.contents[0]
        finalArr.append(data)
        img = result.find('img')
        img_url = base_url + img['src']
        imgArr.append(img_url)
    # downloads images
    for i, img_url in enumerate(imgArr):
        img_data = requests.get(img_url).content
        file = open(
            './new_council_members/img/' + str(path_id) + '/' + str(path_id) +
            '_' + str(i) + '.jpg', 'wb')
        file.write(img_data)
        file.close()
    # writes json to file
    with open('./new_council_members/json/' + str(path_id) + '.json',
              'w') as writeJSON:
        json.dump(finalArr, writeJSON, ensure_ascii=False)


if __name__ == "__main__":
    scrape_data()

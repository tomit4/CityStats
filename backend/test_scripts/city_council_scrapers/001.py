#!/usr/bin/env python3
import json
import requests
from bs4 import BeautifulSoup as BS
import os
from datetime import datetime

city_id = 1
base_url = 'https://www.abilenetx.gov'
city_council_url = 'https://www.abilenetx.gov/526/City-Council'

path_id = '00' + str(city_id)
img_path = './new_council_members/img/' + str(path_id) + '/'
os.makedirs(os.path.dirname(img_path), exist_ok=True)


def scrape_data():
    html = requests.get(city_council_url).content
    soup = BS(html, 'lxml')
    results = soup.findAll('tr')
    finalArr = []
    imgArr = []
    # generates JSON data and creates img urls for downloading
    for td in results:
        for h3 in td.find_all('h3'):
            data = {}
            data['city_id'] = city_id
            data['council_member'] = h3.contents[0]
            finalArr.append(data)
        for i, img in enumerate(td.find_all('img')):
            img_url = base_url + img['src']
            imgArr.append(img_url)

    # logs when download of image starts
    dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    print(dt_string, ': downloading images for city_id: ', str(city_id))
    with open("./log.txt", "a") as f:
        print(dt_string,
              ': downloading images for city_id: ',
              str(city_id),
              file=f)

    # downloads images
    for i, img_url in enumerate(imgArr):
        img_data = requests.get(img_url).content
        file = open(
            './new_council_members/img/' + str(path_id) + '/' + str(path_id) +
            '_' + str(i) + '.jpg', 'wb')
        file.write(img_data)
        file.close()

    # logs when download of image is completed
    dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    print(dt_string, ': images for city_id: ', str(city_id), ' are downloaded')
    with open("./log.txt", "a") as f:
        print(dt_string,
              ': images for city_id: ',
              str(city_id),
              ' are downloaded',
              file=f)

    # writes json to file
    with open('./new_council_members/json/001.json', 'w') as writeJSON:
        json.dump(finalArr, writeJSON, ensure_ascii=False)


if __name__ == "__main__":
    scrape_data()

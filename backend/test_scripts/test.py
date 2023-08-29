#!/usr/bin/env python3
import json
import requests
from bs4 import BeautifulSoup as BS
import pandas as pd
import os

city_council_urls = ['https://www.abilenetx.gov/526/City-Council']
url = "https://ballotpedia.org/Los_Angeles,_California#City_council"
field = 1


def scrape_data():
    html = requests.get(city_council_urls[0]).text
    #  print(html)
    df_list = pd.read_html(html)
    print(df_list)
    #  df = df_list[0]
    #  df.to_json('my_test.json')


# TODO: integrate with cities.json
#  def scrape_data():
#  if os.path.exists('my_test.json'):
#  os.remove('my_test.json')

#  html = requests.get(url).content
#  df_list = pd.read_html(html)
#  df = df_list[field]
#  df.to_json('my_test.json')

#  data = {}
#  with open('my_test.json', 'r') as json_file:
#  data = json.load(json_file)

#  new_data = {}
#  for key, value in data['Name'].items():
#  new_data[key] = value

#  print(new_data)

if __name__ == "__main__":
    #  my_data = scrape_data()
    scrape_data()
    #  os.remove('my_test.json')

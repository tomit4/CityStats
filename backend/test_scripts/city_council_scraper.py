import os
from bs4 import BeautifulSoup
import requests

url = 'https://www.abilenetx.gov/'
img_dir = "images"

response = requests.get(url)
html_content = response.content

soup = BeautifulSoup(html_content, 'html.parser')
sitemap_links = []
for link in soup.find_all("a"):
    if 'map' in link.text.lower():
        sitemap_links.append(link.get('href'))

if len(sitemap_links) == 0:
    raise ValueError('No sitemap links found on the website')

sitemap_url = url + sitemap_links[0]
response = requests.get(sitemap_url)
html_content = response.content

sitemap_soup = BeautifulSoup(html_content, 'html.parser')
council_links = []

for link in sitemap_soup.find_all('a'):
    if 'council' in link.text.lower():
        council_links.append(link.get('href'))

if len(council_links) == 0:
    raise ValueError('No links to council were found')

for c_link in council_links[:1]:
    council_url = url + c_link
    response = requests.get(council_url)
    council_content = response.content

    council_soup = BeautifulSoup(council_content, 'html.parser')
    image_tags = council_soup.find_all('img')
    for img in image_tags:
        img_url = img.get('src')
        if img_url.startswith('/'):
            img_url = img_url[1:]
            img_url = url + img_url
        response = requests.get(img_url)
        if not os.path.exists('images'):
            os.makedirs('images')
        if response.status_code == 200:
            with open(os.path.join(img_dir, os.path.basename(img_url)), 'wb') as f:
                f.write(response.content)
                print(f'Downloaded {img_url}')

#  #  print(sitemap_links)
#  print(council_links)

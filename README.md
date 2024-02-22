<div align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/tomit4/CityStats/main/readme_assets/building.png">
</div>
<h1 align="center">CityStats</h1>
<h2 align="center">Get Statistics On US States And Cities</h2>

### Introduction

CityStats is a minimal API for accessing data on all 50 US States and the top 330 most populous US Cities. Publicly available to all, CityStats aims to provide up to date data and statistics in a programmatically-accessible format that can be utilized and integrated into educational and research projects.

Aggregating and integrating data from multiple local government websites as well as publicly available resources like [Wikipedia](https://wikipedia.org), CityStats provides it's user with a simple API with which to interface using their programming language of choice.
CityStats is a simple Read Only REST API that delivers statistics about all 50 states
within the United States of America as well as the top 330 most populated cities
within the United States.

#### Why CityStats?

CityStats was made so that programmers and students could easily acquire and
parse publicly available data on US states and cities. While there are many
online resources for acquiring this data, the creator of CityStats, [Brian Hayes](https://brianhayes.dev), desired to have an interface that could quickly grab this data.

#### Getting Started

:memo: Official Online Documentation can on the basics can be found at the
[Official CityStats Info Website](https://citystats.info). While not all use
cases are covered, CityStats (as mentioned earlier) is very minimal and is very
easy to understand.

**Basic Queries**

For example if you wish to grab all information available on the state of
Alabama, one could simply visit `https://citystats.xyz/states/1` or `https://citystats.xyz/states/Alabama`. Grabbing this data via the standard `curl` command is straight-forward:

```bash
curl "https://citystats.xyz/states/1" -H "Accept: application/json" | jq
```

This will return the following JSON:

```json
[
    {
        "id": 1,
        "state_name": "Alabama",
        "state_abbreviation": "AL",
        "date_admitted": "1819-12-14T00:00:00.000Z",
        "capital": "Montgomery",
        "largest_city": "Huntsville",
        "elevation": "500 ft",
        "time_zone": "UTC-6(CST)",
        "latitude": "30°11' N to 35° N",
        "longitude": "84°53' W to 88°28' W",
        "url": "https://www.alabama.gov/",
        "flag_url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg",
        "insignia_url": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Seal_of_Alabama.svg",
        "area": {
            "total": "52419 sq mi",
            "land": "50744 sq mi",
            "water": "1675 sq mi"
        },
        "population": {
            "total": "5039877",
            "density": "99.1/sq mi",
            "median_household_income": "$52000"
        },
        "government": {
            "governor": {
                "governor_name": "Kay Ivey",
                "img_url": "https://citystats.xyz/images/states/1/governor"
            },
            "senators": [
                {
                    "senator_name": "Tommy Tuberville",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/1"
                },
                {
                    "senator_name": "Katie Britt",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/2"
                }
            ],
            "house_delegates": [
                {
                    "delegate_name": "Jerry Carl",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/1"
                },
                {
                    "delegate_name": "Barry Moore",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/2"
                },
                {
                    "delegate_name": "Mike Rogers",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/3"
                },
                {
                    "delegate_name": "Robert Aderholt",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/4"
                },
                {
                    "delegate_name": "Dale Strong",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/5"
                },
                {
                    "delegate_name": "Gary Palmer",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/6"
                },
                {
                    "delegate_name": "Terri Sewell",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/7"
                }
            ]
        }
    }
]
```

**Query By Field**

One can also grab more specified data about each particular state or city, like it's
government or total area. Take this code snippet in python for example, that
grabs all the government data on Alabama:

```python
import requests
import json

url = https://citystats.xyz/states/1/government
headers = {"Accept": "application/json}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    formatted_data = json.dumps(data, indent=4)
    print(formatted_data)
else:
    print("Failed to fetch data:", response.status_code)
```

Invoking such a Python script would return the following JSON:

```json
[
    {
        "id": 1,
        "state_name": "Alabama",
        "state_abbreviation": "AL",
        "government": {
            "governor": {
                "governor_name": "Kay Ivey",
                "img_url": "https://citystats.xyz/images/states/1/governor"
            },
            "senators": [
                {
                    "senator_name": "Tommy Tuberville",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/1"
                },
                {
                    "senator_name": "Katie Britt",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/2"
                }
            ],
            "house_delegates": [
                {
                    "delegate_name": "Jerry Carl",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/1"
                },
                {
                    "delegate_name": "Barry Moore",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/2"
                },
                {
                    "delegate_name": "Mike Rogers",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/3"
                },
                {
                    "delegate_name": "Robert Aderholt",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/4"
                },
                {
                    "delegate_name": "Dale Strong",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/5"
                },
                {
                    "delegate_name": "Gary Palmer",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/6"
                },
                {
                    "delegate_name": "Terri Sewell",
                    "img_url": "https://citystats.xyz/images/states/1/delegates/7"
                }
            ]
        }
    }
]
```

**Query By SubField**

We can get even more specific data by tacking on another subfield to our query.
This time, we'll utilize NodeJS to grab all of Alabama's senators:

```javascript
const https = require('https')
const util = require('util')

const options = {
    hostname: 'citystats.xyz',
    path: '/states/1/government/senators',
    method: 'GET',
    headers: {
        Accept: 'application/json',
    },
}

const req = https.request(options, res => {
    let data = ''

    res.on('data', chunk => {
        data += chunk
    })

    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data)
            console.log(util.inspect(jsonData, { colors: true, depth: null }))
        } catch (error) {
            console.error('Error parsing JSON:', error.message)
        }
    })
})

req.on('error', error => {
    console.error('Error fetching data:', error.message)
})

req.end()
```

Running this script will give us the following JSON:

```json
[
    {
        "id": 1,
        "state_name": "Alabama",
        "state_abbreviation": "AL",
        "government": {
            "senators": [
                {
                    "senator_name": "Tommy Tuberville",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/1"
                },
                {
                    "senator_name": "Katie Britt",
                    "img_url": "https://www.citystats.xyz/images/states/1/senators/2"
                }
            ]
        }
    }
]
```

**Query By Id**

Additionally, if we wish only to grab one specific senator, we can do so by
appending their specific index/id number to the end of the url like so:

```bash
curl "https://citystats.xyz/states/1/government/senators/1" -H "Accept: application/json" | jq
```

Which, of course, yields us the following JSON output:

```json
[
    {
        "id": 1,
        "state_name": "Alabama",
        "state_abbreviation": "AL",
        "government": {
            "senator": {
                "senator_name": "Tommy Tuberville",
                "img_url": "https://www.citystats.xyz/images/states/1/senators/1"
            }
        }
    }
]
```

**Images**

CityStats Also hosts images for government officials such as senators, house
delegates, mayor, city council members, etc. Each of these can be found at the
/images subdirectory of the `citystats.xyz` domain, followed by either `states` or
`cities` subdirectory, as well as their ids, etc. Once you find a specific
`img_url` field within the API, utilizing tools like `wget`, `curl`, or simply
downloading the image directly from your browser will download the image. Please
note that not all images are available for certain government officials,
indicated by their `img_url` field having a `null` value.

#### Installation

Please see the [Installation Documentation](https://github.com/tomit4/CityStats/docs/installation.md)

#### Forking This Project

CityStats code is open sourced under the BSD 3-Clause License. Should you wish
to fork the project, contribute to the project, or make any modifications,
please feel free to do so (although attribution of credit is appreciated).

#### Disclaimer

The information provided by the CityStats API is for informational purposes only. While we strive to ensure the accuracy and reliability of the data, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the API or the information contained therein. Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this API. By using the CityStats API, you acknowledge and agree that the data provided may contain inaccuracies or errors, and you are solely responsible for any actions you take based on the information obtained through the API. We disclaim any responsibility for the accuracy or reliability of the data and shall not be held liable for any damages resulting from the use of or inability to use the API. Furthermore, please note that the CityStats API is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We reserve the right to modify, suspend, or discontinue the API at any time without prior notice. Your use of the API constitutes acceptance of these terms and conditions. This API is licensed under the [BSD-3-Clause-Clear license](https://spdx.org/licenses/BSD-3-Clause-Clear.html).

### Conclusion

Should you have any constructive criticism, feedback, or just want to reach out,
please feel free to do so through any of the social media links or my email, which
you can find on [my website](https://brianhayes.dev). Furthermore, if you would like
to contribute to the CityStats project, please feel free to reach out by opening up
an issue and/or making a pull request. I do hope you find CityStats useful. :peace_symbol:

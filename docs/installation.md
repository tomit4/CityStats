#### Installing CityStats

**Clone The Repository**

To install CityStats, you'll need to first clone this repository.

```bash
git clone https://github.com/tomit4/CityStats
```

##### Backend

**Install Dependencies**

Each directory has a frontend and backend section that you'll need to first
install the dependencies using npm. If you don't have node or npm installed,
you'll have to follow the [Installation Guide from the Official Website](https://nodejs.org/en/download).

Once you have nodejs and npm installed. Navigate into the `backend` directory
and run:

```bash
cd backend && npm install
```

**Web Scraping And Populating The Database**

Once all dependencies have been installed. You'll need to populate the database
with the appropriate data. CityStats utilizes the [Beautiful Soup Python Library](https://beautiful-soup-4.readthedocs.io/en/latest/) to web scrape Wikipedia and various other official City Government websites to gather it's data. Web scraping is unfortunately, an inefficient way of gathering data, but the python scripts provided should gather data effectively as of early 2024. There are a few websites that are not scrapable, however, and the scripts should provide you with a log to help you ascertain which sites you will have to manually gather data from and parse into JSON. For further instructions on running the web scraping scripts, see the provided [instructions](https://github.com/tomit4/CityStats/blob/main/backend/scripts/readme.md).

Once the web scraping scripts have completed, you'll need to populate the database with the appropriate data. This is accomplished using two npm aliases provided in the backend's `package.json`. Simply run:

```bash
npm run km-up && npm run ks-reseed
```

From the root of the `backend` directory.

As long as you have followed the [web scraping instructions](https://github.com/tomit4/CityStats/blob/main/backend/scripts/readme.md) correctly, the SQLite database will be populate appropriately.

**Starting The Server**

The hard part being done now, you'll simply want to start the server using:

```bash
npm run start
```

If you wish to run the developer server, you can initialize the server instead
using nodemon like so:

```bash
npm run dev
```

##### Frontend

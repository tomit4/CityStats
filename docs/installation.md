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
and run the install alias:

```bash
cd backend && npm install
```

**Web Scraping And Populating The Database**

Once all dependencies have been installed. You'll need to populate the database
with the appropriate data. CityStats utilizes the [Beautiful Soup Python Library](https://beautiful-soup-4.readthedocs.io/en/latest/) to web scrape Wikipedia and various other official City Government websites to gather it's data. Web scraping is unfortunately, an inefficient way of gathering data, but the python scripts provided should do so effectively as of early 2024. There are a few websites that are not scrapable, however, and the scripts should provide you with a log to help you ascertain which sites you will have to manually gather data from and parse into JSON. For further instructions on running the web scraping scripts, see the provided [instructions](https://github.com/tomit4/CityStats/blob/main/backend/scripts/readme.md).

Once the web scraping scripts have completed, you'll need to populate the database with the appropriate data. This is accomplished using two npm aliases provided in the backend's `package.json`. Simply run:

```bash
npm run km-up && npm run ks-reseed
```

From the root of the `backend` directory.

As long as you have followed the [web scraping instructions](https://github.com/tomit4/CityStats/blob/main/backend/scripts/readme.md) correctly, the SQLite database will be populated appropriately.

**Starting The Server**

Prior to starting the server. You'll need to adjust the environment variables by
copying the sample `.env.sample` file as .env (do not commit this file!!). While
you can leave it as is, you can also adjust the `PORT` variable for whichever
port you wish to run the local dev server on. The `DOCKERPORT` variable is to be utilized
once ready for production.

The hard part being done now, you'll simply want to start the server using:

```bash
npm run start
```

If you wish to run the developer server using nodemon, you can initialize the server
like so instead:

```bash
npm run dev
```

##### Frontend

**Installing Dependencies**

Very much like the backend, once in the root of the project directory, navigate
to the `frontend` directory and install dependcies using `npm`:

```bash
cd frontend && npm install
```

**Small Inconveniences**

As you are probably aware from looking at this project, CityStats is written by
a new JavaScript developer. As such, there are some inconveniences with the
adjustment of the project's specific variables based off of whether working in
Production or Development. To address these inconveniences, you'll need to
adjust the following lines of code within two specific files:

```javascript
// /src/ThemeSelector.jsx, line 25
/* DEV */
/*
        if (document.styleSheets.length === 5)
            document.styleSheets[4].disabled = true
        if (document.styleSheets.length === 6) {
            document.styleSheets[5].disabled = document.styleSheets[4].disabled
            document.styleSheets[4].disabled = !document.styleSheets[4].disabled
        }
        */
/* PROD */
if (document.styleSheets.length === 2) document.styleSheets[1].disabled = true
if (document.styleSheets.length === 3) {
    document.styleSheets[2].disabled = document.styleSheets[1].disabled
    document.styleSheets[1].disabled = !document.styleSheets[1].disabled
}
```

And also:

```css
/* /src/css/styles.css, line 327 */
/* DEV */
/* src: url('../src/assets/fonts/raleway/Raleway-Regular.ttf') */
/* format('truetype'); */
/* PROD */
src: url('./fonts/raleway/Raleway-Regular.ttf') format('truetype');
```

In each of these files, comment out the PROD lines displayed, and uncomment the DEV
lines. I do apologize for the inconvenience, but at the time of this writing, I
was unable to ascertain the best practice for easily switching between these
inconsistencies between running dev and production.

**Environment Variables**

Unlike the backend, the frontend utilizes a large series of environment
variables to parse and verify the user's input when interacting with the url
inputs. The `env.sample` file provides these environment variables that actually
will reach out to the official CityStats API. Should you wish to use your own
locally run backend dev server, the `env.sample.local` file is provided for you
to utilize instead. Whichever one you wish to use, simply copy that file as your
`.env` file prior to starting the dev server.

**Starting the Dev Server**

Once done adjusting the appropriate variables, you're ready to simply run the
frontend server using `npm` from the `frontend` directory:

```bash
npm run dev
```

CityStats's frontend uses Vite under the hood. Running the above command should provide you with an output that indicates the local address and port number (usually localhost:5173). You can bring this local address up in your browser to view the frontend.

##### Containerizing for Production

When ready for production, CityStats is run virtually through docker containers.
The use of docker and its various intricacies is outside the scope of this
document, and it is assumed you have a basic understanding on how to use docker
and forward the exposed ports to a reverse proxy/http server like NGINX.

Should you wish to spin up docker containers, be mindful of the `DOCKERPORT`
environment variables in both the `backend` and `frontend` .env files as you'll
want to ensure they do not interfere with other docker containers you have
running or each other.

The `package.json` files in both the `backend` and `frontend` directories
provide a `build` and `destroy` script that allows you to quickly spin up or
spin down docker containers in each like so:

```bash
# spin up the docker containers
npm run build
```

And also:

```bash
# spin down the docker containers
npm run destroy
```

Afterwards which, it is up to you to discern how best to utilize these
containers. CityStats utilizes NGINX in conjunction with these containers to
reverse proxy the backend API server and the frontend to the web.

# City_Stats_V2

:construction: This repository is currently under heavy construction.

## Introduction

This is the second version of my [City Stats API](https://citystats.xyz/states/).

#### TODO:

**Backend:**

-   [x] Break out knex/sql statements into services folder as classes with properties/methods.
-   [x] Integrate [fastify-helmet](https://github.com/fastify/fastify-helmet).
-   [x] Add more nested routes for specific state data (i.e. area, population, speicific senators, etc.)
-   [x] Apply seed data for states
-   [x] Create routes and nested routes for cities ( same as nested routes above for cities)
-   [x] Apply seed data for cities
-   [ ] Add more functionality where cities with duplicate names, all cities are returned, not just the first one that matches the name.
-   [ ] Add more data about senators/house_delegates (i.e. age, years in office, wiki to profile photo, etc.)
-   [x] Write unit tests using ava. Consider using [fastify's testing guide](https://fastify.dev/docs/latest/Guides/Testing)
-   [x] Add [fastify-static](https://github.com/fastify/fastify-static) for image hosting of senator/house_delegates/mayors/city_counselors images
-   [ ] Set up appropriate route for image filepath (i.e cities/1/government/city_council/1/image) (half done)
-   [ ] Set up imagemagick script to scale images (reasonable sizes for frontend display)
-   [ ] Grab an image for each city and state (map for state, image for city) and format appropriately for front end.
-   [ ] Integrate making JWT/API keys with long lasting expiration(1 year), and auth all routes to backend with this. See [fastify-jwt](https://github.com/fastify/fastify-jwt).

**BUG_FIXES**:

-   [ ] Remove all underscore characters from city (and state?) names, instead normalize the url string (%20 for spaces, etc.). This will make it easier for front end communications in the long run (curl fans won't like it I guess, but hey, an occasional backslash never hurt anyone I guess...)
-   [ ] Allow for multiple cities of the same name to be returned by a single city query (yeah, bad naming convention then...)

**Frontend:**

-   [ ] Decide on frontend framework (React or Vue), and use it to dynamically render info about page.
-   [ ] Model frontend off of classic simple Apis like [I Can Haz Dad Joke](https://icanhazdadjoke.com/) and [The Star Wars API](https://swapi.dev/).
-   [ ] Determine how you can demonstrate this api without exposing auth headers in fetch().

**Automation:**

-   [ ] Adjust initial scripts already written to catch beautiful soup errors and log them to the log.txt file for easy finding of where beautiful soup failed (this way we can quickly find the city site that failed and adjust our sraping script accordingly).
-   [ ] Automate updating the database of city councilors, senators, house_delegates, populations, etc. based off of web scraping wikipedia/government sites(see test_scripts/city_council_scrapers dir).
-   [ ] Since there will be a LOT of python scripts to run, the script to pass to cron/celery will need to run every \*.py file within our scraping directory, investigate [run-parts command](https://unix.stackexchange.com/questions/189118/sanely-run-all-scripts-in-a-directory)
-   [ ] Investigate python/celery for "super cron" jobs.

**Devops:**

-   [x] Dockerize Entire App
-   [ ] Deploy to Linode, re-establish ssl certs, etc.

**Note:**

See your nginx configs for how to redirect docker containers (pretty easy)

To spin up the docker container locally simply navigate to backend and invoke:

```
docker-compose up -d citystats
```

And navigate to localhost:$DOCKERPORT

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
-   [ ] Add more data about senators/house_delegates (i.e. age, years in office, wiki to profile photo, etc.)
-   [x] Write unit tests using ava. Consider using [fastify's testing guide](https://fastify.dev/docs/latest/Guides/Testing)
-   [ ] Integrate making JWT/API keys with long lasting expiration(1 year), and auth all routes to backend with this. See [fastify-jwt](https://github.com/fastify/fastify-jwt).

**Frontend:**

-   [ ] Decide on frontend framework (React or Vue), and use it to dynamically render info about page.
-   [ ] Model frontend off of classic simple Apis like [I Can Haz Dad Joke](https://icanhazdadjoke.com/) and [The Star Wars API](https://swapi.dev/).
-   [ ] Determine how you can demonstrate this api without exposing auth headers in fetch().

**Automation:**

-   [ ] Automate updating the database of city councilors, senators, house_delegates, populations, etc. based off of web scraping wikipedia/government sites(see test_scripts/city_council_scrapers dir).
-   [ ] Use Python to accomplish this using stuff like pandas, etc.
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

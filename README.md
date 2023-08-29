# City_Stats_V2

:construction: This repository is currently under heavy construction.

## Introduction

This is the second version of my [City Stats API](https://citystats.xyz/states/).

#### TODO:

**Backend:**

-   [ ] Break out knex/sql statements into services folder as classes with properties/methods.
-   [ ] Integrate making JWT/API keys with long lasting expiration(1 year), and auth all routes to backend with this. See [fastify-jwt](https://github.com/fastify/fastify-jwt).
-   [ ] Integrate [fastify-helmet](https://github.com/fastify/fastify-helmet).
-   [ ] Write unit tests using ava(and sinon??)

**Frontend:**

-   [ ] Decide on frontend framework (React or Vue), and use it to dynamically render info about page.
-   [ ] Model frontend off of classic simple Apis like [I Can Haz Dad Joke](https://icanhazdadjoke.com/) and [The Star Wars API](https://swapi.dev/).
-   [ ] Determine how you can demonstrate this api without exposing auth headers in fetch().

**Automation:**

-   [ ] Automate updating the database of city councilors, senators, house_delegates, populations, etc. based off of web scraping wikipedia/government sites(see test_scripts dir/update_states.py for latest attempts).
-   [ ] Use Python to accomplish this using stuff like pandas, etc.
-   [ ] Investigate python/celery for "super cron" jobs.

**Devops:**

-   [ ] Dockerize Entire App
-   [ ] Deploy to Linode, re-establish ssl certs, etc.

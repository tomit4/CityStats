<div align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/tomit4/CityStats/main/readme_assets/building.png">
</div>
<h1 align="center">CityStats</h1>
<h2 align="center">Get Statistics On US States And Cities</h2>

## Introduction

CityStats is a simple Read Only REST API that delivers statistics about all 50 states
within the United States of America as well as the top 330 most populated cities
within the United States.

**Getting Started**

:construction: Official Online Documentation is still in development. Keep an
eye out for https://citystats.info where official documentation will eventually
find its home.

To grab a general overview of what is available. Please visit one of the two
following root endpoints:

-   https://citystats.xyz/states
-   https://citystats.xyz/cities

This will provide you with the majority of the data available including
information about each state/city including fields such as square footage,
population, politician names, and more. Subfields can be added to the URL string
to gain more fine grained details from the API, such as:

-   https://citystats.xyz/states/1

Which will return to you information only about the first state within the
data set. If you wish to query information by state name, that is also available
by adjusting the URl query string like so:

-   https://citystats.xyz/states/Alabama

**Query Specifics**

The query string for states or cities can be adjusted to accept the name of the
state/city. Should the state/city name have multi-word, please note that the
API's formatting requries the use of underscores instead of spaces, like so:

-   https://citystats.xyz/cities/Los_Angeles

Should a city name have multiple references by that name within the data set,
all cities with that name will be returned, as is the case for example,
with the city name Aurora:

-   https://citystats.xyz/cities/Aurora

The query can become increasingly granular, as each subsequent forward slash
within the URL string can further specify the specific data you wish to
retrieve:

-   https://citystats.xyz/states/1/area
-   https://citystats.xyz/states/1/area/total
-   https://citystats.xyz/states/Alabama/government
-   https://citystats.xyz/states/Alabama/government/senators
-   https://citystats.xyz/states/Alabama/government/senators/1

**Images**

Additionally, images of specific government representatives, such as senators,
house delegates, governors, mayors, and city councilmembers are all
available via the images routes:

-   https://citystats.xyz/images/states/1/governor
-   https://citystats.xyz/images/states/1/senators/1
-   https://citystats.xyz/images/states/1/delegates/2
-   https://www.citystats.xyz/images/cities/10/mayor
-   https://www.citystats.xyz/images/cities/10/city_council/6

**Periodic Updates**

This API is updated utilizing a series of Python Beautiful Soup Web Scraping
scripts which periodically bring in new names/images from Wikipedia as well as
Official Government Websites. This is an imperfect method of bringing in new
information, and while some automation has been implemented, if you notice any
inaccuracies in any of the data, please feel free to create an issue in this
repository and I will do my best to address it in a timely manner.

#### TODO:

**Fullstack:**

-   [x] Once Frontend is dockerized, backend is updated, deploy application to
        Linode/Akamai instance and test if app is working as expected.
-   [ ] Fix small UI bugs on mobile (i.e. splash title is slightly to right and
        too far towards the bottom of screen on both firefox and chromium, also
        footer icons clip towards right on both firefox and chromium, also on
        chromium "node" tab is pushed down over code block, see chromium at
        312px wide and you'll witness the issues with tabs and icons).
-   [ ] Completely rewrite this README.md (except for V3 TODOS below)

**Frontend:**

-   [x] Use React to dynamically render an example page
-   [x] Use React-Router for ease of dynamically rendering different components
        (follow [tutorial](https://reactrouter.com/en/main/start/tutorial) to quickly get up to speed).
-   [x] Use React to Write a Documentation page demonstrating usage of API with node, fetch, curl, and python
-   [x] Model frontend off of classic simple Apis like [I Can Haz Dad Joke](https://icanhazdadjoke.com/) and [The Star Wars API](https://swapi.dev/).
-   [ ] See frontend/README.md for details on remaining tasks (i.e.
        refactor/unit tests)
-   [x] Rewrite citystats.xyz routes to work with localhost in development mode
        (requires use of VITE .env variables)
-   [x] Dockerize frontend with NGINX.

**Backend:**

-   [ ] Investigate how you can achieve 90% code coverage on backend unit tests.
-   [ ] Rerun web scraping scripts, address errors, and update backend db.

**TODO for 3.0:**

-   [ ] Reimplement both front and back ends in TypeScript (shouldn't be TOO hard,
        right? ...)
-   [ ] Implement Authenticaton utilizing API keys and Brevo Transactional Emails
        for signing up.
-   [ ] Serve Images outside of node via NGINX, S3, or a CDN, see [this helpful link on node best
        practices](https://github.com/goldbergyoni/nodebestpractices#1-project-architecture-practices)
-   [ ] Consider reimplementing this as a trpc API instead of a Rest API, which
        will work better with typescript/zod validation, etc. trpc has [an
        adaptor](https://trpc.io/docs/server/adapters/fastify) that integrates well with fastify.
-   [ ] Consider a faster http request library in your python scripts. See
        [ArjanCodes video on the subject](https://www.youtube.com/watch?v=OPyoXx0yA0I&pp=ygUKYXJqYW5jb2Rlcw%3D%3D)

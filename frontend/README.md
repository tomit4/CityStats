## CityStats Info

:construction: This repository is currently under heavy construction

### Frontend for Citystats

**TODO**:

-   [ ] Create an \<aside\> element like in traditional docs (see
        almost any modern docs, i.e. fastify, react, vue, etc.). This will render
        out different components in the main section to the right.
-   [ ] Create a drop down to determine states or cities or images.
-   [ ] Create an input form for state/city names
-   [ ] Create another drop down for subfields (changes depending on if state or city)
        (i.e. largest_city, latitude, url, area, population, etc.)
-   [ ] Create another drop down for queries (government/governor, population/density,
        area/total, etc.)
-   [ ] All this will call out to the backend api citystats.xyz. This will then
        render in a JSON code block (styled using prisma?).
-   [ ] Additionally the frontend will generate a series of code snippets (bash,
        node/express, and python) that will show basic usage in a backend api.

**NOTES**:
On reading some of the React Docs, we have determined that we'll
need to use useState, useEffect, useMemo, and useDeferredValue hooks
to grab what we need from the backend citystats API and render it appropriately.

**RESOURCES**

-   [FreeCodeCamp - How To Write Good API Documentation](https://www.freecodecamp.org/news/how-to-write-api-documentation-like-a-pro/)
-   [React Official Docs - State A Components Memory](https://react.dev/learn/state-a-components-memory)
-   [React Official Docs - useState](https://react.dev/reference/react/useState)
-   [React Official Docs - useEffect](https://react.dev/reference/react/useEffect)
-   [React Official Docs - useMemo](https://react.dev/reference/react/useMemo)
-   [React Official Docs - useDefferedValue](https://react.dev/reference/react/useDeferredValue)

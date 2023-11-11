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

-   On reading some of the React Docs, we have determined that we'll
    need to use useState, useEffect, useMemo, and useDeferredValue hooks
    to grab what we need from the backend citystats API and render it appropriately.
-   On watching [Web Dev Simplified's tutorial](https://www.youtube.com/watch?v=UUga4-z7b6s&pp=ygUsd2ViIGRldiBzaW1wbGlmaWVkIHJlYWN0IGRpcmVjdG9yeSBzdHJ1Y3R1cmU%3D) on organizing a React project's
    directory, structure, I have added certain directories into the src directory
    that have yet to be utilized (see his intermediate and advanced dir structure to
    get a grasp on how best to organize your project here).

-   Forego all references to API keys for now, get the public API up first, then
    implement API keys (a project on its own).

**NAVBAR**

Navbar Elements Should Include:

-   Home
-   API Keys
-   Github
-   Search (ctrl k)
-   Light/Dark Toggle

NOTE: when navbar collapses, majority goes into hamburger menu except for
search.

**ASIDE MENU**

...collapsed NavBar if in mobile

-   Toggle Button for states/cities(?)
-   Getting Started Submenu

    1. All States
    2. Specific State

-   Essentials Submenu

    1. Query by Specific Field
    2. Query Government Officials
    3. Querying Images

-   Generate API Key, etc.

**FOOTER MENU**
Email, Mastodon, Website
Powered by Linode, NGINX, Docker, React

**RESOURCES**

-   [FreeCodeCamp - How To Write Good API Documentation](https://www.freecodecamp.org/news/how-to-write-api-documentation-like-a-pro/)
-   [React Official Docs - State A Components Memory](https://react.dev/learn/state-a-components-memory)
-   [React Official Docs - useState](https://react.dev/reference/react/useState)
-   [React Official Docs - useEffect](https://react.dev/reference/react/useEffect)
-   [React Official Docs - useMemo](https://react.dev/reference/react/useMemo)
-   [React Official Docs - useDefferedValue](https://react.dev/reference/react/useDeferredValue)

**ASSETS**

Fonts:

1. [Source Code Pro](https://www.fontspace.com/search?q=source%20code%20pro)
2. [Poppins](https://www.1001fonts.com/search.html?search=poppins)

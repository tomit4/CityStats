## CityStats Info

:construction: This repository is currently under heavy construction

### Frontend for Citystats

**TODO**:

-   [x] Create an \<aside\> element like in traditional docs (see
        almost any modern docs, i.e. fastify, react, vue, etc.). This will render
        out different components in the main section to the right.
-   [x] Create a drop down to determine states or cities or images.
-   [x] Call out to the backend api citystats.xyz. This will then
        render in a JSON code block (styled using prisma?).
-   [x] Additionally the frontend will generate a series of code snippets (bash,
        node/express, and python) that will show basic usage in a backend api.
-   [x] Implement a Light/Dark Mode Toggle that defaults to User Default Preferences,
        but uses localStorage to hold onto user's changes in theme.
-   [ ] Add Footer on Mobile Version of site (include mastodon link, github
        link, personal website link, maybe link to license and terms of service,
        etc?, see FOOTER MENU below).
-   [ ] Create Desktop Version of Site. Maybe finally choose a Hero Image(s)
        (series of images that fade in and out and change which images get shown
        based off of user's dark/light pref? Basically, show night time shots of
        cities vs day time shots of cities).
-   [ ] Add favicon

**TODO_DOCS**

-   [ ] Look carefully at the styling of the VueJS, Vue-Router, and also
        FastifyJS's websites for inspiration on how to structure the documentation page
        (i.e. Vue's & Vue-Router's use of showing you which part of the page you are on
        on the right, etc.). Otherwise, perhaps put the "citystats.info" text in
        its own mini-hero section (not as large as traditional site hero splash
        images)

**TODO_HOME**

-   [ ] Your Home Page(see pages/General.jsx) should have a simple introduction to what the application
        is, provide simple links to the documentation, and a hero page that dynamically
        loads either day time or night time city landscape images that will transition
        out (3 day, 3 night). The Nav disappear and show hamburger own mobile,
        and otherwise float left for text regarding Home, About, Contact.
-   [ ] Consider adding a "fade" affect visually to the images that mutes the
        contrast of the images against a more or less black/white background.

**NOTES**:

-   PrismJS currently has two prism.css files (okaidia and solarized light).
    This needs to be conditionally rendered based off of user's browser
    preferences and additionally based off a good ol' light/dark toggle button.
    The most "brute-force" way of accomplishing this would be to use two different
    react components that return based off of a simple useState() toggle.

-   On reading some of the React Docs, we have determined that we'll
    need to use useState, useEffect, useMemo, and useDeferredValue hooks
    to grab what we need from the backend citystats API and render it appropriately.
-   On watching [Web Dev Simplified's tutorial](https://www.youtube.com/watch?v=UUga4-z7b6s&pp=ygUsd2ViIGRldiBzaW1wbGlmaWVkIHJlYWN0IGRpcmVjdG9yeSBzdHJ1Y3R1cmU%3D) on organizing a React project's
    directory, structure, I have added certain directories into the src directory
    that have yet to be utilized (see his intermediate and advanced dir structure to
    get a grasp on how best to organize your project here).

**NAVBAR**

Navbar Elements Should Include:

-   Home
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

**FOOTER MENU**
Email, Mastodon, Website
Powered by Linode, NGINX, Docker, React

**BUGS**

-   [ ] If the user refreshes the page more than 5 times, the rate limiter hits.
        Figure out caching of initial data into localStorage. If it doesn't exist,
        register the JSON into localStorage.

**RESOURCES**

-   [FreeCodeCamp - How To Write Good API Documentation](https://www.freecodecamp.org/news/how-to-write-api-documentation-like-a-pro/)
-   [React Official Docs - State A Components Memory](https://react.dev/learn/state-a-components-memory)
-   [React Official Docs - useState](https://react.dev/reference/react/useState)
-   [React Official Docs - useEffect](https://react.dev/reference/react/useEffect)
-   [React Official Docs - useMemo](https://react.dev/reference/react/useMemo)
-   [React Official Docs - useDefferedValue](https://react.dev/reference/react/useDeferredValue)

**ASSETS**

Fonts:

NOTE: Make sure to chmod 644 all files xtracted.

**FURTHER_NOTES**

-   https://gist.github.com/arniebradfo/dc1dcb0793108cfc4cfca8faf0cb15d3
-   https://stackoverflow.com/questions/48047362/how-to-remove-imported-css-in-reactjs

See the above notes regarding conditional rendering of css. Due to the way that
prismJS is implemented in react, there isn't a truly clean way of swapping out
stylesheets (aka, dark and light prismjs code blocks). Thusly if you look at
./src/ThemeSelector.jsx, you'll find the toggleTheme() method to be a bit hacky
of a way to get this functionality working. The above is a much cleaner and well
thought out react hook that I didn't take the time to implement in this version
of the front end.

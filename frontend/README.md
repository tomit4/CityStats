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
-   [x] Add Footer on Mobile Version of site (include mastodon link, github
        link, personal website link, maybe link to license and terms of service,
        etc?, see FOOTER MENU below).
-   [x] Create Desktop Version of Site. Maybe finally choose a Hero Image(s)
        (series of images that fade in and out and change which images get shown
        based off of user's dark/light pref? Basically, show night time shots of
        cities vs day time shots of cities).
-   [x] Add favicon
-   [x] Your Home Page(see pages/Splash.jsx) should have a simple introduction to what the application
        is, provide simple links to the documentation, and a hero page that dynamically
        loads either day time or night time city landscape images that will transition
        out (3 day, 3 night). The Nav disappear and show hamburger own mobile,
        and otherwise float left for text regarding Home, About, Contact.
-   [x] Consider adding a "fade" affect visually to the images that mutes the
        contrast of the images against a more or less black/white background.
-   [x] Refactor CSS. In particular in certain parts of styles.css and
        Nav.css is repeated. Investigate and clean up
-   [x] Refactor JS, particularly in States and Cities components where you have
        TODOS regarding redirecting urlRegex objects into separate utils folder
-   [x] Review semantic HTML-like elements and see if you can improve
        accessibility.
-   [x] Write unit/integration tests in Vitest to 90% code completion.

These python scripts are meant to automate scraping each city's website and grab the new council member's name as well as download their image.

**TODO**:

-   [ ] Adjust script slightly for all 329 cities........
-   [ ] Create a bash script that calls all python scripts within this directory
-   [ ] Add a new js script to parse out new 00\*.json files (including using usually the first returned council_member as the mayor...) and add them to the overarching cities.json file
-   [ ] Update update_states.py to reflect new data structures (should be more simple) and use beautiful soup instead of pandas (pandas has large installation and probably not worth it)
-   [ ] Create cron/celery job to automate when above said bash script is called (every 2 months??)
-   [ ] Use ntfy or nodemailer (or both??) to alert you by message/email when this cron/celery job is complete

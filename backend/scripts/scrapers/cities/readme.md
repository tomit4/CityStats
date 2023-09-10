These python scripts are meant to automate scraping each city's website and grab the new council member's name as well as download their image.

**BUG_FIXES**:

-   [ ] Rewrite Albuquerque(script 003), to just retrieve names, image urls null. Don't bother downloading (too hard to scrape)

**TODO**:

-   [ ] Adjust script slightly for all 329 cities........
-   [ ] Adjust final compression bash script 330 to also write to log\_{date}.txt, and also echo a short message to the terminal and the log that the script is starting.
-   [ ] Add a new js script to parse out new 00\*.json files (including using usually the first returned council_member as the mayor...) and add them to the overarching cities.json file
-   [ ] Update update_states.py to reflect new data structures (should be more simple) and use beautiful soup instead of pandas (pandas has large installation and probably not worth it)
-   [ ] Create cron/celery job to automate when above said bash script is called (every 2 months??)
-   [ ] Use ntfy or nodemailer (or both??) to alert you by message/email when this cron/celery job is complete

**NOTE**:

You can use the run-parts command to run all python scripts in order (thanks to numbering naming scheme), simply navigate to this directory and invoke:

```
run-parts .
```

Note that run-parts will not run anything with an extension (hence no .py extensions).

This directory just holds some web scraping scripts to be integrated into the main repo when you can set up a cron job to run it within docker.

Right now the update_states.py updates the states.json file with the new senators and house_representatives by scraping their respective wikipedia pages. Just copy the db/states.json file to this directory to test it.

The city_council_scraper.py is going to be much more difficult, as each site will be slightly different to parse and wikipedia does not always have the latest city council members since they change so often.

Once each site's unique scraping script is complete, that also can be put on a cron job... I'll admit I'm not sure if this is worth the trouble.

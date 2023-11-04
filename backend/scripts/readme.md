## Scraping New State/City Data

**Run The Scrapers**

1. Navigate to ./scrapers/states/
2. run-parts .
3. Navigate to ./scrapers/states/
4. run-parts .
5. Navigate to ./base and review.
6. If all looks good, copy -r the ./base/states/img/senators/ to ../lib/images/states to place new image files for senators into the server's static/public files directory.
7. Repeat for all states images, including house_delegates and governors
8. Copy -r the json files into the ../db/mock/ directory. The json files should be named appropriately to be parsed by the knex seed files.
9. Once all new images/json files have been appropriately copied into lib/images and db/mock, run:

```
npm run km-up && npm run ks-reseed
```

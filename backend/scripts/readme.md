## Once done with scraping

run:
node parse-cities-2.js &&
cp ../db/mock/base_cities_government.json . &&
node update_mayor.js &&
node update_city_councils.js

Check files thoroughly before uploading to ../db/mock

Once copied to ../db/mock:
run npm run ks-reseed

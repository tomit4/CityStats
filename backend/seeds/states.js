/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states').del()
    await knex('states').insert([
        {
            state_name: 'Alabama',
            state_abbreviation: 'AL',
            date_admitted: '1819-12-14T00:00:00.000Z',
            capital: 'Montgomery',
            largest_city: 'Huntsville',
            govenor: 'Kay Ivey',
            elevation: '500 ft',
            time_zone: 'UTC-6(CST)',
            latitude: "30°11' N to 35° N",
            longitude: "84°53' W to 88°28' W",
            url: 'https://www.alabama.gov/',
            flag_url:
                'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
            insignia_url:
                'https://upload.wikimedia.org/wikipedia/commons/f/f7/Seal_of_Alabama.svg',
        },
        {
            state_name: 'Alaska',
            state_abbreviation: 'AK',
            date_admitted: '1959-01-03T00:00:00.000Z',
            capital: 'Juneau',
            largest_city: 'Anchorage',
            govenor: 'Mike Dunleavy',
            elevation: '1900 ft',
            time_zone: 'UTC-9(AKST)',
            latitude: "51°20'N to 71°50'N",
            longitude: '130°W to 172°E',
            url: 'https://www.alaska.gov/',
            flag_url:
                'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg',
            insignia_url:
                'https://upload.wikimedia.org/wikipedia/commons/9/96/State_Seal_of_Alaska.svg',
        },
    ])
}

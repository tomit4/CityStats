/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_counties').del()
    await knex('cities_counties').insert([
        {
            city_id: 1,
            county_name: 'Taylor',
        },
        {
            city_id: 1,
            county_name: 'Jones',
        },
        {
            city_id: 2,
            county_name: 'Summit',
        },
    ])
}

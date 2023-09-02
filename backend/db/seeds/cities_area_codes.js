/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_area_codes').del()
    await knex('cities_area_codes').insert([
        {
            city_id: 1,
            area_code: 325,
        },
        {
            city_id: 2,
            area_code: 234,
        },
        {
            city_id: 2,
            area_code: 330,
        },
    ])
}

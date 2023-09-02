/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_zip_codes').del()
    await knex('cities_zip_codes').insert([
        { city_id: 1, zip_code: '79601-08' },
        { city_id: 1, zip_code: '79697-99' },
        { city_id: 2, zip_code: '44301-44321' },
        { city_id: 2, zip_code: '44325-44326' },
        { city_id: 2, zip_code: '44328' },
        { city_id: 2, zip_code: '44333-44334' },
        { city_id: 2, zip_code: '44372' },
        { city_id: 2, zip_code: '44396' },
        { city_id: 2, zip_code: '44398' },
    ])
}

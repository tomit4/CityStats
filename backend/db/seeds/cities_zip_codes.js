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
    ])
}

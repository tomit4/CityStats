/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_gnis_ids').del()
    await knex('cities_gnis_ids').insert([
        {
            city_id: 1,
            gnis_feature_id: '1329173',
        },
    ])
}

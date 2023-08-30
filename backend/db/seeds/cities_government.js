/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_government').del()
    await knex('cities_government').insert([
        {
            city_id: 1,
            type: 'Council-Manager',
            mayor: 'Anthony Williams',
        },
        {
            city_id: 2,
            type: 'Mayor-Council',
            mayor: 'Dan Horrigan',
        },
    ])
}

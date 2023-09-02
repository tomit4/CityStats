/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_area').del()
    await knex('cities_area').insert([
        {
            city: '112.09 sq mi',
            land: '21.40 sq mi',
            water: '0.53 sq mi',
        },
        {
            city: '62.27 sq mi',
            land: '61.93 sq mi',
            water: '0.34 sq mi',
        },
    ])
}

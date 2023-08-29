/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_population').del()
    await knex('cities_population').insert([
        {
            city: '112.09 sq mi',
            density: '21.40 sq mi',
            metro: '0.53 sq mi',
        },
    ])
}

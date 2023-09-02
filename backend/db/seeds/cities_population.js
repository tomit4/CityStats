/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_population').del()
    await knex('cities_population').insert([
        {
            city: '125182',
            density: '1157/sq mi',
            metro: '170219',
        },
        {
            city: '190469',
            density: '3075.40/sq mi',
            metro: '702219',
        },
    ])
}

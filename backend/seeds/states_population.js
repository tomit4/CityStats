/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_population').del()
    await knex('states_population').insert([
        {
            state_id: 1,
            total: '5039877',
            density: '99.1/sq mi',
            median_household_income: '$52000',
        },
    ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_state_populations.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_population').del()
    await knex('states_population').insert(mockData)
}

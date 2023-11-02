/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_state_governors.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_governors').del()
    await knex('states_governors').insert(mockData)
}

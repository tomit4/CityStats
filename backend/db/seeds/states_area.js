/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_state_areas.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_area').del()
    await knex('states_area').insert(mockData)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_state_delegates.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_house_delegates').del()
    await knex('states_house_delegates').insert(mockData)
}

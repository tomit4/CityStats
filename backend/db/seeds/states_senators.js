/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_state_senators.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_senators').del()
    await knex('states_senators').insert(mockData)
}

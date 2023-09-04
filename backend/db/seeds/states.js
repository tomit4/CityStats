/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_states.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states').del()
    await knex('states').insert(mockData)
}

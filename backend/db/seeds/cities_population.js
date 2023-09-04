/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_population.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_population').del()
    await knex('cities_population').insert(mockData)
}

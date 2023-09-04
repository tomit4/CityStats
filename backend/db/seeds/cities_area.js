/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_areas.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_area').del()
    await knex('cities_area').insert(mockData)
}

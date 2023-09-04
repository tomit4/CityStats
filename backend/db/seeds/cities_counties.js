/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_counties.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_counties').del()
    await knex('cities_counties').insert(mockData)
}

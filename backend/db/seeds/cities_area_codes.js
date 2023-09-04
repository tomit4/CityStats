/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_areas_codes.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_area_codes').del()
    await knex('cities_area_codes').insert(mockData.slice(0, 500))
    await knex('cities_area_codes').insert(mockData.slice(500, mockData.length))
}

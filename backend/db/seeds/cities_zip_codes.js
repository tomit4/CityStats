/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_zip_codes.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_zip_codes').del()
    await knex('cities_zip_codes').insert(mockData.slice(0, 500))
    await knex('cities_zip_codes').insert(mockData.slice(500, 1000))
    await knex('cities_zip_codes').insert(mockData.slice(1000, 1500))
    await knex('cities_zip_codes').insert(mockData.slice(1500, mockData.length))
}

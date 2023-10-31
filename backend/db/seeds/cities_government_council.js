/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_government_council.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_government_council').del()
    await knex('cities_government_council').insert(mockData.slice(0, 500))
    await knex('cities_government_council').insert(mockData.slice(500, 1000))
    await knex('cities_government_council').insert(mockData.slice(1000, 1500))
    await knex('cities_government_council').insert(mockData.slice(1500, 2000))
    await knex('cities_government_council').insert(mockData.slice(2000, 2500))
    await knex('cities_government_council').insert(mockData.slice(2501, 3000))
    await knex('cities_government_council').insert(
        mockData.slice(3001, mockData.length),
    )
}

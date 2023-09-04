/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_government.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_government').del()
    await knex('cities_government').insert(mockData)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities').del()
    await knex('cities').insert(mockData)
}

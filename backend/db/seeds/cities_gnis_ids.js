/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const mockData = require('../mock/base_cities_gnis_ids.json')
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cities_gnis_feature_ids').del()
    await knex('cities_gnis_feature_ids').insert(mockData)
}

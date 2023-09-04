/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities_gnis_feature_ids', table => {
        table.increments().primary()
        table.integer('city_id').notNullable()
        table.string('gnis_feature_id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities_gnis_feature_ids')
}

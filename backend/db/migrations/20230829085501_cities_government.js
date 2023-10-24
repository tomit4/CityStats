/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities_government', table => {
        table.increments().primary()
        table.integer('city_id').notNullable()
        table.string('type')
        table.string('mayor').notNullable()
        table.string('img_url')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities_government')
}

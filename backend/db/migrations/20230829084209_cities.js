/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities', table => {
        table.increments().primary()
        table.integer('state_id')
        table.string('city_name').notNullable()
        table.string('state_name')
        table.string('coordinates').notNullable()
        table.string('settled_founded')
        table.string('incorporated')
        table.string('elevation').notNullable()
        table.string('time_zone').notNullable()
        table.string('fips_code')
        table.string('url').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cities')
}

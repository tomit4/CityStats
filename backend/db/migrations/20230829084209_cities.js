/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cities', table => {
        table.increments().primary()
        table.integer('state_id').notNullable()
        table.string('city_name').notNullable()
        table.string('state_name').notNullable()
        table.string('coordinates').notNullable()
        table.string('settled_founded').notNullable()
        table.string('incorporated').notNullable()
        table.string('elevation').notNullable()
        table.string('time_zone').notNullable()
        table.string('fips_code').notNullable()
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

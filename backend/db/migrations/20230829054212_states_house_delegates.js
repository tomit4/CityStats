/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('states_house_delegates', table => {
        table.increments().primary()
        table.integer('state_id').notNullable()
        table.string('delegate_name').notNullable()
        table.string('img_url').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('states_house_delegates')
}

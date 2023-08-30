/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_senators').del()
    await knex('states_senators').insert([
        { state_id: 1, senator_name: 'Tommy Tuberville' },
        { state_id: 1, senator_name: 'Katie Britt' },
        { state_id: 2, senator_name: 'Lisa Murkowski' },
        { state_id: 2, senator_name: 'Dan Sullivan' },
    ])
}

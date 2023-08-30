/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_area').del()
    await knex('states_area').insert([
        {
            state_id: 1,
            total: '52419 sq mi',
            land: '50744 sq mi',
            water: '1675 sq mi',
        },
        {
            state_id: 2,
            total: '663268 sq mi',
            land: '571951 sq mi',
            water: '91316 sq mi',
        },
    ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('states_house_delegates').del()
    await knex('states_house_delegates').insert([
        { state_id: 1, delegate_name: 'Jerry Carl' },
        { state_id: 1, delegate_name: 'Barry Moore' },
        { state_id: 1, delegate_name: 'Mike Rogers' },
        { state_id: 1, delegate_name: 'Robert Aderholt' },
        { state_id: 1, delegate_name: 'Dale Strong' },
        { state_id: 1, delegate_name: 'Gary Palmer' },
        { state_id: 1, delegate_name: 'Terri Sewell' },
        { state_id: 2, delegate_name: 'Mary Peltola' },
    ])
}

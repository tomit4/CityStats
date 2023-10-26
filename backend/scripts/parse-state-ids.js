const fs = require('fs')

const jsonData = JSON.parse(fs.readFileSync('./base_states.json'))

const stateIdsAndNames = jsonData.map((data, i) => {
    return {
        state_id: i + 1,
        state_name: data.state_name,
    }
})

fs.writeFileSync(
    'base_states_ids_names.json',
    JSON.stringify(stateIdsAndNames, null, 2),
)

console.log('State Ids And Names Written To base_states_ids_names.json')

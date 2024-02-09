import PropTypes from 'prop-types'
import Code from '../components/Code'

// TODO: Compartmentalize into a separate utils file or something like that
const urlRegexes = {
    singleStateUrl: {
        string: 'https://citystats.xyz/states/1',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)$/,
        canDelUpTo: 29,
        minLength: 24,
    },
    singleStateWithSingleFieldUrl: {
        string: 'https://citystats.xyz/states/1/government',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+$/,
        canDelUpTo: 29,
        minLength: 34,
    },
    singleStateWithSubFieldUrl: {
        string: 'https://citystats.xyz/states/1/government/senators',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+\/[\w]+$/,
        canDelUpTo: 42,
        minLength: 46,
    },
    singleStateWithQueryUrl: {
        string: 'https://citystats.xyz/states/1/government/house_delegates/1',
        regex: /^https:\/\/citystats\.xyz\/states\/(?:\d{1,2}|[\w]+)\/[\w]+\/[\w]+\/\d{1,2}$/,
        canDelUpTo: 58,
        minLength: 59,
    },
}
const stateFields = [
    'state_name',
    'state_abbreviation',
    'date_admitted',
    'capital',
    'largest_city',
    'elevation',
    'time_zone',
    'latitude',
    'longitude',
    'url',
    'flag_url',
    'insignia_url',
    'area',
    'population',
    'government',
]

const stateSubFields = ['governor', 'senators', 'house_delegates']

const States = props => {
    return (
        <>
            <h3 className="page-title">States Queries</h3>
            <div className="section-divider" id="grab-state" />
            <h4>Grab State By Id/Name</h4>
            <Code
                entity="State"
                blur={props.blur}
                url={urlRegexes.singleStateUrl}
                fields={[]}
                subFields={[]}
                componentId={1}
            />
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <div className="section-divider" id="grab-state-with-field" />
            <h4>Grab City With Field</h4>
            <Code
                entity="State"
                blur={props.blur}
                url={urlRegexes.singleStateWithSingleFieldUrl}
                fields={stateFields}
                subFields={[]}
                componentId={2}
            />
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <div className="section-divider" id="grab-state-with-subfield" />
            <h4>Grab City With SubField</h4>
            <Code
                entity="State"
                blur={props.blur}
                url={urlRegexes.singleStateWithSubFieldUrl}
                fields={[]}
                subFields={stateSubFields}
                componentId={3}
            />
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <div className="section-divider" id="grab-state-with-query" />
            <h4>Grab State With Query</h4>
            <Code
                entity="State"
                blur={props.blur}
                url={urlRegexes.singleStateWithQueryUrl}
                fields={[]}
                subFields={[]}
                componentId={4}
            />
            <p>
                States Info Goes here, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </>
    )
}

States.propTypes = {
    blur: PropTypes.bool,
}

export default States

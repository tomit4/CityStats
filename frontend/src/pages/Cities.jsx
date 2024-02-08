import PropTypes from 'prop-types'
import Code from '../components/Code'

/* TODO: A nice feature to bring in would be to add images
 * (consider it, but rendering might be difficult due to
 * variable image sizes, not found images, etc.) */

// TODO: Compartmentalize into a separate utils file or something like that
const urlRegexes = {
    singleCityUrl: {
        string: 'https://citystats.xyz/cities/1',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)$/,
        canDelUpTo: 29,
        minLength: 24,
    },
    singleCityWithSingleFieldUrl: {
        string: 'https://citystats.xyz/cities/1/city_name',
        regex: /^https:\/\/citystats\.xyz\/cities\/(?:\d{1,3}|[\w]+)\/[\w]+$/,
        canDelUpTo: 29,
        minLength: 34,
    },
}
const cityFields = [
    'city_name',
    'state_name',
    'coordinates',
    'settled_founded',
    'incorporated',
    'elevation',
    'time_zone',
    'fips_code',
    'url',
    'counties',
    'government',
    'area',
    'population',
    'zip_codes',
    'area_codes',
    'gnis_feature_ids',
]

const Cities = props => {
    return (
        <>
            <h3 className="page-title">City Queries</h3>
            <div className="section-divider" id="test-one" />
            <h4>Grab Cities By Id</h4>
            <Code
                entity="City"
                blur={props.blur}
                url={urlRegexes.singleCityUrl}
                fields={[]}
                componentId={1}
            />
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="section-divider" id="test-two" />
            <h4>Grab Cities By Id And Field</h4>
            <Code
                entity="City"
                blur={props.blur}
                url={urlRegexes.singleCityWithSingleFieldUrl}
                fields={cityFields}
                componentId={2}
            />
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                City Info Goes Here, Placeholder. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </p>
        </>
    )
}

Cities.propTypes = {
    blur: PropTypes.bool,
}

export default Cities

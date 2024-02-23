/* v8 ignore next 123 */
import PropTypes from 'prop-types'
import Code from '../components/Code'
import { cityUrlParserOpts } from '../utils/url_parser_opts.js'

const Cities = props => {
    const {
        singleCityUrl,
        singleCityWithSingleFieldUrl,
        singleCityWithSubFieldUrl,
        singleCityWithQueryUrl,
        cityFields,
        citySubFields,
    } = cityUrlParserOpts
    return (
        <>
            <h3 className="page-title">City Queries</h3>
            <div className="section-divider" id="grab-city" />
            <h4>Grab City By Id/Name</h4>
            <Code
                entity="City"
                blur={props.blur}
                urlParser={singleCityUrl}
                fields={[]}
                subFields={[]}
                componentId={1}
            />
            <p>
                Similar to the States API, Cities can also be queried by an ID
                number or City Name. You can test this out in the above URL
                form. Just enter any number between 1 and 330, or any city name
                within the US. Only the top 330 most populous cities in the US
                are included in the City Stats API, so keep in mind the API
                might not include statistics about the particular city you have
                in mind. Like the States API, city names are demarcated using an
                underscore, &#34;_&#34;, character instead of a space. (e.g.
                &#34;Los_Angeles&#34;).
            </p>
            <div className="section-divider" id="grab-city-with-field" />
            <h4>Grab City With Field</h4>
            <Code
                entity="City"
                blur={props.blur}
                urlParser={singleCityWithSingleFieldUrl}
                fields={cityFields}
                subFields={[]}
                componentId={2}
            />
            <p>
                You can also specify fields of data on each particular city.
                Allowed fields to query include the following:
            </p>
            <ul className="api-list">
                <li> - city_name</li>
                <li> - state_name</li>
                <li> - coordinates</li>
                <li> - settled_founded</li>
                <li> - incorporated</li>
                <li> - elevation</li>
                <li> - time_zone</li>
                <li> - fips_code</li>
                <li> - url</li>
                <li> - counties</li>
                <li> - government</li>
                <li> - area</li>
                <li> - population</li>
                <li> - zip_codes</li>
                <li> - area_codes</li>
                <li> - gnis_feature_ids</li>
            </ul>
            <div className="section-divider" id="grab-city-with-subfield" />
            <h4>Grab City With SubField</h4>
            <Code
                entity="City"
                blur={props.blur}
                urlParser={singleCityWithSubFieldUrl}
                fields={[]}
                subFields={citySubFields}
                componentId={3}
            />
            <p>
                The Cities API also includes nested subfields that you can pull
                more specific data from. In the above URL, you can request data
                specifically about Abilene&#39;s government, specifically the
                City Council. You can also query the following subfields:
            </p>
            <ul className="api-list">
                <li> - type</li>
                <li> - mayor</li>
            </ul>
            <p>
                There are other subfields you can grab from the &#34;area&#34;
                and &#34;population&#34; fields as well like the &#34;land&#34;,
                &#34;water&#34;, &#34;density&#34;, and &#34;metro&#34;
                subfields.
            </p>
            <div className="section-divider" id="grab-city-with-query" />
            <h4>Grab City With Query</h4>
            <Code
                entity="City"
                blur={props.blur}
                urlParser={singleCityWithQueryUrl}
                fields={[]}
                subFields={[]}
                componentId={4}
            />
            <p>
                You can also grab specific City Council Member&#39;s data from
                the Cities API by specifying their specific &#34;id number&#34;.
                Type in any number between &#34;1&#34; and &#34;50&#34; above.
                New York City has 50 City Council Members at the time of this
                writing, and you can specify which one you&#39;d like to query
                by number with this API endpoint.
            </p>
        </>
    )
}

Cities.propTypes = {
    blur: PropTypes.bool,
}

export default Cities

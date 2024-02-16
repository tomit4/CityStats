import PropTypes from 'prop-types'
import Code from '../components/Code'
import { stateUrlParserOpts } from '../utils/url_parser_opts.js'

const States = props => {
    const {
        singleStateUrl,
        singleStateWithSingleFieldUrl,
        singleStateWithSubFieldUrl,
        singleStateWithQueryUrl,
        stateFields,
        stateSubFields,
    } = stateUrlParserOpts
    return (
        <>
            <h3 className="page-title">States Queries</h3>
            <div className="section-divider" id="grab-state" />
            <h4>Grab State By Id/Name</h4>
            <Code
                entity="State"
                blur={props.blur}
                urlParser={singleStateUrl}
                fields={[]}
                subFields={[]}
                componentId={1}
            />
            <p>
                States can be queried by ID number or by State Name. In the
                above URL form, try typing in any number between 1 and 50!
            </p>
            <p>
                Alternatively, type in your state name! If your state name has a
                space demaracation in it, like &#34;New York&#34;, put an
                underscore character, &#34;_&#34;, where the space would be.
                (e.g. &#34;New_York&#34;).
            </p>
            <div className="section-divider" id="grab-state-with-field" />
            <h4>Grab City With Field</h4>
            <Code
                entity="State"
                blur={props.blur}
                urlParser={singleStateWithSingleFieldUrl}
                fields={stateFields}
                subFields={[]}
                componentId={2}
            />
            <p>
                If you&#39;d prefer to only receive certain fields of data from
                the queried state, you can specify which field of data in
                particular you&#39;re interested in zeroing in on. As you can
                see above, you can query the &#34;government&#34; field, but you
                can also choose others, like the state&#39;s &#34;capital&#34;,
                the &#34;time_zone&#34;. Other accepted fields include:
            </p>
            <ul className="api-list">
                <li> - state_name</li>
                <li> - state_abbreviation</li>
                <li> - date_admitted</li>
                <li> - capital</li>
                <li> - largest_city</li>
                <li> - elevation</li>
                <li> - time_zone</li>
                <li> - latitude</li>
                <li> - longitude</li>
                <li> - url</li>
                <li> - flag_url</li>
                <li> - insignia_url</li>
                <li> - area</li>
                <li> - population</li>
                <li> - government</li>
            </ul>
            <div className="section-divider" id="grab-state-with-subfield" />
            <h4>Grab City With SubField</h4>
            <Code
                entity="State"
                blur={props.blur}
                urlParser={singleStateWithSubFieldUrl}
                fields={[]}
                subFields={stateSubFields}
                componentId={3}
            />
            <p>
                The CityStats API allows for continually querying more deeply
                nested subfields to get more and more specified data returned.
                Above, the senators of the state of Alabama are queried from the
                government field. Other options also include:
            </p>
            <ul className="api-list">
                <li> - governor</li>
                <li> - house_delegates</li>
            </ul>
            <p>
                Although not demonstratable in the above url, one could easily
                grab the subfields in other specific fields within the data set,
                such as &#34;area&#34; field with the &#34;water&#34; subfield,
                etc. using your developer tool of choice.
            </p>
            <div className="section-divider" id="grab-state-with-query" />
            <h4>Grab State With Query</h4>
            <Code
                entity="State"
                blur={props.blur}
                urlParser={singleStateWithQueryUrl}
                fields={[]}
                subFields={[]}
                componentId={4}
            />
            <p>
                If you&#39;d like to grab specific house delegates, you can
                specify each by &#34;id number&#34;. Try typing in any number
                between &#34;1&#34; and &#34;7&#34; above to see the results.
                Alabama, at the time of this writing, has a total of seven
                delegates, try typing in any number between &#34;1&#34; and
                &#34;7&#34; above to see the results.
            </p>
            <p>
                You can also grab the senators from the CityStats Api using your
                programming language of choice.
            </p>
        </>
    )
}

States.propTypes = {
    blur: PropTypes.bool,
}

export default States

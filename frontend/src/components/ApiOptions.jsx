import PropTypes from 'prop-types'
import { HashLink } from 'react-router-hash-link'

const ApiOptions = props => {
    if (props.showStatesLinks) {
        return (
            <>
                <h2 className="nav-menu-title">States API Options</h2>
                <nav>
                    <ul className="api-list">
                        <li className="api-list-item">
                            <HashLink
                                onClick={props.toggleFromAnchor}
                                className="page-nav nav-link"
                                to="/states#grab-state"
                            >
                                Grab State By Id/Name
                            </HashLink>
                        </li>
                        <li className="api-list-item">
                            <HashLink
                                onClick={props.toggleFromAnchor}
                                className="page-nav nav-link"
                                to="/states#grab-state-with-field"
                            >
                                Grab State With Field
                            </HashLink>
                        </li>
                        <li className="api-list-item">
                            <HashLink
                                onClick={props.toggleFromAnchor}
                                className="page-nav nav-link"
                                to="/states#grab-state-with-subfield"
                            >
                                Grab State With SubField
                            </HashLink>
                        </li>
                        <li className="api-list-item">
                            <HashLink
                                onClick={props.toggleFromAnchor}
                                className="page-nav nav-link"
                                to="/states#grab-state-with-query"
                            >
                                Grab State With Query
                            </HashLink>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
    return (
        <>
            <h2 className="nav-menu-title">Cities API Options</h2>
            <nav>
                <ul className="api-list">
                    <li className="api-list-item">
                        <HashLink
                            onClick={props.toggleFromAnchor}
                            className="page-nav nav-link"
                            to="/cities#grab-city"
                        >
                            Grab City By Id/Name
                        </HashLink>
                    </li>
                    <li className="api-list-item">
                        <HashLink
                            onClick={props.toggleFromAnchor}
                            className="page-nav nav-link"
                            to="/cities#grab-city-with-field"
                        >
                            Grab City With Field
                        </HashLink>
                    </li>
                    <li className="api-list-item">
                        <HashLink
                            onClick={props.toggleFromAnchor}
                            className="page-nav nav-link"
                            to="/cities#grab-city-with-subfield"
                        >
                            Grab City With SubField
                        </HashLink>
                    </li>
                    <li className="api-list-item">
                        <HashLink
                            onClick={props.toggleFromAnchor}
                            className="page-nav nav-link"
                            to="/cities#grab-city-with-query"
                        >
                            Grab City With Query
                        </HashLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

ApiOptions.propTypes = {
    showStatesLinks: PropTypes.bool,
    toggleFromAnchor: PropTypes.func,
}

export default ApiOptions

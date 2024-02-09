import PropTypes from 'prop-types'
import { HashLink } from 'react-router-hash-link'

const ApiOptions = props => {
    if (props.showStatesLinks) {
        return (
            <>
                <div className="nav-menu-title">States API Options</div>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#grab-state"
                >
                    Grab State By Id/Name
                </HashLink>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#grab-state-with-field"
                >
                    Grab State With Field
                </HashLink>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#grab-state-with-subfield"
                >
                    Grab State With SubField
                </HashLink>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#grab-state-with-query"
                >
                    Grab State With Query
                </HashLink>
            </>
        )
    }
    return (
        <>
            <div className="nav-menu-title">Cities API Options</div>
            <HashLink
                onClick={props.toggleFromAnchor}
                className="page-nav nav-link"
                to="/cities#grab-city"
            >
                Grab City By Id/Name
            </HashLink>
            <HashLink
                onClick={props.toggleFromAnchor}
                className="page-nav nav-link"
                to="/cities#grab-city-with-field"
            >
                Grab City With Field
            </HashLink>
            <HashLink
                onClick={props.toggleFromAnchor}
                className="page-nav nav-link"
                to="/cities#grab-city-with-subfield"
            >
                Grab City With SubField
            </HashLink>
            <HashLink
                onClick={props.toggleFromAnchor}
                className="page-nav nav-link"
                to="/cities#grab-city-with-query"
            >
                Grab City With Query
            </HashLink>
        </>
    )
}

ApiOptions.propTypes = {
    showStatesLinks: PropTypes.bool,
    toggleFromAnchor: PropTypes.func,
}

export default ApiOptions

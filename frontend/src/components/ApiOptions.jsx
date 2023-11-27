import PropTypes from 'prop-types'
import { NavHashLink } from 'react-router-hash-link'

const ApiOptions = props => {
    if (props.showStatesLinks) {
        return (
            <>
                <div className="nav-menu-title">States API Options</div>
                <NavHashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#test"
                >
                    States Element One
                </NavHashLink>
                <NavHashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#test"
                >
                    States Element Two
                </NavHashLink>
            </>
        )
    } else {
        return (
            <>
                <div className="nav-menu-title">Cities API Options</div>
                <NavHashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/cities#test"
                >
                    Cities Element One
                </NavHashLink>
                <NavHashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/cities#test"
                >
                    Cities Element Two
                </NavHashLink>
            </>
        )
    }
}

ApiOptions.propTypes = {
    showStatesLinks: PropTypes.bool,
    toggleFromAnchor: PropTypes.func,
}

export default ApiOptions

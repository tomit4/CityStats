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
                    to="/states#test"
                >
                    States Element One
                </HashLink>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/states#test"
                >
                    States Element Two
                </HashLink>
            </>
        )
    } else {
        return (
            <>
                <div className="nav-menu-title">Cities API Options</div>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/cities#test-one"
                >
                    Cities Element One
                </HashLink>
                <HashLink
                    onClick={props.toggleFromAnchor}
                    className="page-nav nav-link"
                    to="/cities#test-two"
                >
                    Cities Element Two
                </HashLink>
            </>
        )
    }
}

ApiOptions.propTypes = {
    showStatesLinks: PropTypes.bool,
    toggleFromAnchor: PropTypes.func,
}

export default ApiOptions

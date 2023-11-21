import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './css/Nav.css'

const Nav = props => {
    const primaryNav = useRef(null)
    const navToggle = useRef(null)
    // TODO: Review wittcode's coverage of how to clean up useEffect
    useEffect(() => {
        if (props.sidebar) {
            primaryNav.current.setAttribute('data-visible', false)
            navToggle.current.setAttribute('aria-expanded', false)
            props.showSidebar()
        }
    }, [props])
    const toggleHamburger = () => {
        const visibility =
            primaryNav.current.getAttribute('data-visible') === 'false'
                ? false
                : true
        primaryNav.current.setAttribute('data-visible', !visibility)
        navToggle.current.setAttribute('aria-expanded', !visibility)
        props.blurIt()
    }
    return (
        <>
            <header className="primary-header flex">
                <div className="nav-bg" />
                <button
                    type="button"
                    className="mobile-nav-toggle"
                    aria-controls="primary-navigation"
                    aria-expanded="false"
                    ref={navToggle}
                    onClick={toggleHamburger}
                >
                    <span className="sr-only"> Menu </span>
                </button>
                <nav>
                    <ul
                        id="primary-navigation"
                        data-visible="false"
                        className="primary-navigation flex"
                        ref={primaryNav}
                    >
                        {/* TODO: Render components based off of Nav links here.
                            Consider react-router or more simple 
                            approach using conditional statements. */}
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                        <li className="active">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">Crew</a>
                        </li>
                        <li>
                            <a href="#">Technology</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

Nav.propTypes = {
    sidebar: PropTypes.bool,
    showSidebar: PropTypes.func,
    blurIt: PropTypes.func,
}

export default Nav

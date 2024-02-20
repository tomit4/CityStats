import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../css/Nav.css'
import ApiOptions from './ApiOptions'
import { useThemeUpdate } from '../contexts/useThemeUpdate'

const Nav = props => {
    const toggleTheme = useThemeUpdate()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const primaryNav = useRef(null)
    const navToggle = useRef(null)
    const homeToggle = useRef(null)
    const homeTextToggle = useRef(null)
    const apiToggle = useRef(null)
    const toggleLinks = useRef({})
    const themeToggle = useRef(null)
    const [showStatesLinks, toggleStateLinks] = useState(true)
    const prefersDark = useRef(
        document.documentElement.getAttribute('data-citystats-theme'),
    )

    useEffect(() => {
        if (pathname === '/cities') {
            apiToggle.current.checked = true
            toggleStateLinks(false)
        }
    }, [pathname, showStatesLinks])

    useEffect(() => {
        if (props.sidebar) {
            primaryNav.current.setAttribute('data-visible', false)
            navToggle.current.setAttribute('aria-expanded', false)
            props.showSidebar()
        }
    }, [props])

    const toggleHamburger = () => {
        const visibility =
            primaryNav.current.getAttribute('data-visible') === 'true'
        primaryNav.current.setAttribute('data-visible', !visibility)
        navToggle.current.setAttribute('aria-expanded', !visibility)
        props.blurIt()
    }

    const toggleLightDark = () => {
        const themePref = toggleTheme()
        themeToggle.current.setAttribute('data-toggled', !themePref)
        navToggle.current.setAttribute('data-toggled', !themePref)
        homeToggle.current.setAttribute('data-toggled', !themePref)
        homeTextToggle.current.setAttribute('data-toggled', !themePref)
    }

    const toggleFromAnchor = () => toggleHamburger()

    const saveToggleRef = id => elementRef => {
        toggleLinks.current[id] = elementRef
    }

    const toggleNavLinks = () => {
        toggleStateLinks(!showStatesLinks)
        const currentToggleLink = toggleLinks.current['states-api-toggle']
        const alternateToggleLink = toggleLinks.current['cities-api-toggle']
        const currentToggleValue =
            currentToggleLink.getAttribute('data-toggled') === 'true'
        currentToggleLink.setAttribute('data-toggled', !currentToggleValue)
        alternateToggleLink.setAttribute('data-toggled', currentToggleValue)
        const targetRoute = !currentToggleValue ? '/states' : '/cities'
        navigate(targetRoute)
    }

    const handleEnterKeyPress = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            apiToggle.current.checked = !apiToggle.current.checked
            toggleNavLinks()
        }
    }

    return (
        <>
            <header className="primary-header flex">
                <div className="nav-bg">
                    <Link
                        className="icons nav-home-link"
                        data-toggled={prefersDark.current}
                        ref={homeToggle}
                        data-testid="home-btn"
                        to="/"
                    />
                    <br />
                    <Link
                        className="nav-home-link-text"
                        data-toggled={prefersDark.current}
                        ref={homeTextToggle}
                        to="/"
                    >
                        Home
                    </Link>
                    <button
                        type="button"
                        className="icons mobile-nav-toggle"
                        aria-controls="primary-navigation"
                        aria-expanded="false"
                        data-toggled={prefersDark.current}
                        ref={navToggle}
                        onClick={toggleHamburger}
                        data-testid="nav-toggle"
                    >
                        <span className="sr-only"> Menu </span>
                    </button>
                    <button
                        type="button"
                        className="icons dark-light-toggle"
                        aria-label="Toggle Dark/Light Mode"
                        data-toggled={prefersDark.current}
                        ref={themeToggle}
                        onClick={toggleLightDark}
                        data-testid="toggle-theme-btn"
                    >
                        <span className="sr-only"> Light/Dark </span>
                    </button>
                </div>
                <nav>
                    <ul
                        id="primary-navigation"
                        data-visible="false"
                        className="primary-navigation flex"
                        ref={primaryNav}
                    >
                        <label
                            onKeyDown={e => handleEnterKeyPress(e)}
                            className="switch"
                            data-testid="toggle-switch"
                        >
                            <input
                                type="checkbox"
                                role="switch"
                                aria-checked="true"
                                ref={apiToggle}
                                onChange={toggleNavLinks}
                                tabIndex="0"
                            />
                            <span tabIndex="0" className="slider" />
                        </label>
                        <div
                            className="nav-link toggle-link"
                            ref={saveToggleRef('states-api-toggle')}
                            data-toggled="true"
                            id="states-api-toggle"
                        >
                            States
                        </div>
                        <div
                            className="nav-link toggle-link"
                            ref={saveToggleRef('cities-api-toggle')}
                            data-toggled="false"
                            id="cities-api-toggle"
                        >
                            Cities
                        </div>
                        <ApiOptions
                            showStatesLinks={showStatesLinks}
                            toggleFromAnchor={toggleFromAnchor}
                        />
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

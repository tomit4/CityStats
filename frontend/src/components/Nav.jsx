import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../css/Nav.css'
import ApiOptions from './ApiOptions'
import { useThemeUpdate } from '../contexts/useThemeUpdate'

const Nav = props => {
    const toggleTheme = useThemeUpdate()
    const navigate = useNavigate()
    const primaryNav = useRef(null)
    const navToggle = useRef(null)
    const homeToggle = useRef(null)
    const apiToggle = useRef(null)
    const toggleLinks = useRef({})
    const themeToggle = useRef(null)
    const [showStatesLinks, toggleStateLinks] = useState(true)
    const prefersDark = useRef(
        document.documentElement.getAttribute('data-citystats-theme'),
    )

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
    return (
        <>
            <header className="primary-header flex">
                <div className="nav-bg">
                    <Link
                        className="icons nav-home-link"
                        data-toggled={prefersDark.current}
                        ref={homeToggle}
                        to="/"
                    />
                    <button
                        type="button"
                        className="icons mobile-nav-toggle"
                        aria-controls="primary-navigation"
                        aria-expanded="false"
                        data-toggled={prefersDark.current}
                        ref={navToggle}
                        onClick={toggleHamburger}
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
                        <label className="switch">
                            <input
                                type="checkbox"
                                ref={apiToggle}
                                onChange={toggleNavLinks}
                            />
                            <span className="slider" />
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

import { useEffect, useRef } from 'react'
import './css/Nav.css'

export default function Nav(props) {
    const primaryNav = useRef(null)
    const navToggle = useRef(null)
    // TODO: Review wittcode's coverage of how to clean up useEffect
    // TODO: Figure out props validation...
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
    }
    return (
        <>
            <header className="primary-header flex">
                {/* TODO: Rename className */}
                <div className="head-experiment" />
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
                    <span className="transparent-overlay" />
                    <ul
                        id="primary-navigation"
                        data-visible="false"
                        className="primary-navigation flex"
                        ref={primaryNav}
                    >
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

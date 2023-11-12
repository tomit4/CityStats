import { useRef } from 'react'
import './css/Nav.css'

export default function Nav() {
    const primaryNav = useRef(null)
    const navToggle = useRef(null)
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

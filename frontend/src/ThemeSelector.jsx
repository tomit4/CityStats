import React, { useRef, useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

const ThemeSelector = ({ children }) => {
    const prefersLight = useRef(
        window.matchMedia('(prefers-color-scheme: light)').matches,
    )
    const prefersDark = useRef(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    )

    const [darkTheme, setDarkTheme] = useState(false)

    const toggleTheme = () => {
        setDarkTheme(prevDarkTheme => !prevDarkTheme)
    }

    return (
        <>
            <ThemeContext.Provider value={darkTheme}>
                <ThemeUpdateContext.Provider value={toggleTheme}>
                    <React.Suspense fallback={<div />}>
                        {prefersLight.current && <LightTheme />}
                        {prefersDark.current && <DarkTheme />}
                    </React.Suspense>
                    {children}
                </ThemeUpdateContext.Provider>
            </ThemeContext.Provider>
        </>
    )
}

export default ThemeSelector

ThemeSelector.propTypes = {
    children: PropTypes.node.isRequired,
}

import React, { useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

/* TODO: Address fast refresh warnings from eslint */
export function useTheme() {
    return useContext(ThemeContext)
}
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

const ThemeSelector = ({ children }) => {
    const [prefersDark, setPrefersDark] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    )
    const [prefersLight, setPrefersLight] = useState(
        window.matchMedia('(prefers-color-scheme: light)').matches,
    )

    /* NOTE: This problem has been thought of extensively by
     * others far more skilled than you (see ../README.md)
     * Hacky workaround to get prismjs stylesheets to
     * toggle on and off depending on dark/light mode */
    const toggleTheme = () => {
        if (document.styleSheets.length === 3) {
            document.styleSheets[2].disabled = true
        }
        if (document.styleSheets.length === 4) {
            document.styleSheets[3].disabled = document.styleSheets[2].disabled
            document.styleSheets[2].disabled = !document.styleSheets[2].disabled
        }
        setPrefersLight(prevLightTheme => prevLightTheme)
        setPrefersDark(prevDarkTheme => !prevDarkTheme)
    }

    return (
        <>
            <ThemeContext.Provider value={prefersDark}>
                <ThemeUpdateContext.Provider value={toggleTheme}>
                    <React.Suspense fallback={<div />}>
                        {prefersLight && <LightTheme />}
                        {prefersDark && <DarkTheme />}
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

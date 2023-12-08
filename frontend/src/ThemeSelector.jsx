import React, { useState } from 'react'
import { ThemeUpdateContext } from './contexts/ThemeUpdateContext.jsx'
import PropTypes from 'prop-types'
const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))

// TODO: Have Dark Mode Saved in localStorage
// (change immediately on finding prefersDark setting)
const ThemeSelector = ({ children }) => {
    const [prefersDark, setPrefersDark] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    )

    /* NOTE: Hacky workaround to get prismjs stylesheets to
     * toggle on and off depending on dark/light mode (see ./README.md) */
    const toggleTheme = () => {
        setPrefersDark(prevDarkTheme => !prevDarkTheme)
        if (document.styleSheets.length === 3) {
            document.styleSheets[2].disabled = true
        }
        if (document.styleSheets.length === 4) {
            document.styleSheets[3].disabled = document.styleSheets[2].disabled
            document.styleSheets[2].disabled = !document.styleSheets[2].disabled
        }
        document.documentElement.setAttribute(
            'data-citystats-theme',
            !prefersDark,
        )
        return prefersDark
    }

    return (
        <>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                <React.Suspense fallback={<div />}>
                    {!prefersDark && <LightTheme />}
                    {prefersDark && <DarkTheme />}
                </React.Suspense>
                {children}
            </ThemeUpdateContext.Provider>
        </>
    )
}

export default ThemeSelector

ThemeSelector.propTypes = {
    children: PropTypes.node.isRequired,
}

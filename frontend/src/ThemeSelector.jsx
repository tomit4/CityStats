import React, { useState } from 'react'
import { ThemeUpdateContext } from './contexts/ThemeUpdateContext.jsx'
import PropTypes from 'prop-types'
const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))

const ThemeSelector = ({ children }) => {
    const [prefersDark, setPrefersDark] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    )

    let localPref = localStorage.getItem('data-citystats-theme')
    if (localPref === null) {
        localStorage.setItem('data-citystats-theme', prefersDark)
    } else {
        localStorage.setItem('data-citystats-theme', localPref)
    }
    localPref = localPref === 'true'
    document.documentElement.setAttribute('data-citystats-theme', localPref)

    const toggleTheme = () => {
        setPrefersDark(prevDarkTheme => !prevDarkTheme)
        /* NOTE: Hacky workaround to get prismjs stylesheets to
         * toggle on and off depending on dark/light mode (see ./README.md) */
        if (document.styleSheets.length === 5)
            document.styleSheets[4].disabled = true
        if (document.styleSheets.length === 6) {
            document.styleSheets[5].disabled = document.styleSheets[4].disabled
            document.styleSheets[4].disabled = !document.styleSheets[4].disabled
        }
        document.documentElement.setAttribute(
            'data-citystats-theme',
            !localPref,
        )
        localStorage.setItem('data-citystats-theme', !localPref)
        return localPref
    }

    return (
        <>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                <React.Suspense fallback={<div />}>
                    {!localPref && <LightTheme />}
                    {localPref && <DarkTheme />}
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

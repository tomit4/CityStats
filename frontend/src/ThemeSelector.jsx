import React from 'react'
import PropTypes from 'prop-types'

const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))

const ThemeSelector = ({ children }) => {
    return (
        <>
            <React.Suspense fallback={() => null}>
                {window.matchMedia('(prefers-color-scheme: light)').matches && (
                    <LightTheme />
                )}
                {window.matchMedia('(prefers-color-scheme: dark)').matches && (
                    <DarkTheme />
                )}
            </React.Suspense>
            {children}
        </>
    )
}

export default ThemeSelector

ThemeSelector.propTypes = {
    children: PropTypes.node.isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'

const LightTheme = React.lazy(() => import('./themes/Lighttheme.jsx'))
const DarkTheme = React.lazy(() => import('./themes/Darktheme.jsx'))
const prefersLight =
    window.matchMedia('(prefers-color-scheme: light)').matches ||
    window.matchMedia('(prefers-color-scheme: no-preference)').matches
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const ThemeSelector = ({ children }) => {
    return (
        <>
            <React.Suspense fallback={<div />}>
                {prefersLight && <LightTheme />}
                {prefersDark && <DarkTheme />}
            </React.Suspense>
            {children}
        </>
    )
}

export default ThemeSelector

ThemeSelector.propTypes = {
    children: PropTypes.node.isRequired,
}

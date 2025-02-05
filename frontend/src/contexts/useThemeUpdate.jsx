import { useContext } from 'react'
import { ThemeUpdateContext } from './ThemeUpdateContext'
export function useThemeUpdate() {
    // NOTE: Better way to ensure returnVal of ThemeUpdateContext is not undefined
    // const themeContext = useContext(ThemeUpdateContext);
    // if (themeContext === undefined) throw new Error("ThemeSelector must wrap main App.jsx")
    // return themeContext
    return useContext(ThemeUpdateContext)
}

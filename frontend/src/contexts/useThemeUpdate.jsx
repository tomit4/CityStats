import { useContext } from 'react'
import { ThemeUpdateContext } from './ThemeUpdateContext'
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

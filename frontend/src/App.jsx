import { createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import './styles.css'
import ThemeSelector from './ThemeSelector'
export const ThemeContext = createContext()

export default function App() {
    return (
        <ThemeSelector>
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        </ThemeSelector>
    )
}

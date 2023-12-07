import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import './css/styles.css'
import ThemeSelector from './ThemeSelector'

export default function App() {
    return (
        <ThemeSelector>
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        </ThemeSelector>
    )
}

import { useState } from 'react'
import Body from './Body'
import Nav from './Nav'

export default function App() {
    const [sidebar, setSidebar] = useState(false)
    const [blur, setBlur] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const blurIt = () => setBlur(!blur)
    const [theme, toggleTheme] = useState('light')
    const setTheme = () => toggleTheme(theme === 'light' ? 'dark' : 'light')
    return (
        <>
            <Nav
                blurIt={blurIt}
                sidebar={sidebar}
                showSidebar={showSidebar}
                theme={theme}
                setTheme={setTheme}
            />
            <Body
                blur={blur}
                blurIt={blurIt}
                sidebar={sidebar}
                showSidebar={showSidebar}
                theme={theme}
            />
            {/* <Footer /> */}
        </>
    )
}

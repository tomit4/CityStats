import { useState } from 'react'
import Body from './Body'
import Nav from './Nav'

export default function App() {
    const [sidebar, setSidebar] = useState(false)
    const [blur, setBlur] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const blurIt = () => setBlur(!blur)
    // TODO: establish dark light button in nav
    const [theme, setTheme] = useState('dark')
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

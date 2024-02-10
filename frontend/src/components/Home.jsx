import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Body from './Body'
import Nav from './Nav'
import Splash from '../pages/Splash.jsx'

export default function App() {
    const [sidebar, setSidebar] = useState(false)
    const [blur, setBlur] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const blurIt = () => setBlur(!blur)
    const { pathname } = useLocation()
    if (pathname === '/') {
        return (
            <>
                <Splash />
            </>
        )
    }
    return (
        <>
            <Nav blurIt={blurIt} sidebar={sidebar} showSidebar={showSidebar} />
            <Body
                blur={blur}
                blurIt={blurIt}
                sidebar={sidebar}
                showSidebar={showSidebar}
            />
            {/* <Footer /> */}
        </>
    )
}

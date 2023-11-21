import { useState } from 'react'
import Body from './components/Body'
import Nav from './components/Nav'
import './styles.css'

export default function App() {
    const [sidebar, setSidebar] = useState(false)
    const [blur, setBlur] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const blurIt = () => setBlur(!blur)
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

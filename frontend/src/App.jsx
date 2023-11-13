import { useState } from 'react'
import Body from './components/Body'
import Nav from './components/Nav'
import './styles.css'

export default function App() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <Nav sidebar={sidebar} showSidebar={showSidebar} />
            <Body showSidebar={showSidebar} />
            {/* <Footer /> */}
        </>
    )
}

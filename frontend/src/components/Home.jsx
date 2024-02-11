import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Body from './Body'
import Nav from './Nav'
import Splash from '../pages/Splash.jsx'

export default function Home() {
    const [sidebar, setSidebar] = useState(false)
    const [blur, setBlur] = useState(false)
    const { pathname } = useLocation()
    const fadeRef = useRef(null)

    const showSidebar = () => setSidebar(!sidebar)
    const blurIt = useCallback(() => {
        setBlur(prevBlur => !prevBlur)
    }, [])

    const delay = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        const prevPath = sessionStorage.getItem('previousPathname')
        sessionStorage.setItem('previousPathname', pathname)

        const isGoingHomeFromApp =
            (prevPath === '/states' || prevPath === '/cities') &&
            pathname === '/'

        if (fadeRef.current && (isGoingHomeFromApp || prevPath === '/')) {
            fadeRef.current.classList.add('fade-in')
            if (blur) blurIt()
        }

        const cleanup = async () => {
            await delay(600)
            if (fadeRef.current.classList.contains('fade-in'))
                fadeRef.current.classList.remove('fade-in')
        }
        cleanup()
    }, [pathname, blur, blurIt])

    if (pathname === '/') {
        return (
            <>
                <div ref={fadeRef}>
                    <Splash />
                </div>
            </>
        )
    }
    return (
        <>
            <div ref={fadeRef}>
                <Nav
                    blurIt={blurIt}
                    sidebar={sidebar}
                    showSidebar={showSidebar}
                />
                <Body
                    blur={blur}
                    blurIt={blurIt}
                    sidebar={sidebar}
                    showSidebar={showSidebar}
                />
                {/* <Footer /> */}
            </div>
        </>
    )
}

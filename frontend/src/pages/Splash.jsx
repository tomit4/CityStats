import { Link } from 'react-router-dom'
import '../css/Splash.css'

export default function Splash() {
    const theme = localStorage.getItem('data-citystats-theme')
    return (
        <>
            <section data-citystats-theme={theme} className="home-hero">
                <div data-citystats-theme={theme} className="container">
                    <h1 data-citystats-theme={theme} className="title">
                        CityStats API
                    </h1>
                    <span data-citystats-theme={theme} className="subtitle">
                        Get Statistics On US States And Cities
                    </span>
                    <Link
                        data-citystats-theme={theme}
                        className="link"
                        to="/states"
                    >
                        Click Here To Get Started
                    </Link>
                </div>
            </section>
        </>
    )
}

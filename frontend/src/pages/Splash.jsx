import { Link } from 'react-router-dom'
import '../css/Splash.css'

export default function Splash() {
    return (
        <>
            <section className="home-hero">
                <div className="container">
                    <h1 className="title">CityStats API</h1>
                    <span className="subtitle">
                        A Simple API For Statistics On US Cities and States
                    </span>
                    <Link className="link" to="/states">
                        Click Here To Get Started
                    </Link>
                </div>
            </section>
        </>
    )
}

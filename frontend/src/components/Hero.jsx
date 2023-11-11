import React from 'react'
import heroImage from '../assets/images/city_lights_usa_01.jpg'

export default function Hero() {
    return (
        <>
            {/* Just testing images, add picture/srcset for responsiveness */}
            <img className="hero-image" src={heroImage} alt="" />
        </>
    )
}

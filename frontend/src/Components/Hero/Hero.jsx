import React from 'react'
import './Hero.css'
import hero_img from '../Assets/HeroImagep.png'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="hero">
             <div className="hero-left">
                 <h2>Latest Arrivals</h2>
                 <div>
                 <p>New</p>
                 <p>Collections</p>
                 <p>For Everyone</p>
             </div>
            <div className="latest-btn">
                <div> <Link style={{textDecoration: 'none', color: "#fff"}} to="/mens">Latest Collections →</Link></div>
            </div>
            </div>
           <div className="hero-right"> 
               <img src={hero_img} alt="" className="hero-image"/>
           </div>
        </div>
    )
}

export default Hero
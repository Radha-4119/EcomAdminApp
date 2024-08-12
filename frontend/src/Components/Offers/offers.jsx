import React from 'react' 
import './Offers.css'
import {Link} from 'react-router-dom'

import ad_img from '../Assets/Exclusive-ImageBg.png'

const Offers = () => {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>Only On Best Selling Products.</p>
                <button><Link style={{textDecoration: 'none', color: '#fff'}} to="/womens">Check More →</Link></button>
            </div>
            <div className="offers-right"> 
             <img src={ad_img} alt="" className="ad-image"/>
            </div>
        </div>
    )
}

export default Offers
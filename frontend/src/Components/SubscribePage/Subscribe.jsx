import React from 'react' 
import './Subscribe.css'

const Subscribe = () => {
    return (
        <div className="subscribe">
            <h1>Get Exclusive Offers to Your MailBox.</h1>
            <p>Subscribe and Stay Updated.</p>
            <div>
                <input type="email" placeholder='Your Email Id'/>
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default Subscribe
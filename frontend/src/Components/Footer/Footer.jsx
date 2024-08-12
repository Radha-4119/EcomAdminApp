import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/Footer-Logo.jpg'
import instagram_logo from '../Assets/instagram_icon.jpeg'
import pinterest_logo from '../Assets/pinterest_icon.png'
import whatsapp_logo from '../Assets/Whatsapp_icon.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" className="footer-img"/>
                <p>eCom</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offers</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">
                 <div className="socialmedia-logo">
                    <img src={instagram_logo} alt="" className="logo-size"/>
                 </div>
                 <div className="socialmedia-logo">
                    <img src={pinterest_logo} alt="" className="logo-size"/>
                 </div>
                 <div className="socialmedia-logo">
                    <img src={whatsapp_logo} alt="" className="logo-size"/>
                 </div>
            </div>
            <div className="footer-copyright">
                 <hr/>
                 <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer 
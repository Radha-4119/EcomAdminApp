import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/E-comLogo.jpg'
import profilelogo from '../../assets/profile-picture-icon-bg.png'

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={navlogo} alt="" className="nav-logo"/>
            <img src={profilelogo} alt="" className="profile-logo"/>
        </div>
    )
}

export default Navbar 
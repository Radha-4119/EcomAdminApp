import React, {useState, useContext, useRef} from 'react' 
import './Navbar.css'

import logo from '../Assets/E-comLogo.jpg'
import cart_logo from '../Assets/shopping-trolley-icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropDownIcon.png'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();


    const navBarDropDown = (e) => {
          menuRef.current.classList.toggle("nav-menu-visible");
          e.target.classList.toggle('open');
    }

    return (
        <div className="navbar fixed">
             <div className="nav-logo">
                <Link to="/"> 
                    <img src={logo} alt="e-com" className="ecom-logo"/>
                </Link>
                <p>Com</p> 
             </div>
             <ul ref={menuRef} className="list-items">
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "shop" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "womens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link> {menu === "mens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === "kids" ? <hr/> : <></>}</li>
            </ul>
            <img src={nav_dropdown} onClick={navBarDropDown} alt="" className="dropDownMenu"/>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ? <button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                : <Link to='/login'><button type="button">Login</button></Link>}
                
                <Link to='/cart'><img src={cart_logo} alt="" className="logo-cart"/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
        
    )
}

export default Navbar
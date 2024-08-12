import React from 'react' 
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addtocartimage from '../../assets/product-add-to-cart-bg.png'
import productlist from '../../assets/check-list-product.png'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to={'/addproduct'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={addtocartimage} alt="" className="addtocartimage"/>
                    <p>Add Products</p>
                </div>
            </Link>

            <Link to={'/listproduct'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={productlist} alt="" className="productlist"/>
                    <p>Products List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
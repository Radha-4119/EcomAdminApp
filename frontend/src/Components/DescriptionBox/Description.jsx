import React from 'react'
import './Description.css'

const DescriptionBox = () => {
    return (
        <div className="description-box">
            <div className="description-navigator">
                <div className="description-nav-box">Description</div>
                <div className="description-nav-box fade">Reviews (88)</div>
            </div>
            <div className="description-box-text">
                <p>
                E-commerce offers a wide range of benefits for both businesses and 
                consumers. For businesses, it provides a wider reach to a global 
                audience, lowers operational costs, and allows for easier data 
                collection and analysis. For consumers, e-commerce offers 
                convenience, competitive prices, a wider selection of products, 
                and the ability to shop from anywhere at any time.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox
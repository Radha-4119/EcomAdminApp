import React, { useContext } from 'react' 
import './ProductDisplay.css'
import star_icon from '../Assets/star-icon.png'
import empty_icon from '../Assets/emptystar-icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
     const {product} = props;

     const {addToCart} = useContext(ShopContext);
    return (
        <div className="productdisplay content-wrapper"> 
           <div className="productdisplay-left">
               <div className="productdisplay-img-list">
                   <img src={product.image} alt=""/>
                   <img src={product.image} alt=""/>
                   <img src={product.image} alt=""/>
                   <img src={product.image} alt=""/>
               </div>
               <div className="productdisplay-img">
                  <img className="productdisplay-main-img" src={product.image} alt=""/>
               </div>
           </div>
           <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" className="staricon-size"/>
                    <img src={star_icon} alt="" className="staricon-size"/>
                    <img src={star_icon} alt="" className="staricon-size"/>
                    <img src={star_icon} alt="" className="staricon-size"/>
                    <img src={empty_icon} alt="" className="staricon-size"/>
                    <p>(101)</p>
                </div>
                 <div className="productdisplay-right-prices">
                      <div className="productdisplay-right-price-old">${product.old_price}</div>
                      <div className="productdisplay-right-price-new">${product.new_price}</div>
                 </div>
                 <div className="productdisplay-right-description">
                 Upgrade your wardrobe with our modern and trendy kurtas & T-Shits, Party Shirts, for Men and Women 
                 and make a bold fashion statement wherever you go. Shop now and experience 
                 the perfect blend of tradition and modernity.         
                 </div>
                 <div className="productdisplay-right-size">
                      <h1>Select Size</h1>
                    <div className="productdisplay-right-size">
                         <div>S</div>
                         <div>M</div>
                         <div>L</div>
                         <div>XL</div>
                         <div>XXL</div>
                    </div>
                 </div>
                 <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                 <p className="productdisplay-right-category"><span>Category: </span> Womens & Mens and Kids, T-Shirts, Crop Tops & Long Gowns.</p>
                 <p className="productdisplay-right-category"><span>Tags: </span> Modern, Latest</p>

           </div>
        </div>
    )
}

export default ProductDisplay
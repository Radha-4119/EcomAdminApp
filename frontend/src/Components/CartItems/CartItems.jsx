import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import delete_icon from '../Assets/delete-bin.png'


const CartItems = () => {
    const {all_products, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext)
    return (
        <div className="cart-Items">
              <div className="cart-Items-Main">
                  <p>Products</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                  <p>Delete</p>
              </div>
              <hr/>
             {all_products.map((e)=>{
                if(cartItems[e.id]>0) {
                    return <div>
                    <div className="cartItems-format cart-Items-Main">
                        <img src={e.image} alt="" className="cartIcon-product-icon"/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className="cartItems-quantity">{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img src={delete_icon} onClick={()=>{removeFromCart(e.id)}} alt="" className="delete-icon"/>
                    </div>
                    <hr/>
                 </div>
                }
                return null;
             })}
             <div className="cartItems-card">
                 <div className="cartItems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartItem-total-Item">
                           <p>SubTotal</p>
                           <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartItem-total-Item">
                             <p>Shipping Fee</p>
                             <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartItem-total-Item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                 </div>
                 <div className="promocode-of-cartItems">
                      <p>Enter Promo Code</p>
                      <div className="promoCard-box"> 
                           <input type="text" placeholder='Promo Code'/>
                           <button>Submit</button>
                      </div>
                 </div>
             </div>
        </div>
    )
}

export default CartItems
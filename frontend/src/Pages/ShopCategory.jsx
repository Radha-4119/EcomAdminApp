import React, { useState, useContext } from 'react' 
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import dropdown_img from '../Components/Assets/sort-amount-down-alt.png'



const ShopCategory = (props) => {
     const { all_products } = useContext(ShopContext);
     const [noOfElements, setNoOfElements] = useState({
         women: 4,
         men: 4,
         kid: 4,
     });
 
     const exploreMore = (category) => {
         setNoOfElements((prev) => ({
             ...prev,
             [category]: prev[category] + 4,
         }));
     };
 
     return (
         <>
             <div className="shop-category">
                 <img src={props.banner} alt="" className="shopcategory-banner" />
 
                 <div className="shopcart-indexsort">
                     <p>
                         <span>Showing 1-{Math.min(noOfElements[props.category], all_products.filter(item => item.category === props.category).length)}</span>
                        out of {all_products.filter(item => item.category === props.category).length} {props.category} products
                     </p>
                     <div className="shopcategory-sort">
                         Sort By <img src={dropdown_img} alt="" />
                     </div>
                 </div>
 
                 <div className="shopcategory-products">
                     {all_products.filter(item => item.category === props.category).slice(0, noOfElements[props.category]).map((item, i) => (
                         <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                     ))}
                 </div>
 
                 <div onClick={() => exploreMore(props.category)} className="shopcategory-loadmore">
                     Explore More
                 </div>
             </div>
         </>
     );
 };

export default ShopCategory;
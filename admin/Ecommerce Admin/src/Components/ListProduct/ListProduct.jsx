import React, {useEffect, useState} from 'react'
import './ListProduct.css'
import delete_icon from '../../assets/delete-bin.png'

const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([]);
    
    const fetchInfo = async () => {
          await fetch('http://localhost:4000/allproducts')
          .then((res) => res.json())
          .then((data) => {setAllProducts(data)});
    }
  
    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
         }, 
         body: JSON.stringify({id:id})
        })

       await fetchInfo();
    }

     return (
        <div className="list-product">
             <h1>All Products List</h1>
             <div className="list-products-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
             </div>
             <div className="list-all-product">
                <hr/> 
                 
                {allProducts.map((product, index) => {
                    return <> <div key={index} className="list-products-main list-of-product-format">
                        <img src={product.image} className="listproduct-product-image"/>        
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => {remove_product(product.id)}} className='list-product-icon' src={delete_icon} alt=""/>
                    </div>
                  <hr/>
                  </>
               })}
                </div>
                
        </div>
     )
}

export default ListProduct
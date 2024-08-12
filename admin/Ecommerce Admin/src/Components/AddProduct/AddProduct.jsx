import React, {useState} from 'react'
import './AddProduct.css'
import upload_img from '../../assets/thumbnail-upload-img.png'

const AddProduct = () => {

     const [image, setImage] = useState(false);
     const [productDetails, setProductDetails] = useState({
           name: "",
           image: "",
           category: "women",
           new_price: "",
           old_price: ""
     });


     const imageHandler = (e) => {
          setImage(e.target.files[0]);
     }
    
     const productHandler = (e) => {
          setProductDetails({...productDetails, [e.target.name] :e.target.value});
     }
    
     const Add_Product = async () => {
           console.log(productDetails);     
           let responseData; 
           let product = productDetails;

           let formData = new FormData();
           formData.append('product', image);

           await fetch('http://localhost:4000/upload', {
               method: 'POST',
               headers: {
                    Accept: 'application/json',
               },
               body:formData,
           }).then((res)=> res.json())
             .then((data) => {responseData = data})

             if(responseData.success){
                 product.image = responseData.image_url;
                 console.log(product);
                 await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',      
                    },
                    body: JSON.stringify(product),
                 }).then((res) => res.json())
                   .then((data) => {
                    data.success ? alert("Product Added"): alert ("Failed")
                   })
               }
     }

     return (
        <div className="add-product">
          <div className="addproduct-items">   
              <p>Product Title</p>
              <input value={productDetails.name} onChange={productHandler} type="text" name="name" placeholder="Type Here"/>
          </div>
          <div className="addproduct-price">
             <div className="addproduct-items">
                  <p>Price</p>
                  <input value={productDetails.old_price} onChange={productHandler} type="text" name="old_price" placeholder="Type Here"/>  
             </div>
             <div className="addproduct-items">
                  <p>Offer Price</p>
                  <input value={productDetails.new_price} onChange={productHandler} type="text" name="new_price" placeholder="Type Here"/>  
             </div>
          </div>
           <div className="addproduct-items">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={productHandler} name="category" className="add-product-selection">
                     <option value="women">Women</option>
                     <option value="men">Men</option>
                     <option value="kid">Kid</option>
                </select>   
           </div>
           <div className="addproduct-items">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image):upload_img} className="addproduct-upload-img" alt=""/>
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
           </div>
           <button onClick={() => {Add_Product()}} className="addproduct-btn">ADD</button>
        </div>
     )
}

export default AddProduct 
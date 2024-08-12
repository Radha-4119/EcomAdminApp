import React, {useContext} from 'react' 
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/Description';
import ReleatedProducts from '../Components/RelatedProducts/ReleatedProducts';

const Product = () => {
    const {all_products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_products.find((e) => e.id === Number(productId))
    return (
         <div>
             <Breadcrum product={product}/>
             <ProductDisplay product={product}/>
             <DescriptionBox />
             <ReleatedProducts />
         </div>
    )
}

export default Product
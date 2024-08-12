import React, {useState, useEffect} from 'react' 
import './NewCollections.css'

import Item from '../Item/Item'



const NewCollections = () => {

      const [all_inproducts, setAll_inproducts] = useState([]);    

      useEffect(() => {
           fetch('http://localhost:4000/popularinall')
           .then((response) =>response.json())
           .then((data) =>setAll_inproducts(data))
      }, [])

    return (
        <div className="new-collections">
            <h1>New Collections</h1>
            <hr/>
            <div className="collections">
            {all_inproducts.map((item, i) => {
                      return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                 })}

            </div>
        </div>
    )
}

export default NewCollections
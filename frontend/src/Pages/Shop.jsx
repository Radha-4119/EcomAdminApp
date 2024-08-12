import React from 'react' 
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/offers'
import NewCollections from '../Components/NewCollections/NewCollections';
import Subscribe from '../Components/SubscribePage/Subscribe';



function Shop() {
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections/>
            <Subscribe/>
            
        </div>
    );
}

export default Shop
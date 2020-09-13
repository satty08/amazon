import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image" 
                    src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Superhero_UK_Acquisition_FT_Apr_20/f4b165f5-678a-48bb-a049-11e7ddc2168d._UR3000,600_SX1500_FMwebp_.jpg" 
                    alt="" />
            </div>
            <div className="home__row">
                {/* Product */}
                <Product 
                    title="The lean Startup"
                    price={29.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                    rating={3}
                 />
                {/* Product */}
                <Product />
            </div>
            <div className="home__row">
                {/* Product */}
                <Product />
                {/* Product */}
                <Product />
                {/* Product */}
                <Product />
            </div>
            <div className="home__row">
                {/* Product */}
                <Product />
            </div>
        </div>
    )
}

export default Home

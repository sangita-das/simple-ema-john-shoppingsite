import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const {products, initialCart} = useLoaderData (); // return {products: products, initialCart: initialCart};
    //eta paowa jabe
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (id) => {
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

     const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }



    return (
        <div className="shop-container">
            {/* <h2>This is orders: {products.length}</h2> */}
            {/* <p>Initial Cart: {initialCart.length}</p> */}
            {/* <p>Initial Cart: {cart.length}</p> */}

            <div className="orders-container">
            {
                cart.map(product => <ReviewItem
                 key={product.id}
                 product={product}
                 handleRemoveItem = {handleRemoveItem}
                ></ReviewItem>)
            }

            {
                cart.length === 0 && <h2>No Items for Review. Please shop <Link to="/">Please Shop More.</Link> </h2>
            }

            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;
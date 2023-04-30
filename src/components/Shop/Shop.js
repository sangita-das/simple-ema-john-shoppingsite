import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from "react-router-dom";


const Shop = () => {
    const products = useLoaderData();
    // const [products, setProducts] = useState([]);
        const [cart, setCart] = useState([])



/*     useEffect( () => {
        console.log('products load before fetch');
        fetch('products.json')
    .then(res => res.json())
    .then(data => setProducts(data))

    }, []); */


    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    useEffect ( () => {
        console.log('Local Storage first line');
        const storedCart = getStoredCart();
        const savedCart = [];

        for(const id in storedCart){
            // console.log(id);
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity =quantity;
                console.log(addedProduct);
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart)

    }, [products])

   const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart= [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id)
    }
   
    return (
        <div className="shop-container">
            <div className="products-container">
                <h3>This is for products: {products.length}</h3>

                {
                    products.map(product => <Product
                    key={product.id}
                    product={product}
                    handleAddToCart = {handleAddToCart}
                    >

                    </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart clearCart={clearCart} cart={cart}></Cart>
               <Link to="/orders">
                <button>Review Order</button>
               </Link>
            </div>
        </div>
    );
};

export default Shop;
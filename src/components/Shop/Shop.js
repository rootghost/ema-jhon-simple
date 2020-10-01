import React, { useState, useEffect } from 'react';
import fakedata from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const first10 = fakedata.slice(0,10);
    const [products,setProduct] = useState([]);
    const [cart,setCart] = useState([])

    useEffect(() =>{
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    },[])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByKeys',{
           method : "POST",
           headers : {'content-type' : "application/json"},
           body : JSON.stringify(productKeys)
       })
       .then(res => res.json())
       .then( data =>{
        setCart(data)
       })
    },[])

    const handleAddProduct = (product) =>{
        
        const toBeAddedkey = product.key;
        const Sameproduct = cart.find(pd => pd.key === toBeAddedkey);
      
        let count = 1;
        let newCart;
        if(Sameproduct){
            // console.log(Sameproduct.quantity)
            count = Sameproduct.quantity + 1;
           
            Sameproduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [...others,Sameproduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className="twin-container">
           <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} addToCart="true" handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review"> <button className="add-button">Review order</button></Link>
               </Cart>
            </div>

        </div>
 
    );
};

export default Shop;
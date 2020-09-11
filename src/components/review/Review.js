import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Review Item/Reviewitem';
import "../Shop/Shop.css";
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlace,setOrderPlace] = useState(false)

    const history = useHistory()
    const  handleProceedCheckOut = () =>{
        history.push("/shipment")
    }
    const removeProduct = (productkey) =>{
       
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }
    useEffect(()=>{
       const savedCart =  getDatabaseCart();
       const productKeys = Object.keys(savedCart);
      
       const CartProduct = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key)
          
           product.quantity = savedCart[key];
           return product;
        })
        setCart(CartProduct)

    },[])
    let thankyou;
    if(orderPlace){
       thankyou =  <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
             {
              thankyou

           }
           <div className="product-container">
                
                {
                    cart.map(pd=> <Reviewitem removeProduct={removeProduct}  product={pd}></Reviewitem>)
                }
           </div>
         
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="add-button">Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;
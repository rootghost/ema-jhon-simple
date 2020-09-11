import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,prd)=>total+prd.price,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        
        total = total + product.price * product.quantity ;
        
        
    }
    let shipping = 0;
    if(total>15){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total+shipping+Number(tax)).toFixed(2);
    return (
        <div>
                <h4>order summery</h4>
                <p>items ordered: {cart.length}</p>
                <p><small>Shipping cost: {shipping}</small></p>
                <p>product cost:{total}</p>
                <p>Tax + vat:{tax}</p>
                <p>Total price: {grandTotal}</p>
                <br/>
                {
                    props.children
                }
              
        </div>
    );
};

export default Cart;
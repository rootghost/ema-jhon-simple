import React from 'react';

const Reviewitem = (props) => {
   
    const  removeProduct = props.removeProduct;
    const {name,quantity,key,price} = props.product;
    return (
        <div>
            <h5>{name}</h5>
            <p>Quantity : {quantity}</p>
            <br/>
            <p>price:{price}</p>
            <button onClick={()=>removeProduct(key)} className="add-button">Remove</button>
        </div>
    );
};

export default Reviewitem;
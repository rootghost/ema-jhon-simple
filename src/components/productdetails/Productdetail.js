import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productkey} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{

        fetch(`https://limitless-refuge-15832.herokuapp.com/product/${productkey}`)
        .then(res => res.json())
        .then(data => setProduct(data))

    },[productkey])

    return (
        <div>
           
            <Product product={product}></Product>
        </div>
    );
};

export default Productdetail;
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productkey} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{

        fetch(`http://localhost:5000/product/${productkey}`)
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
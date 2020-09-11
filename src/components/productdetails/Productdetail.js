import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Productdetail = () => {
    const {productkey} = useParams();
    const product = fakeData.find(pd => pd.key === productkey)
    return (
        <div>
           
            <Product product={product}></Product>
        </div>
    );
};

export default Productdetail;
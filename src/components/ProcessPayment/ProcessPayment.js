import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import SimpleCardform from './SimpleCardform';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51HZzLqKTGlpo5w0F9uU1cXwCU6d2vHD0ZxioNtuDnK46GlXCS3KbzswdUjyMGLzXrF9ZNcT83MDR7puLLptMVwMQ00AhdEgDt3');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <SimpleCardform handlePayment={handlePayment}></SimpleCardform>
        </Elements>
    );
};

export default ProcessPayment;
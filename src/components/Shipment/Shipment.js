import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { useState } from 'react';

const Shipment = () => {

    const [logInUser,setLogInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();

    const [shippingData,setShippingData] = useState(null)

    const onSubmit = data => {
        setShippingData(data)
    };

    const handlePaymentSuccess = (paymentId) =>{
      const savedCart = getDatabaseCart();
      const orderdDetail = {...logInUser,products : savedCart, shipment : shippingData,paymentId,orderTime : new Date()}
      fetch("https://limitless-refuge-15832.herokuapp.com/addOrder",{
        method : "POST",
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(orderdDetail)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder();
          alert("your order placed successfully")
        }
      })
    }
  
    console.log(watch("example")); // watch input value by passing the name of it

    document.title="Shipment"
  
    return (
      <div className="row">
        <div style={{display: shippingData ? "none" : "block"}} className="col-md-6">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={logInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Email is required</span>}

            <input name="email" defaultValue={logInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
            {errors.email && <span className="error">Email is required</span>}
            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}
            <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
            {errors.phone && <span className="error">Phone  is required</span>}
            <input type="submit" />
            </form>
        </div>
        <div style={{display: shippingData ? "block" : "none"}} className="col-md-6">
              <h1>please pay for me</h1>
              <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>       
        </div>
      </div>
    );
};

export default Shipment;
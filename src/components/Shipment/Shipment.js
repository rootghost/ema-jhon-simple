import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {

    const [logInUser,setLogInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderdDetail = {...logInUser,products : savedCart, shipment : data}
        fetch("http://localhost:5000/addOrder",{
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
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
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
    );
};

export default Shipment;
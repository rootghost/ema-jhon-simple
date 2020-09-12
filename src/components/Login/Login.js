import React, { useState } from 'react';
import { useContext } from 'react';
import {  UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeloginFrameWork, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LogInManager';




function Login() {
 
  //these state is for module 41 and 42
  const [user,setUser] = useState({
    isSignIn: false,
    newUser: false,
    email:"",
    password: "",
    name: "",
    photo:"",
    error:"",
    success: false
  })

  initializeloginFrameWork();
  


  const [logInUser,setlogInUser] = useContext(UserContext);
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: "/" } };

  const [newUser,setNewUser] = useState(false);

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }

  const signOut =() =>{
    handleSignOut()
    .then(res =>{
        handleResponse(res,false);
    })
  }
   
  const handleResponse = (res,redirect) =>{
    setUser(res);
    setlogInUser(res);
    if(redirect){
      history.replace(from);
  }
  }


  //on Change function
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === "email"){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        
    }
    if (e.target.name === "password") {
       const isPasswordValid = e.target.value.length > 6;
       const isPasswordHasNumber = /\d{1}/.test(e.target.value);
       isFieldValid = isPasswordHasNumber && isPasswordValid;
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name]= e.target.value;
      setUser(newUserInfo)
    }
  }


  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
       createUserWithEmailAndPassword(user.name,user.email,user.password)
       .then(res =>{
         setUser(res);
         setlogInUser(res);
         history.replace(from);
       })
    }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email,user.password)
        .then(res =>{
          setUser(res);
          setlogInUser(res);
          history.replace(from);
        })
      }
      e.preventDefault();
  }
  
 
  return (

    <div style={{textAlign:"center"}}>


      {/* these are module 41 example */}


       {
         user.isSignIn ?  <button onClick={signOut}>Sign out</button> :  <button onClick={googleSignIn}>Sign in</button>
       }
        {
          user.isSignIn && 
       <div>
          <p>Name: {user.name}</p>
          <p>email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
        }


        {/* here module 42 start */}
        <h1>our own authintication system</h1>
         <input onChange={()=> setNewUser(!newUser)} name="newuser" type="checkbox"/>
         <label htmlFor="newuser"> new user sign up</label>
       <form onSubmit={handleSubmit}>
            { 
               newUser &&< input type="text" name="name" required onBlur={handleBlur} placeholder="your name"/> 
              
            }
            <br/>
            <input type="text" name="email" onBlur={handleBlur} required placeholder="write your email address"/>
            <br/>
            <input type="password" name="password" onBlur={handleBlur} required placeholder="write your password"/>
            <br/>
            <input onClick={handleSubmit} type="submit" value={newUser? "Sign Up":"Sign In"}/>
       </form>

       <p style={{color:"red"}}>{user.error}</p>

      {
        user.success && <p style={{color:"green"}}>user {newUser?'created' : "Logged" }successfully</p>
      }


    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './Firebaseconfig';
import { useContext } from 'react';
import {  UserContext } from '../../App';
firebase.initializeApp(firebaseConfig);

function Login() {
  var provider = new firebase.auth.GoogleAuthProvider();
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
  const [logIn,setLogIn] = useContext(UserContext);
  //this is for sign in
  const signInWithGoogle =() =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,photoURL,email} = res.user;
      var userInfo = {
        isSignIn: true,
        email : email,
        name: displayName,
        photo: photoURL,
      

      }
      setUser(userInfo)
    })
  }
  //this is for sign out
  const handleSignOut = () =>{
      firebase.auth().signOut()
      .then(()=>{
        var userInfo = {
          isSignIn:false,
          email : '',
          Name: '',
          photo: ''
  
        }
        setUser(userInfo);
      })
  }
  //42 module function
  const [newUser,setNewUser] = useState(false);

  

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
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          const newUserInfo = {...user};
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name)

        })
        .catch(function(error) {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
      }
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          const newUserInfo = {...user};
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo)
          setLogIn(newUserInfo);
        })
        .catch(function(error) {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
      }
      e.preventDefault();
  }
  const updateUserName = userName => {
    var user = firebase.auth().currentUser;

   user.updateProfile({
  displayName: userName
}).then(function() {
  console.log('user name update successfully');
}).catch(function(error) {
  // An error happened.
});
  }
 
  return (

    <div style={{textAlign:"center"}}>


      {/* these are module 41 example */}


       {
         user.isSignIn ?  <button onClick={handleSignOut}>Sign out</button> :  <button onClick={signInWithGoogle}>Sign in</button>
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

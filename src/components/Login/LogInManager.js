import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./Firebaseconfig";

export const initializeloginFrameWork = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn =() =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,photoURL,email} = res.user;
      var userInfo = {
        isSignIn: true,
        email : email,
        name: displayName,
        photo: photoURL,
        success: true
      

      }
      return userInfo;
    })
  }

export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then(()=>{
      var userInfo = {
        isSignIn:false,
        email : '',
        Name: '',
        photo: ''

      }
      return userInfo;
    })
    
}

export const createUserWithEmailAndPassword = (name,email,password) =>{
        return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res =>{
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.success = true;
          updateUserName(name)
          return newUserInfo;

        })
        .catch(function(error) {
          const newUserInfo = {}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
          
        });

}

export const signInWithEmailAndPassword = (email,password) =>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res=>{
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch(function(error) {
          const newUserInfo = {}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
         return newUserInfo;
        });
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


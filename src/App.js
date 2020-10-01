import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/review/Review';
import Product from './components/Product/Product';
import Productdetail from './components/productdetails/Productdetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Manage from './components/manage/Manage';

export const UserContext =  createContext();

function App() {
  const [logInUser,setLogInUser] = useState({})
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]} >
        <Router>

            <Header></Header>
            <Switch>
                <Route path="/shop">
                    <Shop></Shop>
                </Route>
                <Route path="/review">
                      <Review></Review>
                </Route>
                <Route exact path="/">
                      <Shop></Shop>
                </Route>
                <Route path="/product/:productkey">
                      <Productdetail></Productdetail>
                </Route>
                <Route exact path="/login">
                      <Login></Login>
                </Route>
                <PrivateRoute path="/orders">
                      <Manage></Manage>
                </PrivateRoute>
                <PrivateRoute exact path="/shipment">
                    <Shipment></Shipment>
                </PrivateRoute>
                <Route path="*">
                    <Nomatch></Nomatch>
                </Route>
            </Switch>
        </Router>
      
       
        
    </UserContext.Provider>
  );
}

function Nomatch(){
  return (
    <div>
      <h5>Page not found</h5>
    </div>
  )
}

export default App;

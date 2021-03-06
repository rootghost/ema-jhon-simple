import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [logInUser,setLogInUser] = useContext(UserContext);
    return (
        <div className="header">
           <img src={logo} alt=""/>
           <nav>
               <Link to="/shop">Shop</Link>
               <Link to="/review">Order Review</Link>
               <Link to="/orders"> Manage Inventory</Link>
               <button onClick={()=>setLogInUser({})}>Sign Out</button>
           </nav>
        </div>
    );
};

export default Header;
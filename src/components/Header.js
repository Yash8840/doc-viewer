import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./Header.css";

const Header = (props) => {
  const authCtx = useContext(AuthContext)
 const navigate = useNavigate();

 const logoutHandler = ()=>{
  authCtx.logoutHandler();
  // authCtx.isLoggedIn=false
  props.handleSignOut();
  navigate('/')
 }
  
  return (
    <div className="header">
      <nav className="nav-content">
        <div className="nav-logo">
          <a href="www.website.com">
            <img src="https://i.imgur.com/cBBxvvn.png" />
          </a>
        </div>

        <div className="menu-list">
          <ul id="menu">
            
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

import React from "react";
import {Link} from "react-router-dom"
import './nav.scss';

const Nav = () => {
  return(
    <div className="nav-background">
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
    </div>
  )
}
 
export default Nav;
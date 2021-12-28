import React from "react";
import Nav from '../nav/nav'
import './home.scss'

const Home = () => {
  return(
    <div className="home-wrapper">
      <Nav/>
      <div className="home-content">
        <h3 className="home-header">Hello this is Form app, use the navigation above</h3>
      </div>
    </div>
  )
}
 
export default Home;
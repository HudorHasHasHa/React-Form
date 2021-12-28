import React from "react";
import './image.scss'
import unnamed from '../../images/unnamed.png';

const Image = ({img}) => {
  return(
    <div className="image-wrapper">
      <div className="image-content">
        <img src={img !== null ? URL.createObjectURL(img) : unnamed} alt="error"/>
      </div>
    </div>
  )
}
 
export default Image;
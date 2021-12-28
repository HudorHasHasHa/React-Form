import React from "react";
import ReactDOM from "react-dom";
import './overlay.scss';

const Overlay = (loading) => {
  return ReactDOM.createPortal(
    <div className="overlay">

    </div>,
    document.querySelector('#overlay')
  )
}

export default Overlay
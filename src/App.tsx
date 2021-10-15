import React from "react";
import spikeLogo from './img/spikeLogo.png'
import shopLogo from './img/shopLogo.png'
import userLogo from './img/userLogo.png'

export function App() {
  return (
    <div className="wrapper">
      <header>
        <div className="headerLeft">
          <img  src={spikeLogo} className="spikeLogo"/>
          <div className="headerInfo">
            <h3>Spikes shop</h3>
            <p>Best shoes for running</p>
          </div>
        </div>
        <ul className="headerRight">
          <li>
            <img src={shopLogo} className="shopLogo"/>
            <span>0 rub.</span>
          </li>
          <li>
            <img src={userLogo} className="userLogo"/>
          </li>
        </ul>
      </header>
      <div className="content">
        <h1>All shoes</h1>
        ...
      </div>
    </div>
  );
}

import React from "react";
import spikeLogo from "./img/spikeLogo.png";
import shopLogo from "./img/shopLogo.png";
import userLogo from "./img/userLogo.png";
import plusSign from "./img/plus-sign.svg";
import nikeMaxfly from "./img/Nike/Nike_Air_Zoom_Maxfly/Nike_Air_Zoom_Maxfly_1.png";
import searchLogo from "./img/searchLogo.png";
import filterLogo from "./img/filterLogo.png";
import crossLogo from "./img/crossLogo.png";

export function App() {
  return (
    <div className="wrapper">
       <div className="overlay">
         <div className="drawer">
           <h2>Basket</h2>

           
           <div className="cartItem">
             <img src={nikeMaxfly} height={70} width={70}/>
             <div>
               <p>Nike Air Zoom Maxfly</p>
               <b>525 $</b>
             </div>
             <button> 
             <img src={crossLogo} width={15} height={15} />
             </button>
           </div>
           <div className="cartItem">
             <img src={nikeMaxfly} height={70} width={70}/>
             <div>
               <p>Nike Air Zoom Maxfly</p>
               <b>525 $</b>
             </div>
             <button> 
             <img src={crossLogo} width={15} height={15} />
             </button>
           </div>
          

          <div className="cartTotalblock">
           <ul>
             <li>
               <span>Totall:</span>
               <div></div>
               <b>525 $</b>
             </li>
             <li>
             <span>Taxes 5%</span>
               <div></div>
               <b>10 $</b>
             </li>
           </ul>
           <button>Checkout</button>
           </div>
         </div>
         </div> 


      <header>
        <div className="headerLeft">
          <img src={spikeLogo} className="spikeLogo" />
          <div className="headerInfo">
            <h3>Spikes shop</h3>
            <p>Best shoes for running</p>
          </div>
        </div>
        <ul className="headerRight">
          <li>
            <img src={shopLogo} width={22} height={22} />
            <span>0 $</span>
          </li>
          <li>
            <img src={userLogo} width={22} height={22} />
          </li>
        </ul>
      </header>
      <div className="content">
        <div className="searchFilterLine">
          <h1>All shoes</h1>
          <div className="searchAndFilter">
            <div className="search">
              <img src={searchLogo} width={11} height={11} />
              <input placeholder="Search..." />
            </div>
            <div className="filter">
              <img src={filterLogo} width={12} height={12} />
              <select>
                <option>By price</option>
                <option>Nike</option>
                <option>Adidas</option>
              </select>
            </div>
          </div>
        </div>
        <div className="allPositions">
          <div className="position">

            <img
              src={nikeMaxfly}
              width={133}
              height={133}
              className="imageCard"
            />
            <h5>Nike Air Zoom Maxfly</h5>
            <div className="cardBottom">
              <div>
                <span>Cost: </span>
                <b>525 $</b>
              </div>
              <button>
                <img src={plusSign} width={11} height={11} />
              </button>
            </div>
          </div>
          <div className="position">
            <img
              src={nikeMaxfly}
              width={133}
              height={133}
              className="imageCard"
            />
            <h5>Nike Air Zoom Maxfly</h5>
            <div className="cardBottom">
              <div>
                <span>Cost: </span>
                <b>525 $</b>
              </div>
              <button>
                <img src={plusSign} width={11} height={11} />
              </button>
            </div>
          </div>
          <div className="position">
            <img
              src={nikeMaxfly}
              width={133}
              height={133}
              className="imageCard"
            />
            <h5>Nike Air Zoom Maxfly</h5>
            <div className="cardBottom">
              <div>
                <span>Cost: </span>
                <b>525 $</b>
              </div>
              <button>
                <img src={plusSign} width={11} height={11} />
              </button>
            </div>
          </div>
          <div className="position">
            <img
              src={nikeMaxfly}
              width={133}
              height={133}
              className="imageCard"
            />
            <h5>Nike Air Zoom Maxfly</h5>
            <div className="cardBottom">
              <div>
                <span>Cost: </span>
                <b>525 $</b>
              </div>
              <button>
                <img src={plusSign} width={11} height={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

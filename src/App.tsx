import React from "react";
import spikeLogo from "./img/spikeLogo.png";
import shopLogo from "./img/shopLogo.png";
import userLogo from "./img/userLogo.png";
import plusSign from "./img/plus-sign.svg";
import nikeMaxfly from "./img/Nike/Nike_Air_Zoom_Maxfly/Nike_Air_Zoom_Maxfly_1.png";

export function App() {
  return (
    <div className="wrapper">
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
        <h1>All shoes</h1>
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

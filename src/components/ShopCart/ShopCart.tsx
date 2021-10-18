import React from "react";
import crossLogo from "./crossLogo.png";
import nikeMaxfly from "./Nike_Air_Zoom_Maxfly_1.png";
import style from "./ShopCart.module.scss"

export function ShoppingCart() {
  return (
    <div style={{ display: "none" }} className={style.overlay}>
      <div className={style.drawer}>
        <div className={style.basketTop}>
          <h2>Basket</h2>
          <button>
            <img src={crossLogo} width={15} height={15} />
          </button>
        </div>

        <div className={style.cartItem}>
          <img src={nikeMaxfly} height={70} width={70} />
          <div>
            <p>Nike Air Zoom Maxfly</p>
            <b>525 $</b>
          </div>
          <button>
            <img src={crossLogo} width={15} height={15} />
          </button>
        </div>
        <div className={style.cartItem}>
          <img src={nikeMaxfly} height={70} width={70} />
          <div>
            <p>Nike Air Zoom Maxfly</p>
            <b>525 $</b>
          </div>
          <button>
            <img src={crossLogo} width={15} height={15} />
          </button>
        </div>

        <div className={style.cartTotalblock}>
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
  );
}

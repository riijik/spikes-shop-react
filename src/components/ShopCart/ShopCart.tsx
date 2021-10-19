import React from "react";
import crossLogo from "./crossLogo.png";
import nikeMaxfly from "./Nike_Air_Zoom_Maxfly_1.png";
import style from "./ShopCart.module.scss";
import { Product } from "../interface";

export function ShoppingCart({
  closeShopCart,
  positionList = [],
}: {
  closeShopCart: () => void;
  positionList: Product[];
}) {
  return (
    <div className={style.overlay}>
      <div className={style.drawer}>
        <div className={style.basketTop}>
          <h2>Basket</h2>
          <button>
            <img
              src={crossLogo}
              width={15}
              height={15}
              onClick={closeShopCart}
            />
          </button>
        </div>
        {positionList.map((position) => (
          <div className={style.cartItem}>
            <img src={position.image} height={70} width={70} />
            <div>
              <p>{position.model}</p>
              <b>{position.price} $</b>
            </div>
            <button>
              <img src={crossLogo} width={15} height={15} />
            </button>
          </div>
        ))}

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

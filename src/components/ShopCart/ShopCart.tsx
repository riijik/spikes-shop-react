import React from "react";
import crossLogo from "./crossLogo.png";
import style from "./ShopCart.module.scss";
import { Product } from "../interface";

export function ShoppingCart({
  closeShopCart,
  positionList = [],
  deleteFromCart
}: {
  closeShopCart: () => void;
  positionList: Product[];
  deleteFromCart: (id: number) => void
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
          <div className={style.cartItem} key={position.id}>
            <img src={position.image} height={70} width={70} />
            <div>
              <p>{position.model}</p>
              <b>{position.price} $</b>
            </div>
            <button onClick={()=> deleteFromCart(position.id)}>
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

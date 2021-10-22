import React from "react";
import style from "./ShopCart.module.scss";
import { Product } from "../interface";

export function ShoppingCart({
  closeShopCart,
  positionList = [],
  deleteFromCart,
}: {
  closeShopCart: () => void;
  positionList: Product[];
  deleteFromCart: (id: number) => void;
}) {
  return (
    <div className={style.overlay}>
      <div className={style.drawer}>
        <div className={style.basketTop}>
          <h2>Basket</h2>
          <button>
            <img
              src="/image/Symbols/crossLogo.png"
              width={15}
              height={15}
              onClick={closeShopCart}
              alt="cross"
            />
          </button>
        </div>
        {positionList.length !== 0 ? (
          <div className={style.items}>
            {positionList.map((position) => (
              <div className={style.cartItem} key={position.id}>
                <img
                  src={position.image}
                  height={70}
                  width={70}
                  alt="position"
                />
                <div>
                  <p>{position.model}</p>
                  <b>{position.price} $</b>
                </div>
                <button onClick={() => deleteFromCart(position.id)}>
                  <img
                    src="/image/Symbols/crossLogo.png"
                    width={15}
                    height={15}
                    alt="cross"
                  />
                </button>
              </div>
            ))}
            <div className={style.cartTotalblock}>
              <ul>
                <li>
                  <span>Totall:</span>
                  <div></div>
                  <b>{positionList.reduce(sumPrice, 0)} $</b>
                </li>
                <li>
                  <span>Taxes 5%</span>
                  <div></div>
                  <b>{positionList.reduce(sumPrice, 0) * 0.05} $</b>
                </li>
              </ul>
              <button>Checkout</button>
            </div>
          </div>
        ) : (
          <div className={style.emptyCart}>
            <h2>Your basket is empty</h2>
            <p>Please add some product</p>
            <img
              src="/image/Symbols/empty-basket.svg"
              width={90}
              height={90}
              alt="empty"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function sumPrice(accum: number, product: Product) {
  return accum + product.price;
}

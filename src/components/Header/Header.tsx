import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Product } from "../interface";
import { sumPrice } from "../ShopCart/ShopCart";

export function Header({
  onClickShopCart,
  cartPositions,
}: {
  onClickShopCart: () => void;
  cartPositions: Product[];
}) {
  return (
    <header>
      <div className={style.headerLeft}>
        <Link to="/">
          <img
            src="/image/Symbols/spikeLogo.png"
            className={style.spikeLogo}
            alt="spike"
          />
        </Link>
        <div className="headerInfo">
          <h3>Speedrunner</h3>
          <p>Spikes for running</p>
        </div>
      </div>

      <ul className={style.headerRight}>
        <li>
          <img
            src="/image/Symbols/shopLogo.png"
            width={22}
            height={22}
            onClick={onClickShopCart}
            alt="shop"
          />
          <span>{cartPositions.reduce(sumPrice,0)} $</span>
        </li>
        <li className={style.liUser}>
          <img
            src="/image/Symbols/userLogo.png"
            width={22}
            height={22}
            alt="user"
          />
        </li>
        <li className={style.liFavourite}>
          <Link to="/favourites">
            <img
              src="/image/Symbols/favouriteLogo.png"
              width={22}
              height={22}
              alt="favourite"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}


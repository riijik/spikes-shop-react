import React from "react";
import style from "./Header.module.scss";

export function Header({ onClickShopCart }: { onClickShopCart: () => void }) {
  return (
    <header>
      <div className={style.headerLeft}>
        <img src="/image/Symbols/spikeLogo.png" className={style.spikeLogo} alt="spike"/>
        <div className="headerInfo">
          <h3>Speedrunner</h3>
          <p>Best spikes for running</p>
        </div>
      </div>
      <ul className={style.headerRight}>
        <li>
          <img src="/image/Symbols/shopLogo.png" width={22} height={22} onClick={onClickShopCart} alt="shop"/>
          <span>0 $</span>
        </li>
        <li className={style.liUser}>
          <img src="/image/Symbols/userLogo.png" width={22} height={22} alt="user" />
        </li>
      </ul>
    </header>
  );
}

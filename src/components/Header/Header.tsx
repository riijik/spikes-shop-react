import React from "react";
import spikeLogo from "./spikeLogo.png";
import shopLogo from "./shopLogo.png";
import userLogo from "./userLogo.png";
import style from "./Header.module.scss";

export function Header({ onClickShopCart }: { onClickShopCart: () => void }) {
  return (
    <header>
      <div className={style.headerLeft}>
        <img src={spikeLogo} className={style.spikeLogo} />
        <div className="headerInfo">
          <h3>Speedrunner</h3>
          <p>Best spikes for running</p>
        </div>
      </div>
      <ul className={style.headerRight}>
        <li>
          <img src={shopLogo} width={22} height={22} onClick={onClickShopCart}/>
          <span>0 $</span>
        </li>
        <li className={style.liUser}>
          <img src={userLogo} width={22} height={22} />
        </li>
      </ul>
    </header>
  );
}

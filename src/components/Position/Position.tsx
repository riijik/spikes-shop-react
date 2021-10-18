import React from "react";
import plusSign from "./plus-sign.svg";
import style from "./Position.module.scss"

export function Position({
  model,
  price,
  img,
}: {
  model: string;
  price: number;
  img: string;
}) {
  return (
    <div className={style.position}>
      <img src={img} width={133} height={133} className={style.imageCard} />
      <h5>{model}</h5>
      <div className={style.cardBottom}>
        <div>
          <span>Price: </span>
          <b>{price} $</b>
        </div>
        <button onClick={()=> alert(1)}>
          <img src={plusSign} width={11} height={11} />
        </button>
      </div>
    </div>
  );
}

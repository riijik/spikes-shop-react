import React from "react";
import { useState } from "react";
import plusSign from "./plus-sign.svg";
import checkedSign from "./checked.png";
import style from "./Position.module.scss";

export function Position({
  model,
  price,
  img,
}: {
  model: string;
  price: number;
  img: string;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const addProduct = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className={style.position}>
      <img src={img} width={133} height={133} className={style.imageCard} />
      <h5>{model}</h5>
      <div className={style.cardBottom}>
        <div>
          <span>Price: </span>
          <b>{price} $</b>
        </div>
        <button onClick={addProduct}>
          <img src={isAdded ? checkedSign : plusSign} width={11} height={11} />
        </button>
      </div>
    </div>
  );
}

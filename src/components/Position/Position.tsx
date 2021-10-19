import React from "react";
import { useState } from "react";
import plusSign from "./plus-sign.svg";
import checkedSign from "./checked.png";
import notLiked from "./favouriteLogo.png";
import liked from "./favouriteLogoLiked.png";
import style from "./Position.module.scss";
import { Product } from "../interface";

export function Position({
  model,
  price,
  image,
  size,
  id,
  brand,
  addToCart,
}: {
  model: string;
  price: number;
  image: string;
  size: number[];
  id: number;
  brand: string;
  addToCart: (obj: Product) => void;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const addProduct = () => {
    addToCart({ id, brand, model, image, price, size });
    setIsAdded(!isAdded);
  };

  return (
    <div className={style.position}>
      <img src={notLiked} width={11} height={11} />
      <img src={image} width={133} height={133} className={style.imageCard} />
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

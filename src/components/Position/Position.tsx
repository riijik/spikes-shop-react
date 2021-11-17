import React from "react";
import { useState } from "react";
import style from "./Position.module.scss";
import { Product } from "../interface";
import { Link } from "react-router-dom";
import { positionRoute } from "../../App";

export function Position({
  model,
  price,
  image,
  size,
  id,
  brand,
  addToCart,
  addToFavourite,
  favourited = false,
  addedToCart = false,
}: {
  model: string;
  price: number;
  image: string;
  size: number[];
  id: number;
  brand: string;
  addToCart: (obj: Product) => void;
  addToFavourite: (positionToFavourite: Product) => void;
  favourited?: boolean;
  addedToCart?: boolean;
}) {
  const [isAdded, setIsAdded] = useState(addedToCart);
  const [isFavour, setIsFavour] = useState(favourited);
  const addProduct = () => {
    addToCart({ id, brand, model, image, price, size });
    setIsAdded(!isAdded);
  };

  const addToFavour = () => {
    addToFavourite({ id, brand, model, image, price, size });
    setIsFavour(!isFavour);
  };

  return (
    <div className={style.position}>
      <img
        className={style.imgFavourite}
        src={
          isFavour
            ? "/image/Symbols/favouriteLogoLiked.png"
            : "/image/Symbols/favouriteLogo.png"
        }
        width={15}
        height={15}
        alt="like"
        onClick={addToFavour}
      />
      <Link to={positionRoute(model)}><img
        src={image}
        width={133}
        height={133}
        className={style.imageCard}
        alt="position"
      /></Link>
      <h5>{model}</h5>
      <div className={style.cardBottom}>
        <div>
          <span>Price: </span>
          <b>{price} $</b>
        </div>
        <button onClick={addProduct}>
          <img
            src={
              isAdded
                ? "/image/Symbols/checked.png"
                : "/image/Symbols/plus-sign.svg"
            }
            width={11}
            height={11}
            alt="plus"
          />
        </button>
      </div>
    </div>
  );
}

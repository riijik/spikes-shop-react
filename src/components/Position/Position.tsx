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
  image_1,
  size,
  id,
  brand,
  addToCart,
  addToFavourite,
  addToAnimation,
  favourited = false,
  addedToCart = false,
}: {
  model: string;
  price: number;
  image: string;
  image_1: string;
  size: number[];
  id: number;
  brand: string;
  addToCart: (obj: Product) => void;
  addToFavourite: (positionToFavourite: Product) => void;
  addToAnimation: (positionToAnime: Product) => void;
  favourited?: boolean;
  addedToCart?: boolean;
}) {
  const [isAdded, setIsAdded] = useState(addedToCart);
  const [isFavour, setIsFavour] = useState(favourited);
  const addProduct = () => {
    addToCart({ id, brand, model, image, image_1, price, size });
    setIsAdded(!isAdded);
    addToAnimation({ id, brand, model, image, image_1, price, size });
  };

  const addToFavour = () => {
    addToFavourite({ id, brand, model, image, image_1, price, size });
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
      <div className={style.stackImg}>
        <Link to={positionRoute(model)}>
          <img
            id={deleteProbel(model)}
            src={image}
            width={133}
            height={133}
            className={style.imageCard}
            alt="position"
          />
          <img
            id={deleteProbel(model) + 1}
            src={image}
            width={133}
            height={133}
            className={style.imageCard}
            alt="position"
          />
        </Link>
      </div>
      <div className={style.cardBott}>
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
    </div>
  );
}

export function deleteProbel(model: string) {
  return model.replaceAll(" ", "");
}

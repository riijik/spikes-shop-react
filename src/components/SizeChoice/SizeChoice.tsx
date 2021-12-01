import React from "react";
import { Product } from "../interface";
import style from "./SizeChoice.module.scss";

export function SizeChoice({
  spikesData,
  model,
  setSizeChoice,
  addToCart,
}: {
  spikesData: Product[];
  model: string;
  setSizeChoice: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (obj: Product) => void;
}) {
  return (
    <div className={style.overlay}>
      <div className={style.drawer}>
        {spikesData
          .filter((item) => item.model === model)
          .map((item) => {
            return (
              <ButtonArea
                item={item}
                setSizeChoice={setSizeChoice}
                model={item.model}
                id={item.id}
                price={item.price}
                image={item.image}
                image_1={item.image_1}
                size={item.size}
                brand={item.brand}
                addToCart={addToCart}
              />
            );
          })}
      </div>
    </div>
  );
}

function ButtonArea({
  item,
  setSizeChoice,
  addToCart,
  model,
  price,
  image,
  image_1,
  size,
  id,
  brand,
}: {
  item: Product;
  setSizeChoice: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (obj: Product) => void;
  model: string;
  price: number;
  image: string;
  image_1: string;
  size: number[];
  id: number;
  brand: string;
}) {
  const addToCartWithSize = () => {
    addToCart({ id, brand, model, image, image_1, price, size });
    setSizeChoice(false);
  };

  return (
    <div className={style.container}>
      <span>Choose size</span>
      {item.size.map((size) => {
        return <button onClick={addToCartWithSize}>{size}</button>;
      })}
    </div>
  );
}

import React from "react";
import { Product } from "../interface";
import { Slider } from "../Slider/Slider";
import style from "./PositionContent.module.scss"

export function PositionContent({
  spikesData,
  model,
  setSizeChoice,
}: {
  spikesData: Product[];
  model: string;
  setSizeChoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={style.content}>
      {spikesData
        .filter((item) => item.model === model)
        .map((item) => {
          return (
            <div className={style.container}>
              <Slider item={item} />
              <div className={style.containerWithItemProp}>
                <h1>{item.model}</h1>
                <b>Price: {item.price}$</b>
                <div className={style.sizeContainer}>
                  <b>Sizes: </b>
                  {item.size.map((value) => {
                    return <b className={style.bSize}>{value}</b>;
                  })}
                </div>
                <button onClick={() => setSizeChoice(true)}>Add to cart</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

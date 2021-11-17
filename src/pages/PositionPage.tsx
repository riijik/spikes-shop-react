import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import style from "./Home.module.scss";

export function PositionPage() {
  const { model } = useParams<{ model: string }>();
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);

  return (
    <div className={style.content}>
      <h1>{model}</h1>
      {spikesData
        .filter((item) => item.model === model)
        .map((item) => {
          return <div><img src={item.image} width={500} height={550}/></div>;
        })}
    </div>
  );
}

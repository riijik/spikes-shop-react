import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import style from "./Home.module.scss";
import { Carousel } from "react-bootstrap";

export function PositionPage() {
  const { model } = useParams<{ model: string }>();
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);

  return (
    <div className={style.content}>
      <h1>{model}</h1>
      {spikesData
        .filter((item) => item.model === model)
        .map((item) => {
          return (
            
              <Carousel>
                <Carousel.Item>
                  <img src={item.image} width={500} height={550} />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={item.image_1} width={500} height={550} />
                </Carousel.Item>
              </Carousel>
            
          );
        })}
    </div>
  );
}

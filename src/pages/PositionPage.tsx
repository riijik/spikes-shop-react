import React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import { Product } from "../components/interface";
import style from "./Home.module.scss";
import st from "./Slider.module.scss";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export function PositionPage({
  addPositionToCart,
}: {
  addPositionToCart: (positionToCart: Product) => void;
}) {
  const { model } = useParams<{ model: string }>();
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);
  const [sizeChoice, setSizeChoice] = useState(false);

  return (
    <div>
      {sizeChoice ? (
        <SizeChoice
          spikesData={spikesData}
          model={model}
          setSizeChoice={setSizeChoice}
          addToCart={(positionToCart: Product) =>
            addPositionToCart(positionToCart)
          }
        />
      ) : null}
      <MainContent
        spikesData={spikesData}
        model={model}
        setSizeChoice={setSizeChoice}
      />
    </div>
  );
}

function Slider({ item }: { item: Product }) {
  function arrOfImg(item: Product) {
    let arrForReturn = [];
    arrForReturn.push(item.image, item.image_1);
    return arrForReturn;
  }

  const [current, setCurrent] = useState(0);
  const length = arrOfImg(item).length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className={st.slider}>
      <FaArrowAltCircleLeft className={st.leftArrow} onClick={prevSlide} />
      {arrOfImg(item).map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img src={slide} className={st.image} />}
          </div>
        );
      })}
      <FaArrowAltCircleRight className={st.rightArrow} onClick={nextSlide} />
    </section>
  );
}

function MainContent({
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
            <div className={st.container}>
              <Slider item={item} />
              <div className={st.containerWithItemProp}>
                <h1>{item.model}</h1>
                <b>Price: {item.price}$</b>
                <div className={st.sizeContainer}>
                  <b>Sizes: </b>
                  {item.size.map((value) => {
                    return <b className={st.bSize}>{value}</b>;
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

function SizeChoice({
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
    <div className={st.overlay}>
      <div className={st.drawer}>
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
    <div>
      <b>Choose size</b>
      {item.size.map((size) => {
        return <button onClick={addToCartWithSize}>{size}</button>;
      })}
    </div>
  );
}

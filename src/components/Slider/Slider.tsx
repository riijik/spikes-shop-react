import React, {useState} from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Product } from "../interface";
import style from "./Slider.module.scss";


export function Slider({ item }: { item: Product }) {
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
      <section className={style.slider}>
        <FaArrowAltCircleLeft className={style.leftArrow} onClick={prevSlide} />
        {arrOfImg(item).map((slide, index) => {
          return (
            <div
              className={index === current ? style.slideActive : style.slide}
              key={index}
            >
              {index === current && <img src={slide} className={style.image} />}
            </div>
          );
        })}
        <FaArrowAltCircleRight className={style.rightArrow} onClick={nextSlide} />
      </section>
    );
  }
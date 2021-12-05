import react, { useContext } from "react";
import { Search } from "../components/Search/Search";
import { Position } from "../components/Position/Position";
import { Product } from "../components/interface";
import "./Home.module.scss";
import style from "./Home.module.scss";

import { MyContext } from "../App";
import anime from "animejs";

export function HomePage({
  searchInput,
  takeValueFromInput,
  setSearchInput,
  addPositionToCart,
  addPositionToFavourite,
  changeSortMethod,
  sortMethod,
}: {
  searchInput: string;
  takeValueFromInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
  changeSortMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortMethod: string;
}) {
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);

  const blokcMove = anime({
    targets: ".testAnime",
    translateX: 300,
    duration: 8000,
    autoplay: false,
  });

  

  return (
    <div className={style.content}>
      <div className={style.testAnime}>YA SOSU BIBU S ANIME </div>
      <div className="testAnime">YA SOSU BIBU S ANIME </div>
      <button onClick={() => blokcMove.restart()}>Animation </button>
      <Search
        searchInput={searchInput}
        takeValueFromInput={takeValueFromInput}
        setSearchInput={setSearchInput}
        changeSortMethod={changeSortMethod}
        sortMethod={sortMethod}
      />
      <div className={style.allPositions}>
        {spikesData
          .filter((item) =>
            item.model.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((item) => {
            return (
              <Position
                key={item.id}
                model={item.model}
                price={item.price}
                image={item.image}
                image_1={item.image_1}
                size={item.size}
                id={item.id}
                brand={item.brand}
                addToCart={(positionToCart: Product) =>
                  addPositionToCart(positionToCart)
                }
                addToFavourite={(positionToFavourite: Product) =>
                  addPositionToFavourite(positionToFavourite)
                }
                favourited={favouritePositions.some(
                  (obj) => obj.model === item.model
                )}
                addedToCart={cartPositions.some(
                  (obj) => obj.model === item.model
                )}
              />
            );
          })}
      </div>
    </div>
  );
}

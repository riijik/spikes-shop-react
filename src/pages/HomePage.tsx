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
  flyToCartAnimation,
}: {
  searchInput: string;
  takeValueFromInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
  changeSortMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortMethod: string;
  flyToCartAnimation: (positionToAnime: Product) => void;
}) {
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);

  return (
    <div className={style.content}>
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
                addToAnimation={(positionToAnime: Product) =>
                  flyToCartAnimation(positionToAnime)
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

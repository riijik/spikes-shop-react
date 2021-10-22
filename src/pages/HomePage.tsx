import react from "react";
import { Search } from "../components/Search/Search";
import { Position } from "../components/Position/Position";
import { Product } from "../components/interface";
import style from "./Home.module.scss";

export function HomePage({
  searchInput,
  takeValueFromInput,
  setSearchInput,
  spikesData,
  addPositionToCart,
  addPositionToFavourite,
}: {
  searchInput: string;
  takeValueFromInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  spikesData: Product[];
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
}) {
  return (
    <div className={style.content}>
      <Search
        searchInput={searchInput}
        takeValueFromInput={takeValueFromInput}
        setSearchInput={setSearchInput}
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
                size={item.size}
                id={item.id}
                brand={item.brand}
                addToCart={(positionToCart: Product) =>
                  addPositionToCart(positionToCart)
                }
                addToFavourite={(positionToFavourite: Product) =>
                  addPositionToFavourite(positionToFavourite)
                }
              />
            );
          })}
      </div>
    </div>
  );
}

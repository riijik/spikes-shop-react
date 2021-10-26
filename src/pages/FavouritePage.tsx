import react from "react";
import { Product } from "../components/interface";
import { Position } from "../components/Position/Position";
import style from "./Home.module.scss";

export function FavouritePage({
  favouritePositions,
  addPositionToCart,
  addPositionToFavourite,
}: {
  favouritePositions: Product[];
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
}) {
  return (

    <div className={style.allPositions}>
      <h1>Favorites </h1>
      {favouritePositions.map((item) => {
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
            favourited={true}
          />
        );
      })}
    </div>
  );
}

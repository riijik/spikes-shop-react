import react, { useContext } from "react";
import { Product } from "../components/interface";
import { Position } from "../components/Position/Position";
import style from "./Home.module.scss";
import { MyContext } from "../App";

export function FavouritePage({
  addPositionToCart,
  addPositionToFavourite,
}: {
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
}) {
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);

  return (
    <div className={style.content}>
      <h1>Favorites </h1>
      <div className={style.allPositions}>
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
    </div>
  );
}

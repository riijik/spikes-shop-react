import react, { useContext } from "react";
import { Product } from "../components/interface";
import { Position } from "../components/Position/Position";
import style from "./Home.module.scss";
import { MyContext } from "../App";

export function FavouritePage({
  addPositionToCart,
  addPositionToFavourite,
  animashka,
}: {
  addPositionToCart: (positionToCart: Product) => void;
  addPositionToFavourite: (positionToFavourite: Product) => void;
  animashka: (positionToAnime: Product) => void;
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
                animashka(positionToAnime)
              }
              favourited={true}
            />
          );
        })}
      </div>
    </div>
  );
}

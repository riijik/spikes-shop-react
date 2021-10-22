import React from "react";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { Product } from "./components/interface";
import { HomePage } from "./pages/HomePage";
import { Route } from "react-router";
import { FavouritePage } from "./pages/FavouritePage";
import superagent from "superagent";
import axios from "axios";

export function App() {
  const [spikesData, setSpikesData] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);
  const [favouritePositions, setFavouritePositions] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getRequestAllPositions().then((response) => {
      setSpikesData(response);
    });
    getRequestCartPositions().then((response) => {
      setCartPositions(response);
    });
    getRequestFavouritePositions().then((response) => {
      setFavouritePositions(response);
    });
  }, []);

  // исправить логику добавления в корзину
  const addPositionToCart = (positionToCart: Product) => {
    superagent
      .post("https://61712ad2c20f3a001705fb20.mockapi.io/cart")
      .send(positionToCart)
      .end();
    setCartPositions((prev) => [...prev, positionToCart]);
  };

  const removePositionFromCart = (id: number) => {
    superagent
      .delete(`https://61712ad2c20f3a001705fb20.mockapi.io/cart/${id}`)
      .end();
    setCartPositions((prev) => prev.filter((position) => position.id !== id));
  };

  const addPositionToFavourite = async (positionToFavourite: Product) => {
    if (favouritePositions.find((obj) => obj.id === positionToFavourite.id)) {
      console.log("chlin");
      superagent
        .delete(
          `https://61712ad2c20f3a001705fb20.mockapi.io/favourite/${positionToFavourite.id}`
        )
        .end();
    } else {
      axios.post(
        "https://61712ad2c20f3a001705fb20.mockapi.io/favourite",
        positionToFavourite
      );

      setFavouritePositions((prev) => [...prev, positionToFavourite]);
    }
  };

  const takeValueFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="wrapper">
      {cartOpen ? (
        <ShoppingCart
          closeShopCart={() => setCartOpen(false)}
          positionList={cartPositions}
          deleteFromCart={removePositionFromCart}
        />
      ) : null}
      <Header onClickShopCart={() => setCartOpen(true)} />
      <Route path="/" exact>
        <HomePage
          searchInput={searchInput}
          takeValueFromInput={takeValueFromInput}
          setSearchInput={setSearchInput}
          spikesData={spikesData}
          addPositionToCart={addPositionToCart}
          addPositionToFavourite={addPositionToFavourite}
        />
      </Route>
      <Route path="/favourites">
        <FavouritePage
          favouritePositions={favouritePositions}
          addPositionToCart={addPositionToCart}
          addPositionToFavourite={addPositionToFavourite}
        />
      </Route>
    </div>
  );
}

async function getRequestAllPositions() {
  const response = await superagent.get(
    "https://61712ad2c20f3a001705fb20.mockapi.io/spikesShop"
  );

  const responseBody: Product[] = response.body;
  return responseBody;
}

async function getRequestCartPositions() {
  const response = await superagent.get(
    "https://61712ad2c20f3a001705fb20.mockapi.io/cart"
  );

  const responseBody: Product[] = response.body;
  return responseBody;
}

async function getRequestFavouritePositions() {
  const response = await superagent.get(
    "https://61712ad2c20f3a001705fb20.mockapi.io/favourite"
  );

  const responseBody: Product[] = response.body;
  return responseBody;
}

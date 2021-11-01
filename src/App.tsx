import React from "react";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { Product } from "./components/interface";
import { HomePage } from "./pages/HomePage";
import { Route } from "react-router";
import { FavouritePage } from "./pages/FavouritePage";
import superagent from "superagent";

export function App() {
  const [spikesData, setSpikesData] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);
  const [favouritePositions, setFavouritePositions] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function data() {
      const favourResponse = await getRequestFavouritePositions();
      const cartRespone = await getRequestCartPositions();
      const itemsResponse = await getRequestAllPositions();
      setFavouritePositions(favourResponse);
      setCartPositions(cartRespone);
      setSpikesData(itemsResponse);
    }
    data();
    // getRequestAllPositions().then((response) => {
    //   setSpikesData(response);
    // });
    // getRequestCartPositions().then((response) => {
    //   setCartPositions(response);
    // });
    // getRequestFavouritePositions().then((response) => {
    //   setFavouritePositions(response);
    // });
  }, []);

  // исправить логику добавления в корзину
  const addPositionToCart = async (positionToCart: Product) => {
    if (
      cartPositions.find((obj) => Number(obj.id) === Number(positionToCart.id))
    ) {
      console.log(positionToCart);
      console.log('sso')
      superagent
        .delete(
          `https://61712ad2c20f3a001705fb20.mockapi.io/cart/${positionToCart.id}`
        )
        .end();
      setCartPositions((prev) =>
        prev.filter((position) => position.id !== positionToCart.id)
      );
    } else {
      const post = await superagent
        .post("https://61712ad2c20f3a001705fb20.mockapi.io/cart")
        .send(positionToCart);
      const postBody: Product = post.body;
      setCartPositions((prev) => [...prev, postBody]); 
      console.log(postBody);
      console.log(cartPositions)
    }
  };

  const removePositionFromCart = (id: number) => {
    superagent
      .delete(`https://61712ad2c20f3a001705fb20.mockapi.io/cart/${id}`)
      .end();
    setCartPositions((prev) => prev.filter((position) => position.id !== id));
  };

  const addPositionToFavourite = async (positionToFavourite: Product) => {
    if (favouritePositions.find((obj) => obj.id === positionToFavourite.id)) {
      superagent
        .delete(
          `https://61712ad2c20f3a001705fb20.mockapi.io/favourite/${positionToFavourite.id}`
        )
        .end();
      setFavouritePositions((prev) =>
        prev.filter((position) => position.id !== positionToFavourite.id)
      );
    } else {
      const post = await superagent
        .post("https://61712ad2c20f3a001705fb20.mockapi.io/favourite")
        .send(positionToFavourite);
      const postBody: Product = post.body;
      setFavouritePositions((prev) => [...prev, postBody]);
      console.log(favouritePositions)
      let newSpikesData = [];
      for (let item of spikesData) {
        if (item.model === postBody.model) {
          newSpikesData.push(postBody);
        } else {
          newSpikesData.push(item);
        }
      }
      setSpikesData(newSpikesData);
      console.log(newSpikesData);
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
          favouritePositions={favouritePositions}
          cartPositions={cartPositions}
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

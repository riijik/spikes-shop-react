import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { Product } from "./components/interface";
import { HomePage } from "./pages/HomePage";
import { Route } from "react-router";
import { FavouritePage } from "./pages/FavouritePage";
import { PositionPage } from "./pages/PositionPage";
import superagent from "superagent";

export const MyContext = createContext<[Product[],Product[],Product[]]>([[],[],[]]);

export const positionRoute = (model: string) => `/${model}`

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
  }, []);

  const addPositionToCart = async (positionToCart: Product) => {
    if (cartPositions.find((obj) => obj.model === positionToCart.model)) {
      const similiarPosition = findSimiliarPosition(
        cartPositions,
        positionToCart
      );
      superagent
        .delete(
          `https://61712ad2c20f3a001705fb20.mockapi.io/cart/${similiarPosition.id}`
        )
        .end();
      setCartPositions((prev) =>
        prev.filter((position) => position.model !== positionToCart.model)
      );
    } else {
      const post = await superagent
        .post("https://61712ad2c20f3a001705fb20.mockapi.io/cart")
        .send(positionToCart);
      const postBody: Product = post.body;
      setCartPositions((prev) => [...prev, postBody]);
    }
  };

  const removePositionFromCart = (id: number) => {
    superagent
      .delete(`https://61712ad2c20f3a001705fb20.mockapi.io/cart/${id}`)
      .end();
    setCartPositions((prev) => prev.filter((position) => position.id !== id));
  };

  const addPositionToFavourite = async (positionToFavourite: Product) => {
    if (
      favouritePositions.find((obj) => obj.model === positionToFavourite.model)
    ) {
      const similiarPosition = findSimiliarPosition(
        favouritePositions,
        positionToFavourite
      );
      superagent
        .delete(
          `https://61712ad2c20f3a001705fb20.mockapi.io/favourite/${similiarPosition.id}`
        )
        .end();
      setFavouritePositions((prev) =>
        prev.filter((position) => position.model !== positionToFavourite.model)
      );
    } else {
      const post = await superagent
        .post("https://61712ad2c20f3a001705fb20.mockapi.io/favourite")
        .send(positionToFavourite);
      const postBody: Product = post.body;
      setFavouritePositions((prev) => [...prev, postBody]);
    }
  };

  const takeValueFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <MyContext.Provider value={[favouritePositions,spikesData,cartPositions]}> 
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
            addPositionToCart={addPositionToCart}
            addPositionToFavourite={addPositionToFavourite}
          />
        </Route>
        <Route path="/favourites">
          <FavouritePage
            addPositionToCart={addPositionToCart}
            addPositionToFavourite={addPositionToFavourite}
          />
        </Route>
        <Route path={positionRoute(':model')}>
          <PositionPage/>
        </Route>
      </div>
    </MyContext.Provider>
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

function findSimiliarPosition(list: Product[], item: Product): Product {
  let arr: Product[] = [];
  for (const position of list) {
    if (position.model === item.model) {
      arr.push(position);
    }
  }
  return arr[0];
}

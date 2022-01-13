import React, { createContext, MouseEventHandler } from "react";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { Product } from "./components/interface";
import { HomePage } from "./pages/HomePage";
import { Route } from "react-router";
import { FavouritePage } from "./pages/FavouritePage";
import { PositionPage } from "./pages/PositionPage";
import superagent from "superagent";
import anime from "animejs";
import { deleteProbel } from "./components/Position/Position";
import style from "./components/Header/Header.module.scss";

const PRODUCT_EMPTY_LIST: Product[] = [];
const PRODUCT_CONTEXT_INIT = [
  PRODUCT_EMPTY_LIST,
  PRODUCT_EMPTY_LIST,
  PRODUCT_EMPTY_LIST,
] as const;
export const MyContext = createContext(PRODUCT_CONTEXT_INIT);

export const positionRoute = (model: string) => `/${model}`;

export function App() {
  const [spikesData, setSpikesData] = useState<Product[]>([]);
  const [notChangebleData, setNotChangebleData] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);
  const [favouritePositions, setFavouritePositions] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  useEffect(() => {
    async function data() {
      const favourResponse = await getRequestFavouritePositions();
      const cartRespone = await getRequestCartPositions();
      const itemsResponse = await getRequestAllPositions();
      setFavouritePositions(favourResponse);
      setCartPositions(cartRespone);
      setSpikesData(itemsResponse);
      setNotChangebleData(itemsResponse);
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

  const changeSortMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = String(e.target.value);
    console.log(value);
    if (value === "By price") {
      const dataCopy = spikesData.slice();
      const data = dataCopy.sort((a, b) => b.price - a.price);
      setSpikesData(data);
    }
    if (value === "Nike") {
      const filterArr = notChangebleData.filter(
        (item) => item.brand === "Nike"
      );
      setSpikesData(filterArr);
    }
    if (value === "Adidas") {
      const filterArr = notChangebleData.filter(
        (item) => item.brand === "Adidas"
      );
      setSpikesData(filterArr);
    }
    if (value === "All") {
      setSpikesData(notChangebleData  );
    }
    setSortMethod(value);
  };

  const flyToCartAnimation = (positionToAnime: Product) => {
    const elementTowardMove = document.querySelector(`.${style.headerRight}`);
    const cordinationFirst = elementTowardMove!.getBoundingClientRect();

    const elementForMove = document.querySelector(
      `#${deleteProbel(positionToAnime.model)}`
    );
    const cordinationSec = elementForMove!.getBoundingClientRect();

    const cordinationOnY = cordinationFirst.y - cordinationSec.y - 30;
    const cordinationOnX = cordinationFirst.x - cordinationSec.x - 50;

    const animation = anime({
      targets: `#${deleteProbel(positionToAnime.model)}`,
      keyframes: [
        {
          translateY: cordinationOnY,
          translateX: cordinationOnX,
          rotate: 360,
          scale: 0.1,
        },
        { translateX: 5, translateY: 5, rotate: 0, scale: 0, opacity: 0 },
        { translateX: 0, translateY: 0, rotate: 0, scale: 1.0, opacity: 1 },
      ],
      duration: 3000,
      autoplay: false,
      easing: "easeInOutSine",
    });
    animation.play();
  };

  return (
    <MyContext.Provider value={[favouritePositions, spikesData, cartPositions]}>
      <div className="wrapper">
        {cartOpen ? (
          <ShoppingCart
            closeShopCart={() => setCartOpen(false)}
            positionList={cartPositions}
            deleteFromCart={removePositionFromCart}
            setCartPositions={setCartPositions}
          />
        ) : null}
        <Header
          onClickShopCart={() => setCartOpen(true)}
          cartPositions={cartPositions}
        />
        <Route path="/" exact>
          <HomePage
            searchInput={searchInput}
            takeValueFromInput={takeValueFromInput}
            setSearchInput={setSearchInput}
            addPositionToCart={addPositionToCart}
            addPositionToFavourite={addPositionToFavourite}
            changeSortMethod={changeSortMethod}
            sortMethod={sortMethod}
            flyToCartAnimation={flyToCartAnimation}
          />
        </Route>
        <Route path="/favourites">
          <FavouritePage
            addPositionToCart={addPositionToCart}
            addPositionToFavourite={addPositionToFavourite}
            flyToCartAnimation={flyToCartAnimation}
          />
        </Route>
        <Route path={positionRoute(":model")}>
          <PositionPage addPositionToCart={addPositionToCart} />
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

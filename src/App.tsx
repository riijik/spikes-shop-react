import React from "react";
import { useState, useEffect } from "react";
import { Position } from "./components/Position/Position";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { Search } from "./components/Search/Search";
import { Product } from "./components/interface";
import superagent from "superagent";

export function App() {
  const [spikesData, setSpikesData] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getRequestAllPositions().then((response) => {
      setSpikesData(response);
    });
    getRequestCartPositions().then((response) => {
      setCartPositions(response);
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
      <div className="content">
        <Search
          searchInput={searchInput}
          takeValueFromInput={takeValueFromInput}
          setSearchInput={setSearchInput}
        />
        <div className="allPositions">
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
                />
              );
            })}
        </div>
      </div>
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

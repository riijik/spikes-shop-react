import React from "react";
import { useState } from "react";
import searchLogo from "./img/searchLogo.png";
import filterLogo from "./img/filterLogo.png";
import { Position } from "./components/Position/Position";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { spikesList } from "./data";
import { Product } from "./components/interface";
import crossLogo from "./components/ShopCart/crossLogo.png";

export function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");

  // исправить логику добавления в корзину
  const addPositionToCart = (positionToCart: Product) => {
    if (cartPositions.length !== 0) {
      for (const item of cartPositions) {
        if (item.id === positionToCart.id) {
          console.log("Этот товар уже добавлен в корзину");
        } else {
          setCartPositions((prev) => [...prev, positionToCart]);
        }
      }
    } else {
      setCartPositions((prev) => [...prev, positionToCart]);
    }
  };

  const removePositionFromCart = (id: number) => {
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
        <div className="searchFilterLine">
          <h1>
            {searchInput
              ? `Search by request: ${searchInput}`
              : "All positions"}
          </h1>
          <div className="searchAndFilter">
            <div className="search">
              <img src={searchLogo} width={11} height={11} />
              <input
                placeholder="Search..."
                onChange={takeValueFromInput}
                value={searchInput}
              />
              {searchInput && (
                <button onClick={() => setSearchInput("")}>
                  <img src={crossLogo} width={11} height={11} />
                </button>
              )}
            </div>
            <div className="filter">
              <img src={filterLogo} width={12} height={12} />
              <select>
                <option>By price</option>
                <option>Nike</option>
                <option>Adidas</option>
              </select>
            </div>
          </div>
        </div>
        <div className="allPositions">
          {spikesList
            .filter((item) => item.model.toLowerCase().includes(searchInput.toLowerCase()))
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

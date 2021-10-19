import React from "react";
import { useState } from "react";
import searchLogo from "./img/searchLogo.png";
import filterLogo from "./img/filterLogo.png";
import { Position } from "./components/Position/Position";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { positions } from "./data";
import { Product } from "./components/interface";

export function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPositions, setCartPositions] = useState<Product[]>([]);

  const addPositionToCart = (obj: Product) => {
    setCartPositions([...cartPositions, obj])
  };

  return (
    <div className="wrapper">
      {cartOpen ? (
        <ShoppingCart
          closeShopCart={() => setCartOpen(false)}
          positionList={cartPositions}
        />
      ) : null}
      <Header onClickShopCart={() => setCartOpen(true)} />
      <div className="content">
        <div className="searchFilterLine">
          <h1>All positions</h1>
          <div className="searchAndFilter">
            <div className="search">
              <img src={searchLogo} width={11} height={11} />
              <input placeholder="Search..." />
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
          {positions.map((item) => {
            return (
              <Position
                key={item.id}
                model={item.model}
                price={item.price}
                image={item.image}
                size={item.size}
                id={item.id}
                brand={item.brand}
                addToCart={(obj: Product) => addPositionToCart(obj)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

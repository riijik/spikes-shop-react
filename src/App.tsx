import React from "react";
import searchLogo from "./img/searchLogo.png";
import filterLogo from "./img/filterLogo.png";
import { Position } from "./components/Position/Position";
import { Header } from "./components/Header/Header";
import { ShoppingCart } from "./components/ShopCart/ShopCart";
import { positions } from "./data";

export function App() {
  return (
    <div className="wrapper">
      <ShoppingCart />
      <Header />
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
            return <Position key={item.id} model={item.model} price={item.price} img={item.image}/>;
          })}
        </div>
      </div>
    </div>
  );
}


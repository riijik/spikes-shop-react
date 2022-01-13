import react from "react";
import style from "./Search.module.scss";

export function Search({
  searchInput,
  takeValueFromInput,
  setSearchInput,
  changeSortMethod,
  sortMethod,
}: {
  searchInput: string;
  takeValueFromInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  changeSortMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortMethod: string;
}) {
  return (
    <div className={style.searchFilterLine}>
      <h1>
        {searchInput ? `Search by request: ${searchInput}` : "All positions"}
      </h1>
      <div className={style.searchAndFilter}>
        <div className={style.search}>
          <img
            src="/image/Symbols/searchLogo.png"
            width={11}
            height={11}
            alt="search"
          />
          <input
            placeholder="Search..."
            onChange={takeValueFromInput}
            value={searchInput}
          />
          {searchInput && (
            <button onClick={() => setSearchInput("")}>
              <img
                src="/image/Symbols/crossLogo.png"
                width={11}
                height={11}
                alt="cross"
              />
            </button>
          )}
        </div>
        <div className={style.filter}>
          <img
            src="/image/Symbols/filterLogo.png"
            width={12}
            height={12}
            alt="filter"
          />
          <select onChange={changeSortMethod} value={sortMethod}>
            <option>All</option>
            <option>By price</option>
            <option>Nike</option>
            <option>Adidas</option>
          </select>
        </div>
      </div>
    </div>
  );
}

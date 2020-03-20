import React from "react";
import style from "../Search/Search.module.scss";
import { IconSearch } from "../Icons/Icons";

interface Search {
  searchValue: string;
  handlerSearch(event: React.ChangeEvent): void;
}

const Search: React.FC<Search> = ({ handlerSearch, searchValue }) => {
  return (
    <div className={style.root}>
      <div className={style.icon}>
        <IconSearch />
      </div>
      <input
        value={searchValue}
        placeholder="Search User"
        className={style.input}
        onChange={handlerSearch}
      />
    </div>
  );
};
export default Search;

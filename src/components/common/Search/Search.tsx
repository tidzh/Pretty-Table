import React from "react";
import style from "../Search/Search.module.scss";
import { IconSearch } from "../Icons/Icons";
import { SearchProps } from "../../../utils/interface";

const Search: React.FC<SearchProps> = ({ handlerSearch, searchValue }) => {
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

import React from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchBar.scss";

const SearchBar = (props) => {
  return (
    <div>
      <div className='navbar-search'>
        <div className='search-icon'>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          className='search-input'
          onChange={(event) => props.onChange(event)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

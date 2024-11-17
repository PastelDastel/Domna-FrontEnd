import React from 'react';
import style from './SearchBar.module.css'; // Import the CSS module

const SearchBar = () => {
    return (
        <div className={style.topBar}>
            <input type="text" className={style.searchBar} placeholder="Cerca un corso o un blog..." />
        </div>
    );
};

export default SearchBar;

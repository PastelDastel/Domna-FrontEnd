import React from 'react';
import style from './Header.module.css'; // Import the CSS module

const Header = ({ view, handleAddNew }) => {
    return (
        <header className={style.header}>
            <h1 className={style.title}>
                {view === 'courses' ? 'Corsi Disponibili' : view === 'users' ? 'Utenti Registrati' : 'Articoli del Blog'}
            </h1>
            <button onClick={handleAddNew} className={style.createBtn}>
                + Crea Nuovo
            </button>
        </header>
    );
};

export default Header;

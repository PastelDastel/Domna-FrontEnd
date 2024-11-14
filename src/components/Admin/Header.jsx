import React from 'react';

const Header = ({ view, handleAddNew }) => {
    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{view === 'courses' ? 'Corsi Disponibili' : view === 'users' ? 'Utenti Registrati' : 'Articoli del Blog'}</h1>
            <button onClick={handleAddNew} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                + Add New
            </button>
        </header>
    );
};

export default Header;

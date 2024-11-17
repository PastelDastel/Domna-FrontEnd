import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import style from './DataList.module.css'; // Import the CSS module

const DataList = ({ view, data, loading, error, handleModify, handleDelete, handleClick }) => {
    if (loading) {
        return <p className={style.loading}>Loading...</p>;
    }

    if (error) {
        return <p className={style.error}>{error}</p>;
    }

    if (data.length === 0) {
        return (
            <p className={style.noData}>
                Nessun {view === 'courses' ? 'corso' : view === 'users' ? 'utente' : 'articolo'} disponibile al momento.
            </p>
        );
    }

    return (
        <div className={style.gridContainer}>
            {data.map((item) => (
                <ItemCard
                    key={item._id}
                    item={item}
                    view={view}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                    handleClick={handleClick} // Pass the function as a prop
                />
            ))}
        </div>
    );
};

export default DataList;

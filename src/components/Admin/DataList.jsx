import React from 'react';
import ItemCard from './ItemCard';

const DataList = ({ view, data, loading, error, handleModify, handleDelete, handleClick }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (data.length === 0) {
        return <p>Nessun {view === 'courses' ? 'corso' : view === 'users' ? 'utente' : 'articolo'} disponibile al momento.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

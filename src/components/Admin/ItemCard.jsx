import React from 'react';

const ItemCard = ({ item, view, handleModify, handleDelete, handleClick }) => {
    return (
        <div
            onClick={() => handleClick(item)}
            className="bg-white p-4 rounded shadow-lg flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow"
        >
            <div>
                {view === 'courses' && (
                    <>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">Instructor: {item.instructor}</p>
                    </>
                )}
                {view === 'users' && (
                    <>
                        <h3 className="text-lg font-semibold mb-2">{item.username}</h3>
                        <p className="text-sm text-gray-600">Email: {item.email}</p>
                    </>
                )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleModify(item);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                    Modify
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleDelete(item._id);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ItemCard;

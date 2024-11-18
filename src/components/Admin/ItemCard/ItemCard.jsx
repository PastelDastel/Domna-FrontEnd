import React from 'react';
import style from './ItemCard.module.css'; // Import the CSS module

const ItemCard = ({ item, view, handleModify, handleDelete, handleClick }) => {
    return (
        <div
            onClick={() => handleClick(item)}
            className={style.card}
        >
            <div>
                {view === 'courses' && (
                    <>
                        <h3 className={style.title}>{item.title}</h3>
                        <p className={style.subtitle}>Instructor: {item.instructor}</p>
                        <p className={style.subtitle}>Price: {item.price}</p>
                    </>
                )}
                {view === 'users' && (
                    <>
                        <h3 className={style.title}>{item.username}</h3>
                        <p className={style.subtitle}>Email: {item.email}</p>
                    </>
                )}
            </div>
            <div className={style.buttonContainer}>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleModify(item);
                    }}
                    className={style.modifyButton}
                >
                    Modify
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleDelete(item._id);
                    }}
                    className={style.deleteButton}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ItemCard;

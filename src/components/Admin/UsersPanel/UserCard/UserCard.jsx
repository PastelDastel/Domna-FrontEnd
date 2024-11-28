import React from "react";
import style from "./UserCard.module.css";

const UserCard = ({ user, onView, onEdit, onDelete }) => {
    return (
        <div className={style.card} onClick={onView}>
            <h3 className={style.title}>{user.username}</h3>
            <p className={style.subtitle}>Email: {user.email}</p>
            <p className={style.subtitle}>Phone: {user.phone}</p>
            <p className={style.subtitle}>
                Created at: {new Date(user.CreatedAt).toLocaleDateString()}
            </p>
            <div className={style.buttonContainer}>
                <button
                    type="button"
                    className={style.modifyButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    Modify
                </button>
                <button
                    type="button"
                    className={style.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;

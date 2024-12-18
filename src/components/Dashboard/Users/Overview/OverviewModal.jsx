import React from "react";
import style from "./OverviewModal.module.css";

const OverviewModal = ({ closeModal, user, courses }) => {
    return (
        <div className={style.modal}>

            <>
                <h1>Overview</h1>
                <p>Id: {user._id}</p>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Role: {user.roles}</p>
                {courses.length > 0 && (
                    <>
                        <h2>Courses</h2>
                        <ul>
                            {courses.map((course) => (
                                <li key={course._id}>{course.title}</li>
                            ))}
                        </ul>
                    </>
                )}
            </>
            <button onClick={closeModal} className={style.closeButton}>
                Close
            </button>
        </div>
    );
};

export default OverviewModal;

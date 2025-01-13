import React from "react";
import style from "./OverviewModal.module.css";

const OverviewModal = ({ closeModal, user, courses }) => {
    return (
        <div className={style.userModal}>
            <>
                <h1>Dettagli</h1>
                <div className={style["user-info-modal"]}>
                    <p><strong>Id:</strong> {user._id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Roles:</strong> {user.roles}</p>
                </div>
                {courses.length > 0 && (
                    <>
                        <h2>Courses</h2>
                        <div className={style["course-list-user"]}>
                            <ul>
                                {courses.map((course) => (
                                    <li key={course._id}>{course.Title}</li>
                                ))}
                            </ul>
                        </div>
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

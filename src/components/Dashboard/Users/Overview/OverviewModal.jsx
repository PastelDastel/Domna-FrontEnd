import React from "react";
import style from "./OverviewModal.module.css";

const OverviewModal = ({ closeModal, user, courses, trackData }) => {
    console.log("trackedData", trackData);
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
                {trackData.length > 0 ? (
                    <>
                        <h2>Track</h2>
                        <div className={style["track-list-user"]}>
                            <ul>
                                {trackData.map((track) => {
                                    if(track.userId !== user._id) return null;
                                    return(
                                        <ul style={{border: "1px solid black", margin: "10px", padding: "10px", listStyle : "none"}} key={track._id}>
                                            <li key={track._id}>{track.videoUrl}</li>
                                            <li key={track._id}>{track.status}</li>
                                            <li key={track._id}>{track.actualTime}</li>
                                        </ul>
                                )})}
                            </ul>
                        </div>
                    </>
                )
                    : (
                        <p>No courses</p>
                    )}
            </>
            <button onClick={closeModal} className={style.closeButton}>
                Close
            </button>
        </div>
    );
};

export default OverviewModal;

import style from "./Overview.module.css";
import { useEffect, useState } from "react";

const OverviewModal = ({ closeModal, course, users, benefits, categories }) => {
    useEffect(() => {
        console.log(course);
        console.log(users);

    }, [course]);
    const displayBenefits = () => {
        return benefits.map((benefit) => (
            <div key={benefit._id} className={style.benefit}>
                <h3>{benefit.Name}</h3>
                <p>{benefit.Description}</p>
                <p>{benefit.Type}</p>
            </div>
        ));
    };
    return (
        <div className={style.modal}>
            {/* Two-column content */}
            <div className={style.content}>
                {/* Left Column - General Course Data */}
                <div className={style.column}>
                    <h1>Overview of {course.Title}</h1>
                    <p><strong>Id:</strong> {course._id}</p>
                    <p><strong>Title:</strong> {course.Title}</p>
                    <p><strong>Description:</strong> {course.Description}</p>
                    <p><strong>Subscribers:</strong> {course.Subscribers.length}</p>
                    <p><strong>Price:</strong> {course.Price.Discounted ? course.Price.Discounted : course.Price.Normal}</p>
                    <h2>Benefits</h2>
                    {benefits.length > 0 ? displayBenefits() : (<>No benefits</>)}

                    {course.Subscribers.length > 0 ? (
                        <>
                            <h2>Users</h2>
                            <ul>
                                {users.map((user) => (
                                    <li key={user._id}>{user.username}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <h3>No subscribers</h3>
                    )}
                </div>

                {/* Right Column - Categories */}
                <div className={style.column}>
                    <h2>Categories</h2>
                    {course.Categories.length > 0 ? (
                        <ul>
                            {course.categories.map((category) => (
                                <li key={category._id} className={style.category}>
                                    <h3>{category.name}</h3>
                                    <p><strong>ID:</strong> {category._id}</p>
                                    <p>{category.description}</p>

                                    {category.monthlyPrograms.length > 0 ? (
                                        <>
                                            <h4>Monthly Programs</h4>
                                            <ul>
                                                {category.monthlyPrograms.map((program) => (
                                                    <li key={program._id} className={style.program}>
                                                        <h5>Month: {program.month}</h5>
                                                        <p>{program.description}</p>

                                                        {program.videos.length > 0 ? (
                                                            <>
                                                                <h5>Videos</h5>
                                                                <ul>
                                                                    {program.videos.map((video) => (
                                                                        <li key={video._id} className={style.video}>
                                                                            <h6>{video.name}</h6>
                                                                            <p>Description: {video.description}</p>
                                                                            <p>Duration: {video.duration}</p>
                                                                            <p>
                                                                                URL: <a href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a>
                                                                            </p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        ) : (
                                                            <p>No videos available</p>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <p>No monthly programs</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h3>No categories</h3>
                    )}
                </div>
            </div>

            {/* Footer - Close Button */}
            <div className={style.footer}>
                <button onClick={closeModal} className={style.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default OverviewModal;

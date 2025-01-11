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
                    {categories.length > 0 ? (
                        <ul>
                            {categories.map((category) => (
                                <li key={category._id} className={style.category}>
                                    <h3>{category.Name}</h3>
                                    <p><strong>ID:</strong> {category._id}</p>
                                    <p>{category.Description}</p>
                                    {category.Months?.length > 0 ? (<>
                                        <h4>Months</h4>
                                        <div>
                                            {
                                                category.Months.map((month, index) => (
                                                    <div key={month._id} className={style.month}>
                                                        <h1>Month {index + 1}</h1>
                                                        <h5>{month.Name}</h5>
                                                        <p>{month.Description}</p>
                                                        {month.Videos?.length > 0 ? (<div>Video: {month.Videos.length}</div>) : (<div>No videos</div>)}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>) : (<>No Months</>)}
                                    {category.SubCategories?.length > 0 ? (<>
                                        <h4>Subcategories</h4>
                                        <div>
                                            {
                                                category.SubCategories.map((subCategory) => (
                                                    <div key={subCategory._id} className={style.subCategory}>
                                                        <h5>{subCategory.Name}</h5>
                                                        <p>{subCategory.Description}</p>
                                                        {subCategory.Videos?.length > 0 ? (<div>Video: {subCategory.Videos.length}</div>) : (<div>No videos</div>)}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>) : (<>
                                        No subcategories
                                    </>)}
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

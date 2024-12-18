import style from "./Overview.module.css";

const OverviewModal = ({ closeModal, course, users }) => {
    return (
        <div className={style.modal}>
            {/* Two-column content */}
            <div className={style.content}>
                {/* Left Column - General Course Data */}
                <div className={style.column}>
                    <h1>Overview of {course.title}</h1>
                    <p><strong>Id:</strong> {course._id}</p>
                    <p><strong>Title:</strong> {course.title}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Subscribers:</strong> {course.subscribers.length}</p>
                    <p><strong>Price:</strong> {course.price}</p>

                    <h2>Benefits</h2>
                    <ul>
                        {course.benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                        ))}
                    </ul>

                    <h2>Excluded Benefits</h2>
                    <ul>
                        {course.excluded_benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                        ))}
                    </ul>

                    {course.subscribers.length > 0 ? (
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
                    {course.categories.length > 0 ? (
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

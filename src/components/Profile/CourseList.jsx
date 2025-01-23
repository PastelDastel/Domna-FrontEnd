import React, { useState, useEffect } from "react";
import VideoTrack from "./VideoTrack";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import style from "./CourseList.module.css";

const CourseList = ({ courses }) => {
    const axiosPrivate = useAxiosPrivate();

    const [videosProgress, setVideosProgress] = useState([]);
    const [completedVideos, setCompletedVideos] = useState(new Set());
    const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState(null);
    const [activeCourseId, setActiveCourseId] = useState(null);
    const [activeCategoryId, setActiveCategoryId] = useState(null); // Track which category is active
    const [expandedSubCategories, setExpandedSubCategories] = useState({}); // Track which subcategories are expanded
    const [expandedMonths, setExpandedMonths] = useState({}); // Track which months are expanded
    const toggleSubCategory = (id) => {
        setExpandedSubCategories((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    useEffect(() => {
        const fetchVideosProgress = async () => {
            try {
                const response = await axiosPrivate.get("/api/video");
                const completed = response.data
                    .filter((video) => video.status === "Completed")
                    .map((video) => video.videoId);

                setCompletedVideos(new Set(completed));
                setVideosProgress(response.data);
            } catch (err) {
                console.error("Error fetching videos progress:", err);
            }
        };
        fetchVideosProgress();
    }, [axiosPrivate]);

    const handleVideoUpdate = (updatedVideo) => {
        setVideosProgress((prev) => {
            const updatedProgress = prev.map((video) =>
                video.videoId === updatedVideo.videoId ? updatedVideo : video
            );

            if (updatedVideo.status === "Completed") {
                setCompletedVideos((prev) => new Set([...prev, updatedVideo.videoId]));
            }

            return updatedProgress;
        });
    };

    const handleVideoPlay = (videoId) => {
        setCurrentPlayingVideoId((prevVideoId) =>
            prevVideoId === videoId ? null : videoId
        );
    };

    const handleBackToCourses = () => {
        setActiveCourseId(null);
        setActiveCategoryId(null);
    };

    const handleBackToCategories = () => {
        setActiveCategoryId(null);
    };
    const toggleMonth = (id) => {
        setExpandedMonths((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    return (
        <>
            {activeCourseId === null ? (
                <>
                    <h1>I Tuoi Corsi</h1>
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className={style.courseCard}
                            onClick={() => setActiveCourseId(course._id)}
                        >
                            <div className={style.courseImageContainer}>
                                <img
                                    src={course.Image}
                                    alt={course.Title}
                                    className={style.courseImage}
                                />
                            </div>
                            <div className={style.courseDetails}>
                                <h2 className={style.courseTitle}>{course.Title}</h2>
                                <p
                                    dangerouslySetInnerHTML={
                                        { __html: course.Description.length > 350 ? course.Description.substring(0, 350) + "..." : course.Description }
                                    }
                                ></p>
                            </div>
                        </div>
                    ))}
                </>
            ) : activeCategoryId === null ? (
                <>
                    <button onClick={handleBackToCourses} className={style.goBackButton}>
                        Go Back
                    </button>
                    {courses
                        .filter((course) => course._id === activeCourseId)
                        .map((course) => (
                            <div key={course._id} className={style.activeCourseDetails}>
                                <div>
                                    <h1>{course.Title}</h1>
                                    <p
                                        dangerouslySetInnerHTML={
                                            { __html: course.Description }
                                        }
                                    ></p>
                                    {course.Categories.map((category) => (
                                        <div
                                            key={category.Name}
                                            className={style.categoryCard}
                                            onClick={() => setActiveCategoryId(category.Name)}
                                        >
                                            <img src={category.Image} alt="" />
                                            <div>
                                                <h2>{category.Name}</h2>
                                                <p dangerouslySetInnerHTML={
                                                    { __html: category.Description.length > 350 ? category.Description.substring(0, 350) + "..." : category.Description }
                                                }></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <>
                    <button onClick={handleBackToCategories} className={style.goBackButton}>
                        Go Back
                    </button>
                    {courses
                        .filter((course) => course._id === activeCourseId)
                        .map((course) =>
                            course.Categories.filter((category) => category.Name === activeCategoryId).map((category) => (
                                <div key={category.Name} className={style.activeCategoryDetails}>
                                    <h1>{category.Name}</h1>
                                    {category.Months?.map((program, index) => {
                                        const previousMonthCompleted =
                                            index === 0 || (category.Months[index - 1]?.Videos || []).every((video) => completedVideos.has(video._id));
                                        const isMonthUnlocked = previousMonthCompleted;
                                        const isExpanded = expandedMonths[program._id || index];
                                        const monthCompleted = (program?.Videos || []).every((video) => completedVideos.has(video._id));

                                        return (
                                            <div key={program._id || index} className={style.monthCard}>
                                                {/* Month Header */}
                                                <div
                                                    className={style.monthHeader}
                                                    onClick={() => toggleMonth(program._id || index)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <h3>
                                                        Mese {index + 1} {monthCompleted && "✔"} {/* Mark completed months */}
                                                    </h3>
                                                    <span>{isExpanded ? "▲" : "▼"}</span>
                                                </div>

                                                {/* Dropdown Content */}
                                                {isExpanded && (
                                                    <>
                                                        {isMonthUnlocked ? (
                                                            <>
                                                                <p>{program?.Description || "No description available"}</p>
                                                                <ul>
                                                                    {(program?.Videos || []).map((video, videoIndex) => {
                                                                        const isCompleted = completedVideos.has(video._id);
                                                                        const isVideoUnlocked =
                                                                            videoIndex === 0 || completedVideos.has(program?.Videos[videoIndex - 1]?._id);

                                                                        return (
                                                                            <li key={video._id}>
                                                                                {isVideoUnlocked ? (
                                                                                    <VideoTrack
                                                                                        isCompleted={isCompleted}
                                                                                        videoUrl={video.Url}
                                                                                        videoId={video._id}
                                                                                        videoName={video.Title}
                                                                                        onVideoUpdate={handleVideoUpdate}
                                                                                        isPlaying={currentPlayingVideoId === video._id}
                                                                                        onPlay={() => handleVideoPlay(video._id)}
                                                                                    />
                                                                                ) : (
                                                                                    <p style={{ color: "gray" }}>
                                                                                        🔒 {video.Title || "Untitled Video"} - Complete the previous video to unlock.
                                                                                    </p>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                        ) : (
                                                            <p style={{ color: "gray" }}>
                                                                🔒 Mese {program?._id || index} - Complete all videos from the previous month to unlock.
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {category.SubCategories?.map((subCategory, index) => {
                                        const isExpanded = expandedSubCategories[subCategory._id || index];
                                        return (
                                            <div key={subCategory._id || index} className={style.subCategoryCard}>
                                                {/* Subcategory Header */}
                                                <div
                                                    className={style.subCategoryHeader}
                                                    onClick={() => toggleSubCategory(subCategory._id || index)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <p>{subCategory.Name}</p>
                                                    <p>{subCategory.Description}</p>
                                                    <span>
                                                        {isExpanded ? "▲" : "▼"} {/* Toggle indicator */}
                                                    </span>
                                                </div>

                                                {/* Dropdown Content */}
                                                {isExpanded && (
                                                    <ul className={style.videoList}>
                                                        {(subCategory?.Videos || []).map((video, videoIndex) => {
                                                            const isCompleted = completedVideos.has(video._id);
                                                            const isVideoUnlocked =
                                                                videoIndex === 0 || completedVideos.has(subCategory?.Videos[videoIndex - 1]?._id);

                                                            return (
                                                                <li key={video._id}>
                                                                    <VideoTrack
                                                                        isCompleted={isCompleted}
                                                                        videoUrl={video.Url}
                                                                        videoId={video._id}
                                                                        videoName={video.Title}
                                                                        onVideoUpdate={handleVideoUpdate}
                                                                        isPlaying={currentPlayingVideoId === video._id}
                                                                        onPlay={() => handleVideoPlay(video._id)}
                                                                    />
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                </>
            )}
        </>
    );
};

export default CourseList;

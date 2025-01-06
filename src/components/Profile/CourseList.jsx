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
                            <h2 className={style.courseTitle}>{course.title}</h2>
                            <p>{course.description}</p>
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
                                <h1>{course.title}</h1>
                                <p>{course.description}</p>
                                {course.categories.map((category) => (
                                    <div
                                        key={category.name}
                                        className={style.categoryCard}
                                        onClick={() => setActiveCategoryId(category.name)}
                                    >
                                        <h2>{category.name}</h2>
                                    </div>
                                ))}
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
                            course.categories
                                .filter((category) => category.name === activeCategoryId)
                                .map((category) => (
                                    <div key={category.name} className={style.activeCategoryDetails}>
                                        <h1>{category.name}</h1>
                                        {category.monthlyPrograms.map((program) => {
                                            let previousMonthCompleted = true;

                                            const isMonthUnlocked = previousMonthCompleted;
                                            const monthCompleted = program.videos.every((video) =>
                                                completedVideos.has(video._id)
                                            );

                                            previousMonthCompleted = monthCompleted;

                                            let previousVideoCompleted = true;

                                            return (
                                                <div key={program.month} className={style.monthCard}>
                                                    {isMonthUnlocked ? (
                                                        <>
                                                            <p>{program.description}</p>
                                                            <ul>
                                                                {program.videos.map((video) => {
                                                                    const isCompleted = completedVideos.has(video._id);
                                                                    const isVideoUnlocked = previousVideoCompleted;
                                                                    previousVideoCompleted = isCompleted;
                                                                    return (
                                                                        <li key={video._id}>
                                                                            {isVideoUnlocked ? (
                                                                                <VideoTrack
                                                                                    isCompleted={isCompleted}
                                                                                    videoUrl={video.url}
                                                                                    videoId={video._id}
                                                                                    videoName={video.name}
                                                                                    onVideoUpdate={handleVideoUpdate}
                                                                                    isPlaying={
                                                                                        currentPlayingVideoId === video._id
                                                                                    }
                                                                                    onPlay={() => handleVideoPlay(video._id)}
                                                                                />
                                                                            ) : (
                                                                                <p style={{ color: "gray" }}>
                                                                                    🔒 {video.name} - Complete the previous
                                                                                    video to unlock.
                                                                                </p>
                                                                            )}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <p style={{ color: "gray" }}>
                                                            🔒 Mese {program.month} - Complete all videos from the previous
                                                            month to unlock.
                                                        </p>
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

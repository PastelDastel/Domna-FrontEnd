import React, { useState, useEffect } from "react";
import VideoTrack from "./VideoTrack";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CourseList = ({ courses }) => {
    const axiosPrivate = useAxiosPrivate();

    const [videosProgress, setVideosProgress] = useState([]);
    const [completedVideos, setCompletedVideos] = useState(new Set());
    const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState(null); // Track the currently playing video ID

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

            // Update the completed videos set
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
    

    return (
        <>
            {courses.length > 0 ? (
                <>
                    <h1>I Tuoi Corsi</h1>
                    {courses.map((course) => (
                        <div key={course._id} style={{ marginBottom: "20px" }}>
                            <h2>{course.title}</h2>
                            {course.categories.map((category, categoryIndex) => {
                                let previousMonthCompleted = true;

                                return (
                                    <div key={categoryIndex}>
                                        <h3>{category.name}</h3>
                                        {category.monthlyPrograms.map((program, programIndex) => {
                                            const isMonthUnlocked = previousMonthCompleted;

                                            const monthCompleted = program.videos.every((video) =>
                                                completedVideos.has(video._id)
                                            );

                                            previousMonthCompleted = monthCompleted;

                                            let previousVideoCompleted = true;

                                            return (
                                                <div key={programIndex} style={{ marginTop: "20px" }}>
                                                    <h4>Mese {program.month}</h4>
                                                    {isMonthUnlocked ? (
                                                        <>
                                                            <p>{program.description}</p>
                                                            <ul>
                                                                {program.videos.map((video) => {
                                                                    const isCompleted = completedVideos.has(video._id);
                                                                    const isVideoUnlocked = previousVideoCompleted;

                                                                    // Update for the next video
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
                                                                                    isPlaying={currentPlayingVideoId === video._id}
                                                                                    onPlay={() => handleVideoPlay(video._id)}
                                                                                />
                                                                            ) : (
                                                                                <p style={{ color: "gray" }}>
                                                                                    🔒 {video.name} - Complete the previous video to unlock.
                                                                                </p>
                                                                            )}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <p style={{ color: "gray" }}>
                                                            🔒 Mese {program.month} - Complete all videos from the
                                                            previous month to unlock.
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </>
            ) : (
                <p>Iscriviti ad un corso per accedere a questa sezione</p>
            )}
        </>
    );
};

export default CourseList;

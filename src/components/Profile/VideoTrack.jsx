import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import style from "./VideoTrack.module.css";
const VideoTrack = ({
    isCompleted,
    videoUrl,
    videoId,
    videoName,
    onVideoUpdate,
    isPlaying,
    onPlay,
}) => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const playerRef = useRef(null);
    const intervalRef = useRef(null); // Ref for managing the interval
    const actualTimeRef = useRef(0.1); // To track time watched since the last update

    // Function to send tracking data
    const sendTrackingData = async (status) => {
        const timestamp = playerRef.current?.getCurrentTime() || 0.1;
        let actualTime = actualTimeRef.current;
        if (actualTime > 0.1) { actualTime -= 0.1; } // Subtract the initial 0.1 seconds

        try {
            await axiosPrivate.post("/api/video/track", {
                videoId,
                videoUrl,
                timestamp,
                actualTime,
                status,
            });

            onVideoUpdate({
                videoId,
                status,
                timestamp,
                actualTime,
            });
            console.log("Video progress tracked successfully");
        } catch (err) {
            console.error("Error tracking video progress:", err);
        } finally {
            actualTimeRef.current = 0.1; // Reset actualTime no matter what
        }
    };

    // Start periodic updates every 5 seconds
    const startTracking = () => {
        if (!intervalRef.current) {
            let count = 0;
            intervalRef.current = setInterval(() => {
                count += 0.5;
                actualTimeRef.current += 0.5; // Increment watched time by 5 seconds
                if (count === 5 && playerRef.current) {
                    sendTrackingData("In Progress");
                    count = 0;
                }
            }, 500);
        }
    };

    // Stop periodic updates and send final data
    const stopTracking = (status) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (playerRef.current) {
            sendTrackingData(status); // Send the accumulated actual time
        }
    };

    // Cleanup when visibility or component changes
    useEffect(() => {
        if (!isPlaying) {
            stopTracking("Paused");
        }
        return () => stopTracking("Paused");
    }, [isPlaying]);

    return (
        <div style={{ margin: "10px" }}>
            <button onClick={() => onPlay(videoId)} style={{ margin: "10px", padding: "5px", backgroundColor: "lightblue", borderRadius: "5px" }}>
                {isPlaying ? "Close Video" : `${videoName}`}
            </button>
            {isPlaying && (
                <div className={style.playerWrapper}>
                    {loading && <p>Loading...</p>}
                    <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        ref={playerRef}
                        url={videoUrl}
                        controls
                        playing={isPlaying}
                        onReady={() => setLoading(false)}
                        onPlay={() => {
                            startTracking();
                        }}
                        onPause={() => stopTracking("Paused")}
                        onEnded={() => stopTracking("Completed")}
                    />
                </div>
            )}
        </div>
    );
};

export default VideoTrack;

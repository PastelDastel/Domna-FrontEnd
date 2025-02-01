import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import style from "./RecordingTrack.module.css";

const RecordingTrack = ({
    isCompleted,
    recordingUrl,
    recordingId,
    recordingName,
    onRecordingUpdate,
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
            await axiosPrivate.post("/api/recordingTrack/track", {
                videoId: recordingId,
                videoUrl: recordingUrl,
                timestamp,
                actualTime,
                status,
            });

            onRecordingUpdate({
                recordingId,
                status,
                timestamp,
                actualTime,
            });
            console.log("Recording progress tracked successfully");
        } catch (err) {
            console.error("Error tracking recording progress:", err);
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
            <button
                onClick={() => {
                    if (isPlaying) {
                        onPlay(null); // Set playingRecording to null to stop playback
                    } else {
                        onPlay(recordingId);
                    }
                }}
                style={{
                    margin: "10px",
                    padding: "5px",
                    backgroundColor: "lightblue",
                    borderRadius: "5px",
                }}
            >
                {isPlaying ? "Close Recording" : `${recordingName}`}
            </button>

            {isPlaying && (
                <div className={style.playerWrapper}>
                    {loading && <p>Loading...</p>}
                    <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        ref={playerRef}
                        url={recordingUrl}
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

export default RecordingTrack;

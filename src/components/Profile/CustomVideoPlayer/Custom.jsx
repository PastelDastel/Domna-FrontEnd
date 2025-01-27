import React, { useState, forwardRef } from "react";
import ReactPlayer from "react-player";

const CustomReactPlayer = forwardRef(
    ({ videoUrl, onPlay, onPause, onEnded, onReady }, ref) => {
        const [playing, setPlaying] = useState(true); // Playback state
        const [progress, setProgress] = useState(0); // Video progress
        const [volume, setVolume] = useState(0.5); // Volume state (default to 50%)

        return (
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "800px",
                    aspectRatio: "16 / 9", // Maintain a 16:9 aspect ratio
                    margin: "auto",
                    backgroundColor: "black", // Fallback background for responsiveness
                }}
            >
                {/* ReactPlayer with custom controls */}
                <ReactPlayer
                    ref={ref} // Pass the reference for external control
                    url={videoUrl}
                    playing={playing}
                    volume={volume} // Set the volume
                    controls={false} // Hide default controls
                    width="100%"
                    height="100%"
                    onPlay={() => {
                        setPlaying(true);
                        if (onPlay) onPlay(); // Trigger onPlay callback
                    }}
                    onPause={() => {
                        setPlaying(false);
                        if (onPause) onPause(); // Trigger onPause callback
                    }}
                    onEnded={() => {
                        setPlaying(false);
                        if (onEnded) onEnded(); // Trigger onEnded callback
                    }}
                    onReady={onReady}
                    onProgress={({ played }) => setProgress(played)} // Track progress
                />

                {/* Custom Controls */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "0",
                        right: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column", // Stack controls vertically on small screens
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                    }}
                >
                    {/* Play/Pause Button */}
                    <button
                        onClick={() => setPlaying((prev) => !prev)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        {playing ? "Pause" : "Play"}
                    </button>

                    {/* Progress Bar */}
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step="0.01"
                        value={progress}
                        onChange={(e) => ref.current.seekTo(parseFloat(e.target.value), "fraction")}
                        style={{ width: "90%" }}
                    />

                    {/* Volume Control */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "90%",
                        }}
                    >
                        <span style={{ marginRight: "5px", fontSize: "14px" }}>🔊</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            style={{ flex: 1 }}
                        />
                    </div>

                    {/* Fullscreen Button */}
                    <button
                        onClick={() => {
                            if (ref.current?.wrapper?.requestFullscreen) {
                                ref.current.wrapper.requestFullscreen();
                            }
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Fullscreen
                    </button>
                </div>
            </div>
        );
    }
);

export default CustomReactPlayer;

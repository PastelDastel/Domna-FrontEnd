import React, { useEffect } from "react";

const loadYouTubeAPI = () => {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
        } else {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.onload = resolve;
            document.body.appendChild(script);
        }
    });
};

const VideoPlayer = ({ videoId }) => {
    useEffect(() => {
        let player;

        // Define the onPlayerStateChange function here
        const onPlayerStateChange = (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
                console.log("Video started at:", player.getCurrentTime(), "seconds");
            } else if (event.data === window.YT.PlayerState.PAUSED) {
                console.log("Video paused at:", player.getCurrentTime(), "seconds");
            } else if (event.data === window.YT.PlayerState.ENDED) {
                console.log("Video completed!");
            }
        };

        // Load the YouTube API and initialize the player
        loadYouTubeAPI().then(() => {
            player = new window.YT.Player(`player-${videoId}`, {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    origin: window.location.origin,
                },
                events: {
                    onStateChange: onPlayerStateChange, // Use the defined function
                },
            });
        });

        // Cleanup the player on unmount
        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, [videoId]);

    // Scroll Listener (with passive: true)
    useEffect(() => {
        const handleScroll = () => {
            console.log("User is scrolling the page with video.");
        };

        // Attach scroll listener with passive: true
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup the listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div id={`player-${videoId}`} style={{ width: "100%", height: "360px" }}></div>
        </div>
    );
};

export default VideoPlayer;

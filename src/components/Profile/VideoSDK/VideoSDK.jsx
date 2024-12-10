import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VideoSDK.module.css";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, startRecording, stopRecording } from "./API";
import ReactPlayer from "react-player";

function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div className={styles.participantContainer}>
            <p className={styles.participantDetails}>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
            {webcamOn && (
                <ReactPlayer
                    className={styles.reactPlayer}
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={"700px"}
                    width={"900px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

function Controls({ meetingId }) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [recording, setRecording] = useState(false);

    const handleStartRecording = async () => {
        try {
            await startRecording(meetingId);
            setRecording(true);
            alert("Recording started");
        } catch (error) {
            console.error("Failed to start recording:", error);
            alert("Could not start recording.");
        }
    };

    const handleStopRecording = async () => {
        try {
            await stopRecording(meetingId);
            setRecording(false);
            alert("Recording stopped");
        } catch (error) {
            console.error("Failed to stop recording:", error);
            alert("Could not stop recording.");
        }
    };

    return (
        <div className={styles.controls}>
            <button onClick={() => leave()} className={styles.controlsButton}>Leave</button>
            <button onClick={() => toggleMic()} className={styles.controlsButton}>Toggle Mic</button>
            <button onClick={() => toggleWebcam()} className={styles.controlsButton}>Toggle Webcam</button>
            {!recording ? (
                <button onClick={handleStartRecording} className={styles.controlsButton}>
                    Start Recording
                </button>
            ) : (
                <button onClick={handleStopRecording} className={styles.controlsButton}>
                    Stop Recording
                </button>
            )}
        </div>
    );
}

function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join, participants } = useMeeting({
        onMeetingJoined: () => setJoined("JOINED"),
        onMeetingLeft: () => props.onMeetingLeave(),
    });

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    // Function to get the current day of the week
    const getDayName = () => {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return days[new Date().getDay()]; // Returns the current day
    };

    return (
        <div className={styles.container}>
            <h3>{getDayName()}'s Live</h3>
            {joined === "JOINED" ? (
                <div>
                    <Controls meetingId={props.meetingId} />
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                </div>
            ) : joined === "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting} className={styles.headerButton}>
                    Join
                </button>
            )}
        </div>
    );
}

function VideoSDK({ user, meetingId }) {
    const onMeetingLeave = () => {
        console.log("Meeting ended");
    };

    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: user.username,
            }}
            token={authToken}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
    ) : (
        <div className={styles.container}>
            <p>Invalid Meeting ID</p>
        </div>
    );
}

export default VideoSDK;

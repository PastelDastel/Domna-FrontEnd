import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VideoSDK.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import {
    authToken,
    startRecording,
    stopRecording,
    createMeeting,
    getStreamingStatus,
    setStreamingStatus,
} from "./API";
import ReactPlayer from "react-player";

const checkIfAdmin = (id) => {
    const adminIds = ["6734cb05fe1406b0b8998e47"];
    return adminIds.includes(id);
};

function ParticipantView({ participantId, isAdmin = false }) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(participantId);

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

    return (<>
        {isAdmin ? (<>
            <div className={styles.adminContainer}>
                <p className={styles.adminDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
        </>) : (<>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.participantDetails}>
                    {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                    {micOn ? "ON" : "OFF"}
                </p>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
                {webcamOn ? (
                    <ReactPlayer
                        className={styles.reactPlayer}
                        playsinline
                        light={false}
                        controls={isAdmin}
                        muted={true}
                        playing={true}
                        url={videoStream}
                        pip={false}
                        onError={(err) => {
                            console.log(err, "participant video error");
                        }}
                    />
                ) : (
                    <div className={styles.webcamPlaceholder}>
                        <div className={styles.FaIconDiv}>
                            <FontAwesomeIcon icon={faUser} className={styles.FAICON} />
                        </div>
                    </div>
                )}
            </div>
            
        </>)}
    </>
    );
}

function Controls({ meetingId, user, endLiveStream }) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [recording, setRecording] = useState(false);
    const isAdmin = checkIfAdmin(user.id);
    const handleStartRecording = async () => {
        try {
            await startRecording(meetingId);
            setRecording(true);
        } catch (error) {
            console.error("Failed to start recording:", error);
        }
    };
    const handleStopRecording = async () => {
        try {
            await stopRecording(meetingId);
            setRecording(false);
        } catch (error) {
            console.error("Failed to stop recording:", error);
        }
    };
    return (
        <div className={styles.controls}>
            <button onClick={() => toggleMic()} className={styles.controlsButton}>
                Toggle Mic
            </button>
            <button onClick={() =>
                toggleWebcam()
            } className={styles.controlsButton}>
                Toggle Webcam
            </button>
            {isAdmin && (
                !recording ? (
                    <button onClick={handleStartRecording} className={styles.controlsButton}>
                        Start Recording
                    </button>
                ) : (
                    <button onClick={handleStopRecording} className={styles.controlsButton}>
                        Stop Recording
                    </button>
                )
            )}
            {isAdmin && (
                <button onClick={endLiveStream} className={styles.controlsButton}>
                    End Live Stream
                </button>
            )}
            {
                !isAdmin && <button onClick={() => leave()} className={styles.controlsButton}>
                    Leave
                </button>
            }
        </div>
    );
}

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function MeetingView({ meetingId, onMeetingLeave, user }) {
    const [joined, setJoined] = useState(null);
    const [isLive, setIsLive] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const { join, leave, participants } = useMeeting({
        onMeetingJoined: () => setJoined("JOINED"),
        onMeetingLeft: () => {
            setJoined(null);
            if (user.roles.toString() === "6792941695628669") {
                setStreamingStatus(axiosPrivate, false); // Update backend status
                setIsLive(false);
            }
            onMeetingLeave(); // Trigger custom onMeetingLeave handler
        },
    });
    const amIAdmin = checkIfAdmin(user.id);

    const startLiveStream = async () => {
        try {
            await setStreamingStatus(axiosPrivate, true);
            setIsLive(true);
            join();
        } catch (error) {
            console.error("Failed to start live stream. Please try again later.", error);
        }
    };

    const endLiveStream = async () => {
        try {
            await setStreamingStatus(axiosPrivate, false); // Update backend status
            setIsLive(false);
            leave(); // Ensure `leave` updates participant state
        } catch (error) {
            console.error("Failed to end live stream:", error);
        }
    };

    const check = () => {
        const parts = {};
        participants.forEach((participant, id) => {
            parts[id] = participant.displayName;
        });
        return parts;
    };

    const display = () => {
        const parts = check();
        const sortedKeys = sort(Object.keys(parts));
        return (
            <div className={styles.participantGrid}>
                {sortedKeys.map((key) => (
                    <ParticipantView
                        key={key}
                        participantId={key}
                        isAdmin={checkIfAdmin(key)}
                    />
                ))}
            </div>
        );
    };

    const sort = (participantsArray) => {
        return [...participantsArray].sort((a, b) => {
            const isAdminA = checkIfAdmin(a);
            const isAdminB = checkIfAdmin(b);
            return isAdminB - isAdminA;
        });
    };

    useEffect(() => {
        const fetchLiveStatus = async () => {
            try {
                const liveStatus = await getStreamingStatus(axiosPrivate);
                setIsLive(liveStatus);
                if (!liveStatus && joined === "JOINED") {
                    leave(); // Disconnect if live ends
                }
            } catch (error) {
                console.error("Error fetching live status:", error);
            }
        };

        fetchLiveStatus();
        const interval = setInterval(fetchLiveStatus, 5000);
        return () => clearInterval(interval);
    }, [axiosPrivate, joined, leave]);


    return (
        <div className={styles.PreLiveContainer}>
            <h3>Today's Live</h3>
            <div className={styles.PreLiveSecondContainer}>
                {joined === "JOINED" ? (
                    <div className={styles.thirdContainer}>
                        <Controls
                            meetingId={meetingId}
                            user={user}
                            endLiveStream={endLiveStream}
                        />
                        <div className={styles.meetingLayout}>{display()}</div>
                    </div>
                ) : joined === "JOINING" ? (
                    <p>Joining the meeting...</p>
                ) : (
                    <div>
                        {amIAdmin && !isLive && (
                            <button
                                onClick={startLiveStream}
                                className={styles.headerButton}
                            >
                                Start Live Stream
                            </button>
                        )}
                        {isLive && (
                            <button
                                onClick={join}
                                className={styles.headerButton}
                            >
                                Join Meeting
                            </button>
                        )}
                        {!isLive && !amIAdmin && (
                            <p>Live stream has not started yet. Please wait for the admin.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function VideoSDK({ user, meetingId }) {
    const onMeetingLeave = () => {
        console.log("Meeting ended");
    };
    return authToken ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: user.username,
                participantId: user.id,
            }}
            token={authToken}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} user={user} />
        </MeetingProvider>
    ) : (
        <div className={styles.container}>
            <p>Invalid Meeting ID</p>
        </div>
    );
}
export default VideoSDK;
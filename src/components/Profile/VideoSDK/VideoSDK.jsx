import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VideoSDK.module.css";
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

    return (
        <div className={styles.participantContainer}>
            <p className={styles.participantDetails}>
                {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} className={styles.audio} />
            {webcamOn && (
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
            )}
        </div>
    );
}

function Controls({ meetingId, user, endLiveStream }) {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [recording, setRecording] = useState(false);

    const isAdmin = user.roles.toString() === "6792941695628669";

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
            <button onClick={() => toggleWebcam()} className={styles.controlsButton}>
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
    const axiosPrivate = useAxiosPrivate(); // Get axios instance

    const { join, leave, participants } = useMeeting({
        onMeetingJoined: () => setJoined("JOINED"),
        onMeetingLeft: () => {
            setJoined(null);
            if (user.roles.toString() === "6792941695628669") {
                // Admin leaves
                setStreamingStatus(axiosPrivate, false); // Update backend status
                setIsLive(false);
            } else {
                console.log("You have been disconnected as the live stream has ended.");
            }
            onMeetingLeave();
        },
    });

    const isAdmin = user.roles.toString() === "6792941695628669";
    //take the first participant and switch it with 2nd index
    /*
    0:{"675b064c3443b7712857c253" => e4}
    1:{"6734cb05fe1406b0b8998e47" => e4}

    after switch
    0:{"6734cb05fe1406b0b8998e47" => e4}
    1:{"675b064c3443b7712857c253" => e4}
    */

    useEffect(() => {
        const fetchLiveStatus = async () => {
            const liveStatus = await getStreamingStatus(axiosPrivate); // Fetch live status
            setIsLive(liveStatus);
            if (!liveStatus && joined === "JOINED") {
                // If live ends, disconnect all users
                leave();
            }
        };

        fetchLiveStatus();

        // Polling for live status
        const interval = setInterval(fetchLiveStatus, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [axiosPrivate, joined, leave]);

    const startLiveStream = async () => {
        try {
            await setStreamingStatus(axiosPrivate, true); // Update live status on backend
            setIsLive(true);
            join(); // Admin auto-joins
        } catch (error) {
            console.error("Error starting live stream:", error);
        }
    };

    const endLiveStream = () => {
        leave(); // Disconnect admin
        setStreamingStatus(axiosPrivate, false); // Update backend to end live
        setIsLive(false); // Update local state
    };
    console.log("PARTICIPANTS:", participants)
    return (
        <div className={styles.PreLiveContainer}>
            <h3>Today's Live</h3>
            <div className={styles.PreLiveSecondContainer}>
                {joined === "JOINED" ? (
                    <div className={styles.thirdContainer}>
                        <Controls meetingId={meetingId} user={user} endLiveStream={() => {
                            endLiveStream();
                        }} />

                        <div className={styles.meetingLayout}>

                            {/* Admin's Video 
                                 will return the first participantId
                            
                            */
                                console.log(participants.keys().next().value)}
                            {isAdmin && (
                                <div className={styles.adminContainer}>
                                    <ParticipantView participantId={participants.keys().next().value} isAdmin={true} />
                                </div>
                            )}

                            {/* Other Participants */}
                            <div className={styles.participantGrid}>
                                {[...participants.keys()].map((participantId) => {
                                    if (isAdmin && participantId === participants.keys().next().value) return null;
                                    return (
                                        <div key={participantId}>
                                            <ParticipantView participantId={participantId} />
                                        </div>
                                    );
                                })}
                            </div>


                        </div>
                    </div>
                ) : joined === "JOINING" ? (
                    <p>Joining the meeting...</p>
                ) : (
                    <div>
                        {isAdmin && !isLive && (
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
                        {!isLive && !isAdmin && (
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
    console.log("USER:", user)
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

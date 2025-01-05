import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:3500");

function App() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const [roomId, setRoomId] = useState("");
    const [isInCall, setIsInCall] = useState(false);

    // WebRTC configuration
    const config = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }, // Public STUN server
        ],
    };

    useEffect(() => {
        // Handle incoming WebRTC signaling messages
        socket.on("offer", async (offer) => {
            console.log("Received offer:", offer);
            try {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
                console.log("Remote description set for offer.");
                const answer = await peerConnection.current.createAnswer();
                console.log("Created answer:", answer);
                await peerConnection.current.setLocalDescription(answer);
                console.log("Local description set for answer.");
                socket.emit("answer", { answer, roomId });
            } catch (error) {
                console.error("Error handling offer:", error);
            }
        });

        socket.on("answer", async (answer) => {
            console.log("Received answer:", answer);
            if (peerConnection.current.signalingState === "have-local-offer") {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            } else {
                console.warn("Ignoring answer: PeerConnection is not in the correct state.");
            }
        });

        socket.on("candidate", async (candidate) => {
            console.log("Received candidate:", candidate);
            if (peerConnection.current) {
                try {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    console.log("Added ICE candidate successfully.");
                } catch (err) {
                    console.error("Error adding received ICE candidate:", err);
                }
            }
        });

        return () => {
            socket.off("offer");
            socket.off("answer");
            socket.off("candidate");
        };
    }, [roomId]);

    const startCall = async () => {
        console.log("Starting call...");
        peerConnection.current = new RTCPeerConnection(config);

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Sending ICE candidate:", event.candidate);
                socket.emit("candidate", { candidate: event.candidate, roomId });
            }
        };

        // Handle remote track (incoming video/audio)
        peerConnection.current.ontrack = (event) => {
            console.log("Received remote track:", event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Get local media stream and add to PeerConnection
        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        console.log("Got local stream:", localStream);
        localStream.getTracks().forEach((track) => {
            peerConnection.current.addTrack(track, localStream);
        });

        localVideoRef.current.srcObject = localStream;

        // Debug signaling state changes
        peerConnection.current.onsignalingstatechange = () => {
            console.log("Signaling state:", peerConnection.current.signalingState);
        };

        // Debug ICE connection state changes
        peerConnection.current.oniceconnectionstatechange = () => {
            console.log("ICE connection state:", peerConnection.current.iceConnectionState);
        };
    };

    const createRoom = () => {
        const id = prompt("Enter Room ID (e.g., '1234'):");
        if (id) {
            setRoomId(id);
            setIsInCall(true);
            startCall();
            socket.emit("create-room", { roomId: id });
        }
    };

    const joinRoom = () => {
        const id = prompt("Enter Room ID to Join:");
        if (id) {
            setRoomId(id);
            setIsInCall(true);
            startCall();
            socket.emit("join-room", { roomId: id });
        }
    };

    const handleOffer = async () => {
        try {
            const offer = await peerConnection.current.createOffer();
            console.log("Created offer:", offer);
            await peerConnection.current.setLocalDescription(offer);
            console.log("Local description set for offer.");
            socket.emit("offer", { offer, roomId });
        } catch (error) {
            console.error("Error creating or sending offer:", error);
        }
    };
    return (
        <div>
            {!isInCall ? (
                <div>
                    <button onClick={createRoom}>Create Room</button>
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <div>
                    <video ref={localVideoRef} autoPlay playsInline muted />
                    <video ref={remoteVideoRef} autoPlay playsInline />
                    <button onClick={handleOffer}>Start Call</button>
                </div>
            )}
        </div>
    );
}

export default App;

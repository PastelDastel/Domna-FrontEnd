export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxYzMyOTJiMi01ZTczLTQyZGYtOTJlNS01Mzk4Y2RiYzExMTYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMzQ5NDMzNCwiZXhwIjoxODkxMjgyMzM0fQ.MOwMQQGTwdholoSumbnXdWaj2d1fWr8VVmMNZq_aepc";

const Rooms = [
    {
        roomId: "up18-0e64-r2a2",
        customRoomId: "DomnaLive Room Monday",
    },
    {
        roomId: "kr05-te8v-28ng",
        customRoomId: "DomnaLive Room Tuesday",
    },
    {
        roomId: "wszw-39rn-e763",
        customRoomId: "DomnaLive Room Wednesday",
    },
    {
        roomId: "ptm4-ejem-5rhp",
        customRoomId: "DomnaLive Room Thursday",
    }
    ,
    {
        roomId: "9f1p-3pxl-s4ha",
        customRoomId: "DomnaLive Room Friday",
    },
    {
        roomId: "59hl-arde-lbcx",
        customRoomId: "DomnaLive Room Saturday",
    },
    {
        roomId: "hsjs-65m1-fccb",
        customRoomId: "DomnaLive Room Sunday",
    },
]; // mock data

export const getLastRecordingBasedOnRoomId = async () => {
    const recordings = [];

    if (!Rooms || Rooms.length === 0) {
        console.log("No rooms available to fetch recordings.");
        return recordings;
    }
    try {
        // Create an array of promises to fetch data in parallel
        const fetchPromises = Rooms.map(async (room) => {
            try {
                const res = await fetch(
                    `https://api.videosdk.live/v2/recordings?roomId=${room.roomId}`,
                    {
                        method: "GET",
                        headers: {
                            authorization: `${authToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await res.json();

                // Ensure the response has data and push the first recording
                if (data.data && data.data.length > 0) {
                    return data.data[0];
                } else {
                    console.log(`No recordings found for room: ${room.customRoomId}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching recordings for room ${room.customRoomId}:`, error);
                return null;
            }
        });
        // Wait for all fetch operations to complete
        const results = await Promise.all(fetchPromises);
        // Filter out null results and add to recordings
        recordings.push(...results.filter((recording) => recording !== null));
        return recordings;
    } catch (error) {
        console.error("Error in getLastRecordingBasedOnRoomId: ", error);
        return [];
    }
};

// API call to create a meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "customRoomId": "DomnaLive Room Sunday"
        }),
    });
    // Destructuring the roomId from the response
    const { roomId } = await res.json();
    return roomId;
};

export const startRecording = async (roomId) => {
    const res = await fetch(`https://api.videosdk.live/v2/recordings/start`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            roomId: roomId,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to start recording");
    }
    return res.json();
};

export const stopRecording = async (roomId) => {
    const res = await fetch(`https://api.videosdk.live/v2/recordings/end`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "roomId": roomId,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to stop recording");
    }
    return res.json();
};


export const getTodayRoomID = () => {
    const today = new Date().getDay();
    const room = Rooms.find((room, index) =>
        index === today - 1);
    return room ? room.roomId : null;
};
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxYzMyOTJiMi01ZTczLTQyZGYtOTJlNS01Mzk4Y2RiYzExMTYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMzQ5NDMzNCwiZXhwIjoxODkxMjgyMzM0fQ.MOwMQQGTwdholoSumbnXdWaj2d1fWr8VVmMNZq_aepc";

// API call to create a meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "customRoomId": "thi-ste-sts"
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


const getRoomIDs = async () => {
    const roomIDS = [];
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "GET",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch room IDs");
    }
    const data = await res.json();

    // Extract the room IDs
    data.data.forEach((room) => {
        roomIDS.push(room.roomId);
    });

    console.log("Fetched Room IDs:", roomIDS);
    return roomIDS;
};

export const getRecordings = async () => {
    try {
        const roomIDs = await getRoomIDs();

        // Use Promise.all to wait for all fetch calls to complete
        const recordingsData = await Promise.all(
            roomIDs.map(async (roomId) => {
                const res = await fetch(`https://api.videosdk.live/v2/recordings?roomId=${roomId}`, {
                    method: "GET",
                    headers: {
                        authorization: `${authToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch recordings for room ${roomId}`);
                }

                const data = await res.json();
                return data.data; // Assuming 'data.data' contains the recordings for the room
            })
        );

        // Flatten the array of recordings if needed
        const allRecordings = recordingsData.flat();
        console.log("Fetched Recordings:", allRecordings);

        return allRecordings;
    } catch (error) {
        console.error("Error fetching recordings:", error);
        throw error;
    }
};

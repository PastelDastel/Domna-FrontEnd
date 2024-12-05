import axios from "../../api/axios";
export const authToken = async () => {
    try {
        const response = await axios.post("/api/videosdk/generate-token");
        return response.data.token;
    } catch (error) {
        console.error("Error fetching auth token:", error);
        return null;
    }
}

export const createMeeting = async ({ token }) => {
    const res = await axios.post("https://api.videosdk.live/v2/rooms", {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    const room_id = res.data.room_id;
    return room_id;
}
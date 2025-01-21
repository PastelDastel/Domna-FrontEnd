import style from "./Create.module.css";
import { useState } from "react";
const Create = ({ closeModal, axios, onRecordingCreated }) => {
    const [Date, setDate] = useState("");
    const [Url, setUrl] = useState("");

    const createLive = async (e) => {
        e.preventDefault();
        if (!Date || !Url) {
            return;
        }
        try {
            const res = await axios.post("/api/recordings", {
                Date: Date,
                Url: Url,
            });
            console.log("Created live:", res.data);
            onRecordingCreated(res.data); // Reload lives after a successful creation
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error creating live:", error);
        }
    };

    return (
        <div className={style["create-modal-recording"]}>
            <h1>Create Recording</h1>
            <form onSubmit={createLive}>
                <div className={style["input-date"]}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />                </div>
                <div className={style["input-url"]}>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="url" onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div className={style["group-button"]}>
                    <button type="button" onClick={closeModal}>Close</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )

};

export default Create;
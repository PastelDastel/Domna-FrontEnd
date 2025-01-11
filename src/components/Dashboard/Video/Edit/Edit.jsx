import { useState } from "react";
import style from "./Edit.module.css";

const Edit = ({ onVideoUpdated, closeModal, axios, video }) => {

    const [title, setTitle] = useState(video?.Title || "");
    const [description, setDescription] = useState(video?.Description || "");
    const [url, setUrl] = useState(video?.Url || "");

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log("Editing video:", { title, description, url });
            const res = await axios.put(`/api/videos/${video._id}`, {
                Title: title,
                Description: description,
                Url: url,
            });
            console.log("Updated video:", res.data);
            onVideoUpdated(res.data); // Reload videos after a successful update
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error updating video:", error);
        }
    };

    return (
        <div className={style.content}>
            <h1>Edit Video</h1>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
        </div>
    );

};

export default Edit;
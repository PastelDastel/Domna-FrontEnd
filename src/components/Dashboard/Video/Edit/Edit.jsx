import { useState } from "react";
import style from "./Edit.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Edit = ({ onVideoUpdated, closeModal, axios, video }) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: video?.Description || "",
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

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
        <div className={style.editVideo}>
            <h1>Edit Video</h1>
            <form onSubmit={submitForm}>
                <div className={style.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className={style.inputGroup}><label htmlFor="description">Description</label>
                    <span><EditorContent editor={editor} /></span>
                </div>

                <div className={style.inputGroup}> <label htmlFor="url">URL</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    /></div>
                <div className={style.buttonGroup}>
                    <button type="button" onClick={closeModal}>Close</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );

};

export default Edit;
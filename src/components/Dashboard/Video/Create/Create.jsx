import style from "./Create.module.css";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const Create = ({ closeModal, axios, onVideoCreated }) => {
    const [description, setDescription] = useState("");
    const editor = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    const createVideo = async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const descriptionValue = description;
        const url = document.getElementById("url").value;
        if (!title || !url) {
            alert("Title, URL, and Category are required.");
            return;
        }
        try {
            const res = await axios.post("/api/videos", {
                Title: title,
                Description: descriptionValue,
                Url: url,
            });
            console.log("Created video:", res.data);
            onVideoCreated(res.data); // Reload videos after a successful creation
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error creating video:", error);
        }
    };





    return (
        <div className={style.createVideo}>
            <h1>Create Video</h1>
            <form onSubmit={createVideo}>
                <div className={style.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div className={style.inputGroup}>

                    <label htmlFor="description">Description</label>
                    <span>
                        <EditorContent editor={editor} />
                    </span>
                </div>
                <div className={style.inputGroup}>

                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="url" required />
                </div>
                <div className={style.buttonGroup}>
                    <button type="button" onClick={closeModal}>Close</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
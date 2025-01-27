import { useState } from "react";
import style from "./Edit.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Edit = ({ closeModal, axios, recording, onRecordingUpdated }) => {
    const [date, setDate] = useState(recording?.Date || "");
    const [url, setUrl] = useState(recording?.Url || "");
    const [description, setDescription] = useState(recording?.Description || "");
    const [name, setName] = useState(recording?.Name || "");
    const editor = useEditor({
        extensions: [StarterKit],
        content: recording?.Description || "Inserisci la tua descrizione qui...",
        onUpdate({ editor }) {
            setDescription(editor.getHTML());
        },
    });
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log("Editing recording:", { date, url });
            const res = await axios.put(`/api/recordings/${recording._id}`, {
                Date: date,
                Url: url,
                Description: description,
                Name: name,
            });
            console.log("Updated recording:", res.data);
            onRecordingUpdated(res.data); // Reload recordings after a successful update
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error updating recording:", error);
        }
    };

    const displayDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const valueDate = (date) => {
        const d = new Date(date).toISOString().split("T")[0];
        return d;
    }

    const formattedISODate = valueDate(date);

    return (<div className={style["edit-modal-recording"]}>
        <h1>Editing {displayDate(recording.Date)}</h1>
        <form onSubmit={submitForm}>
            <div className={style["input-name"]}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={style["input-description"]}>
                <label htmlFor="description">Description</label>
                <span><EditorContent editor={editor} /></span>
            </div>
            <div className={style["input-date"]}>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={formattedISODate}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className={style["input-url"]}>
                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    defaultValue={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div className={style["group-button"]}>
                <button type="button" onClick={closeModal}>Close</button>
                <button type="submit">Update</button>
            </div>
        </form>
    </div>)
};

export default Edit;
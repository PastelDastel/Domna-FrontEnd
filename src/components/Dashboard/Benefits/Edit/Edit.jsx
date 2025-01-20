import style from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Edit = ({ onBenefitUpdated, closeModal, axios, benefit }) => {
    const [name, setName] = useState(benefit?.Name || "");
    const [description, setDescription] = useState(benefit?.Description || "");
    const editor = useEditor({
        extensions: [StarterKit],
        content: description,
        onChange: ({ editor }) => {
            console.log("Content in editor:", editor.getHTML());
            setDescription(editor.getHTML());
        },
    });

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log("Editing benefit:", { name, description });
            const res = await axios.put(`/api/benefits/${benefit._id}`, {
                Name: name,
                Description: editor.getHTML(),
            });
            console.log("Updated benefit:", res.data);
            onBenefitUpdated(res.data); // Reload benefits after a successful update
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error updating benefit:", error);
        }
    };

    return (
        <div className={style.containerBenefitEdit}>
            <h1>Edit Benefit</h1>
            <form onSubmit={submitForm}>
                <div className={style.formBenefitEdit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={style.editor}>
                        <label htmlFor="description">Description</label>
                        <EditorContent editor={editor} />
                    </div>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Edit;

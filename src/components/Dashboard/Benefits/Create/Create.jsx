import style from "./Create.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Create = ({ onBenefitUpdated, closeModal, axiosPrivate }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log(e.target.name.value);
            console.log(e.target.description.value);
            const name = e.target.name.value;
            const description = editor.getHTML();
            const res = await axiosPrivate.post("/api/benefits", { name, description });
            onBenefitUpdated(res.data);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={style.containerBenefitCreate}>
            <h1>Create Benefit</h1>
            <form onSubmit={submitForm}>
                <div className={style.formBenefitCreate}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />

                    </div>

                    <div className={style.editor}>
                        <label htmlFor="description">Description</label>
                        <span><EditorContent editor={editor} /></span>
                    </div>
                </div>


                <button>Create</button>
            </form>
        </div>
    );

};

export default Create;
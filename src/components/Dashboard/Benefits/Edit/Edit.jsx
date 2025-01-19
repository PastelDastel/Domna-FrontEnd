import style from "./Edit.module.css";
import { useEffect, useState } from "react";

const Edit = ({ onBenefitUpdated, closeModal, axios, benefit }) => {
    const [name, setName] = useState(benefit?.Name || "");
    const [description, setDescription] = useState(benefit?.Description || "");

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log("Editing benefit:", { name, description });
            const res = await axios.put(`/api/benefits/${benefit._id}`, {
                Name: name,
                Description: description,
            });
            console.log("Updated benefit:", res.data);
            onBenefitUpdated(res.data); // Reload benefits after a successful update
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error updating benefit:", error);
        }
    };

    return (
        <div className={style.content}>
            <h1>Edit Benefit</h1>
            <form onSubmit={submitForm}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Edit;

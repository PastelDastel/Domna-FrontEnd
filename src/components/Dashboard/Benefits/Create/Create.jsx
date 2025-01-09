import style from "./Create.module.css";
import { useEffect, useState } from "react";

const Create = ({ onBenefitUpdated, closeModal, axiosPrivate }) => {
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            console.log(e.target.name.value);
            console.log(e.target.description.value);
            const name = e.target.name.value;
            const description = e.target.description.value;
            const res = await axiosPrivate.post("/api/benefits", { name, description });
            onBenefitUpdated(res.data);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={style.container}>
            <h1>Create Benefit</h1>
            <form onSubmit={submitForm}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
                <button>Create</button>
            </form>
        </div>
    );

};

export default Create;
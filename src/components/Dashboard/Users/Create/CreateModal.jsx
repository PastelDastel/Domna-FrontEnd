import React, { useState } from "react";
import Swal from "sweetalert2";
import style from "./CreateModal.module.css";

const CreateModal = ({ onUserCreated, axios, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const handleCreateUser = async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const roles = document.getElementById("roles").value;

        if (!username || !password || !email || !phone) {
            Swal.showValidationMessage("All fields are required");
            return false;
        }

        try {
            setLoading(true);
            await axios.post("/api/users", { username, password, email, phone, roles });
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "User created successfully.",
            });
            if (onUserCreated) onUserCreated();
            closeModal();
        } catch (error) {
            Swal.showValidationMessage("Failed to create user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.modalContainer}>
            <h1 className={style.title}>Crea nuovo utente</h1>

            {/* Form Content */}
            <div className={style.modalContent}>
                <div className={style.leftPanel}>
                    <div className={style.Username}>
                        <label className={style.label}>Username</label>
                        <input id="username" className={style.input} placeholder="Enter username" />
                    </div>
                    <div className={style.Password}>
                        <label className={style.label}>Password</label>
                        <input id="password" type="password" className={style.input} placeholder="Enter password" />
                    </div>
                    <div className={style.Email}>
                        <label className={style.label}>Email</label>
                        <input id="email" type="email" className={style.input} placeholder="Enter email" />
                    </div>
                    <div className={style.Phone}>
                        <label className={style.label}>Telefono</label>
                        <input id="phone" className={style.input} placeholder="Enter phone number" />
                    </div>
                </div>

                <div className={style.rightPanel}>
                    <label className={style.label}>Ruolo: </label>
                    <select id="roles" className={style.input}>
                        <option value="4934503821911649">Cliente</option>
                        <option value="6792941695628669">Admin</option>
                    </select>
                </div>
            </div>

            {/* Button Container */}
            <div className={style.buttonContainer}>
                <button
                    onClick={handleCreateUser}
                    className={style.saveButton}
                    disabled={loading}
                >
                    {loading ? (
                        <div className={style.spinner}></div>
                    ) : (
                        "Create"
                    )}
                </button>
                <button
                    onClick={() => Swal.close()}
                    className={style.closeButton}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CreateModal;

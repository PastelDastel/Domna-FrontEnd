import style from "./BlogModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCalendar, faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const BlogModal = ({ blog = {}, mode = "view", loading = false, onClose, onSave }) => {
    const [formData, setFormData] = useState(blog);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (onSave) onSave(formData);
    };

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>{mode === "view" ? "Blog Details" : "Edit Blog"}</h2>
                </header>
                <section className={style.content}>
                    {mode === "view" ? (
                        <>
                            <InfoRow label="Title" value={blog.title} icon={faPen} />
                            <InfoRow label="Content" value={blog.content} icon={faPen} />
                            <InfoRow label="Image" value={blog.image} icon={faImage} />
                            <InfoRow
                                label="Created At"
                                value={new Date(blog.createdAt).toLocaleDateString()}
                                icon={faCalendar}
                            />
                        </>
                    ) : (
                        <>
                            <EditableInput
                                label="Title"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleInputChange}
                            />
                            <EditableInput
                                label="Content"
                                name="content"
                                value={formData.content || ""}
                                onChange={handleInputChange}
                            />
                            <EditableInput
                                label="Image"
                                name="image"
                                value={formData.image || ""}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                </section>
                <div className={style.buttonContainer}>
                    {mode === "edit" ? (
                        <>
                            <button className={style.cancelButton} onClick={onClose}>
                                Cancel
                            </button>
                            <button className={style.saveButton} onClick={handleSave}>
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button className={style.closeButton} onClick={onClose}>
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value, icon }) => (
    <div className={style.infoRow}>
        <FontAwesomeIcon icon={icon} className={style.icon} />
        <p className={style.label}>{label}:</p>
        {label.toLowerCase() === "image" && value ? (
            <img src={value} alt="Blog preview" className={style.imagePreview} />
        ) : (
            <span className={style.value}>{value || "N/A"}</span>
        )}
    </div>
);


const EditableInput = ({ label, name, value, onChange }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onChange({ target: { name, value: reader.result } }); // Convert file to Base64
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={style.infoRow}>
            <label htmlFor={name} className={style.label}>
                {label}:
            </label>
            {name === "image" ? (
                <>
                    <input
                        id={`${name}-url`}
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        className={style.input}
                        type="text"
                        placeholder="Enter image URL or Base64 string"
                    />
                    <p className={style.or}>OR</p>
                    <input
                        id={`${name}-file`}
                        type="file"
                        accept="image/*"
                        className={style.fileInput}
                        onChange={handleFileUpload}
                    />
                    {value && (
                        <img src={value} alt="Preview" className={style.imagePreview} />
                    )}
                </>
            ) : (
                <input
                    id={name}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className={style.input}
                    type="text"
                />
            )}
        </div>
    );
};

export default BlogModal;

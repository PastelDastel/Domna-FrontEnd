import React from "react";
import style from "./UserModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faList } from "@fortawesome/free-solid-svg-icons";

const UserModal = ({ user, mode, loading, relatedCourses, onClose, onSave }) => {
    const [formData, setFormData] = React.useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => onSave(formData);

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>{mode === "view" ? "User Information" : "Edit User"}</h2>
                </header>
                <section className={style.content}>
                    {mode === "view" ? (
                        <>
                            <UserInfoRow label="Username" value={user.username} icon={faUser} />
                            <UserInfoRow label="Email" value={user.email} icon={faEnvelope} />
                            <UserInfoRow label="Phone" value={user.phone} icon={faPhone} />
                            <UserInfoRow
                                label="Roles"
                                value={
                                    Array.isArray(user.roles)
                                        ? user.roles.join(", ")
                                        : user.roles || "N/A"
                                }
                                icon={faList}
                            />
                        </>
                    ) : (
                        <>
                            <EditableInput
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <EditableInput
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <EditableInput
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                </section>
                <section className={style.relatedSection}>
                    <h3>Related Courses</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : relatedCourses.length > 0 ? (
                        <ul>
                            {relatedCourses.map((course) => (
                                <li key={course._id}>{course.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No related courses found.</p>
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

const UserInfoRow = ({ label, value, icon }) => (
    <div className={style.infoRow}>
        <FontAwesomeIcon icon={icon} className={style.icon} />
        <p className={style.label}>{label}:</p>
        <span className={style.value}>{value || "N/A"}</span>
    </div>
);

const EditableInput = ({ label, name, value, onChange }) => (
    <div className={style.infoRow}>
        <label htmlFor={name} className={style.label}>
            {label}:
        </label>
        <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={style.input}
        />
    </div>
);

export default UserModal;

import React, { useState } from "react";
import style from "./CourseModal.module.css";

const CourseModal = ({ course, mode, onClose, onSave }) => {
    const [formData, setFormData] = useState(course);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleListChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), value],
        }));
    };

    const handleListRemove = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        if (!formData.title || !formData.instructor || !formData.price) {
            alert("Please fill in all required fields.");
            return;
        }
        if (onSave) onSave(formData);
    };

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>{mode === "view" ? "Course Information" : "Modify Course"}</h2>
                </header>
                {mode === "view" ? (
                    <>
                        <section className={style.content}>
                            <ViewField label="Title" value={course.title} />
                            <ViewField label="Description" value={course.description} />
                            <ViewField label="Section" value={course.section} />
                            <ViewField label="Instructor" value={course.instructor} />
                            <ViewField label="Duration" value={course.duration} />
                            <ViewField label="Price" value={`$${course.price}`} />
                            <ViewField label="Stripe Price ID" value={course.stripePriceId} />
                            <ViewField
                                label="Created At"
                                value={new Date(course.CreatedAt).toLocaleDateString("en-US")}
                            />
                            <ViewField
                                label="Created By"
                                value={course.CreatedBy ? course.CreatedBy.toString() : "N/A"}
                            />
                            <ViewList label="Benefits" items={course.benefits || []} />
                            <ViewList label="Excluded Benefits" items={course.excluded_benefits || []} />
                            <ViewCategories label="Categories and Videos" categories={course.categories || []} />
                        </section>



                        <button className={style.cancelButton} onClick={onClose}>
                            Close
                        </button>
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
                            label="Description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                        />
                        <EditableInput
                            label="Instructor"
                            name="instructor"
                            value={formData.instructor || ""}
                            onChange={handleInputChange}
                        />
                        <EditableInput
                            label="Section"
                            name="section"
                            value={formData.section || ""}
                            onChange={handleInputChange}
                        />
                        <EditableDropdown
                            label="Duration"
                            name="duration"
                            value={formData.duration || ""}
                            options={["monthly", "3 months", "6 months", "1 year"]}
                            onChange={handleInputChange}
                        />
                        <EditableInput
                            label="Price"
                            name="price"
                            value={formData.price || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0) handleInputChange(e);
                            }}
                            type="number"
                        />
                        <EditableInput
                            label="Stripe Price ID"
                            name="stripePriceId"
                            value={formData.stripePriceId || ""}
                            onChange={handleInputChange}
                        />
                        <EditableList
                            label="Benefits"
                            items={formData.benefits || []}
                            onAdd={(value) => handleListChange("benefits", value)}
                            onRemove={(index) => handleListRemove("benefits", index)}
                        />
                        <EditableList
                            label="Excluded Benefits"
                            items={formData.excluded_benefits || []}
                            onAdd={(value) => handleListChange("excluded_benefits", value)}
                            onRemove={(index) => handleListRemove("excluded_benefits", index)}
                        />
                        <EditableCategories
                            categories={formData.categories || []} // Ensure categories is always an array
                            onAddCategory={(newCategory) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    categories: [...(prev.categories || []), newCategory], // Safely add to categories
                                }))
                            }
                            onUpdateCategory={(index, updatedCategory) =>
                                setFormData((prev) => {
                                    const updatedCategories = [...(prev.categories || [])];
                                    updatedCategories[index] = updatedCategory;
                                    return { ...prev, categories: updatedCategories };
                                })
                            }
                            onRemoveCategory={(index) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    categories: (prev.categories || []).filter((_, i) => i !== index),
                                }))
                            }
                            onAddVideo={(categoryIndex, video) =>
                                setFormData((prev) => {
                                    const updatedCategories = [...(prev.categories || [])];
                                    updatedCategories[categoryIndex].videos.push(video);
                                    return { ...prev, categories: updatedCategories };
                                })
                            }
                            onRemoveVideo={(categoryIndex, videoIndex) =>
                                setFormData((prev) => {
                                    const updatedCategories = [...(prev.categories || [])];
                                    updatedCategories[categoryIndex].videos = updatedCategories[
                                        categoryIndex
                                    ].videos.filter((_, i) => i !== videoIndex);
                                    return { ...prev, categories: updatedCategories };
                                })
                            }
                        />

                        <div className={style.buttonContainer}>
                            <button className={style.cancelButton} onClick={onClose}>
                                Cancel
                            </button>
                            <button className={style.saveButton} onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </>

                )}
            </div>
        </div>
    );
};

// View-Only Field
const ViewField = ({ label, value }) => (
    <div className={style.infoRow}>
        <p className={style.label}>{label}:</p>
        <span className={style.value}>{value || "N/A"}</span>
    </div>
);

// View-Only List
const ViewList = ({ label, items, nestedKey }) => (
    <div className={style.infoRow}>
        <p className={style.label}>{label}:</p>
        {items.length > 0 ? (
            <ul className={style.listContainer}>
                {items.map((item, index) => (
                    <li key={index} className={style.listItem}>
                        {typeof item === "object" && nestedKey ? (
                            <>
                                <strong>{item.name}</strong>
                                <ul>
                                    {item[videos].map((nestedItem, nestedIndex) => (
                                        <li key={nestedIndex} className={style.nestedItem}>
                                            <a href={nestedItem} target="_blank" rel="noopener noreferrer">
                                                {nestedItem}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <span>{item}</span>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <span className={style.value}>N/A</span>
        )}
    </div>
);
const ViewCategories = ({ label, categories }) => (
    <div className={style.infoRow}>
        <p className={style.label}>{label}:</p>
        {categories.length > 0 ? (
            <ul className={style.listContainer}>
                {categories.map((category, index) => (
                    <li key={index} className={style.listItem}>
                        <strong>{category.name}</strong>
                        {category.videos.length > 0 ? (
                            <ul className={style.nestedList}>
                                {category.videos.map((video, videoIndex) => (
                                    <li key={videoIndex} className={style.nestedItem}>
                                        <a
                                            href={video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={style.videoLink}
                                        >
                                            {video}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No videos available</p>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <span className={style.value}>No categories available</span>
        )}
    </div>
);

// Editable Input
const EditableInput = ({ label, name, value, onChange, type = "text" }) => (
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
            type={type}
        />
    </div>
);

// Editable Dropdown
const EditableDropdown = ({ label, name, value, options, onChange }) => (
    <div className={style.infoRow}>
        <label htmlFor={name} className={style.label}>
            {label}:
        </label>
        <select id={name} name={name} value={value} onChange={onChange} className={style.input}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

// Editable List
const EditableList = ({ label, items, onAdd, onRemove }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className={style.infoRow}>
            <label className={style.label}>{label}:</label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                className={style.input}
                placeholder={`Type a ${label.toLowerCase()} and press Enter`}
            />
            <div className={style.listContainer}>
                {items.map((item, index) => (
                    <div key={index} className={style.listItem}>
                        <span>{item}</span>
                        <button onClick={() => onRemove(index)} className={style.removeButton}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
const EditableCategories = ({
    categories,
    onAddCategory,
    onUpdateCategory,
    onRemoveCategory,
    onAddVideo,
    onRemoveVideo,
}) => {
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            onAddCategory({ name: newCategoryName.trim(), videos: [] });
            setNewCategoryName("");
        }
    };

    return (
        <div className={style.infoRow}>
            <label className={style.label}>Categories:</label>
            <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className={style.input}
                placeholder="Add a new category and press Enter"
            />
            <div className={style.listContainer}>
                {categories?.length > 0 ? (
                    categories.map((category, index) => (
                        <div key={index} className={style.categoryContainer}>
                            <EditableInput
                                label={`Category Name`}
                                name={`category-${index}`}
                                value={category.name}
                                onChange={(e) =>
                                    onUpdateCategory(index, {
                                        ...category,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <EditableList
                                label="Videos"
                                items={category.videos || []}
                                onAdd={(video) => onAddVideo(index, video)}
                                onRemove={(videoIndex) => onRemoveVideo(index, videoIndex)}
                            />
                            <button
                                className={style.removeButton}
                                onClick={() => onRemoveCategory(index)}
                            >
                                Remove Category
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No categories available. Add a new category above.</p>
                )}
            </div>
        </div>
    );
};
export default CourseModal;

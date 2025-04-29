import { useEffect, useState, useRef } from "react";
import style from "./EditModal.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const EditModal = ({ closeModal, course, axios, onCourseUpdated }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: course.Description,
        onUpdate({ editor }) {
            course.Description = editor.getHTML();
            console.log("Description updated: ", course.Description);
        },
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [encodedImage, setEncodedImage] = useState(course.ImageUrl || null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data);
                setSelectedCategories(response.data.filter((category) => course.Categories.includes(category._id)));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchData = async () => {
            await fetchCategories();
        };

        fetchData();
    }, [course]);
    const formSubmit = async (e) => {
        e.preventDefault();
        const Title = e.target.title.value;
        const Description = course.Description;
        const Image = encodedImage;
        const Categories = selectedCategories.map((category) => category._id);
        const data = {
            Title,
            Description,
            Image,
            Categories,
        };
        console.log("Data when making the creation call: ", data);
        try {
            const response = await axios.put(`/api/courses/${course._id}`, data);
            console.log("Course updated: ", response.data);
            onCourseUpdated(response.data);
            closeModal();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEncodedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className={style["edit-course-container"]}>
            <h1>Edit {course.Title}</h1>
            <form onSubmit={formSubmit}>
                <div className={style["form-content"]}>
                    <div className={style["left-content"]}>
                        <div className={style["first-row"]}>
                            <div className={style["title"]}>
                                <label>Title</label>
                                <input type="text" name="title" required defaultValue={course.Title} />
                            </div>
                        </div>
                        <div className={style["description"]}>
                            <label>Description</label>
                            <EditorContent editor={editor} className={style.textareaForm} />
                        </div>
                        <div className={style["image-section"]}>
                            <div className={style["image-input"]}>
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept=".jpg,.jpeg,.png,.gif"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className={style["image-preview"]}>
                                {encodedImage ? (<img src={encodedImage} alt="course" />) : (<p>No image selected</p>)}
                            </div>
                        </div>
                    </div>
                    <div className={style["right-content"]}>
                        <div className={style.categoryContainer}>
                            <div className={style.categoryHeader}><label className={style.categoryLabel}>Categories</label></div>
                            {categories.length > 0 ? (
                                <>
                                    {categories.map((category, index) => (
                                        <div key={index} className={style.categoryItem}>
                                            <input
                                                type="checkbox"
                                                name="categories"
                                                value={category._id}
                                                defaultChecked={course.Categories.includes(category._id)} // Automatically checks if the category is in the course
                                                onClick={(e) => {
                                                    setSelectedCategories((prev) => {
                                                        if (e.target.checked) {
                                                            return [...prev, category];
                                                        } else {
                                                            return prev.filter((selected) => selected._id !== category._id);
                                                        }
                                                    });
                                                }}
                                                className={style.categoryCheckbox}
                                            />
                                            <div className={style.categoryName}>{category.Name}</div>
                                            <div className={style.categoryDescription} dangerouslySetInnerHTML={
                                                { __html: "<strong>Description:</strong> " + (category.Description ? category.Description : "No description provided") }
                                            }></div>
                                            <div className={style.categoryMonths}>Months: {category.Months?.length}</div>
                                            <div className={style.categorySubCategories}>SubCat: {category.SubCategories?.length}</div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <span className={style.categoryEmptyMessage}>No categories available</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.modalActions}>
                    <button onClick={closeModal} type="button" className={style.cancelButton}>Cancel</button>
                    <button type="submit" className={style.submitButton}>Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;

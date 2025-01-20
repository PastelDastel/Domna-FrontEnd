import React, { useRef, useState, useEffect } from "react";
import style from "./CreateModal.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const CreateModal = ({ axios, onCourseCreated, closeModal, mockData }) => {
    const [description, setDescription] = useState("");
    const editor = useEditor({
        extensions: [StarterKit],
        content: mockData || "<p>Start writing your course description here</p>",

        onUpdate({ editor }) {
            console.log("Content updated: ", editor.getHTML());
            setDescription(editor.getHTML());
        }
    });

    const [benefits, setBenefits] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState([]);
    const [selectedExcluded, setSelectedExcluded] = useState([]);
    const [discount, setDiscount] = useState(false);
    const [encodedImage, setEncodedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const includedRef = useRef();
    const excludedRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/benefits");
            console.log("Fetched benefits: ", data);
            setBenefits(data);
            const response = await axios.get("/api/categories");
            console.log("Fetched categories: ", response.data);
            setCategories(response.data);
        };
        fetchData();
    }, [axios]);
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

    const formSubmit = async (e) => {
        e.preventDefault();
        const Included = selectedIncluded.map((benefit) => benefit._id);
        const Excluded = selectedExcluded.map((benefit) => benefit._id);
        const Title = e.target.title.value;
        const Interval = e.target.interval.value;
        const Description = description;
        const Image = encodedImage;
        const Stripe_price = e.target.stripe_price.value;
        const Normal_price = (e.target.normal_price.value);
        const Discount_price = parseFloat(e.target.discount_price?.value) || 0;
        console.log("Discount price: ", Discount_price);
        const Categories = Array.from(e.target.categories || []).filter((category) => category.checked).map((category) => category.value) || [];
        const data = new Object({
            Title,
            Interval,
            Description,
            Image,
            Stripe_price,
            Normal_price,
            Discount_price,
            Categories,
            Included,
            Excluded
        }
        );
        console.log("Course data: ", data);
        try {
            const response = await axios.post("/api/courses", data);
            console.log("Course created: ", response.data);
            onCourseCreated(response.data);
            closeModal();
        } catch (error) {
            console.error("Failed to create course: ", error);
        }
    };
    return (<>
        <div className={style["create-crouse-container"]}>
            <h1>Crea un corso</h1>
            <form onSubmit={formSubmit}>
                <div className={style["form-content"]}>
                    <div className={style["left-content"]}>
                        <div className={style["first-row"]}>
                            <div className={style["title"]}>
                                <label>Title</label>
                                <input type="text" name="title" required />
                            </div>
                            <div className={style["interval"]}>
                                <label>Interval</label>
                                <select name="interval">
                                    <option value="1">Monthly</option>
                                    <option value="3">Quarterly</option>
                                    <option value="6">Semi-annually</option>
                                    <option value="12">Annually</option>
                                </select>
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
                        <div>
                            <div>
                                <label>Stripe</label>
                                <input type="text" name="stripe_price" required />
                            </div>
                            <div className={style["price"]}>
                                <label>Price</label>
                                <input type="number" name="normal_price" required step={0.01} min={0.01} />
                                <div className={style["discount-section"]}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setDiscount((prev) => !prev);
                                    }}>
                                        {discount ? "Remove Discount" : "Add Discount"}
                                    </button>
                                    {discount && (<div className={style["discount"]}>
                                        <label>Discount</label>
                                        <input type="number" name="discount_price" required step={0.01} min={0.01} />
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        <div className={style.benefitContainer}>
                            <h1 className={style.benefitHeading}>Benefici</h1>
                            <div className={style.benefitGroup}>
                                <label className={style.benefitLabel}>Inclusi</label>
                                <div className={style.benefitControlGroup}>
                                    {benefits.length > 0 ? (
                                        <>
                                            <select name="benefits" ref={includedRef} className={style.benefitSelect}>
                                                {benefits.map((benefit, index) => (
                                                    <option key={index} value={benefit._id}>{benefit.Name}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const selected = benefits.find((benefit) => benefit._id === includedRef.current.value);
                                                    setSelectedIncluded((prev) => [...prev, selected]);
                                                    setBenefits((prev) => prev.filter((benefit) => benefit._id !== includedRef.current.value));
                                                }}
                                                className={style.benefitAddButton}
                                            >
                                                Add
                                            </button>
                                        </>
                                    ) : (
                                        <p className={style.benefitEmptyMessage}>There are no benefits left to add</p>
                                    )}
                                </div>
                                <div className={style.benefitSelectedGroup}>
                                    {selectedIncluded.map((benefit, index) => (
                                        <div key={index} className={style.benefitSelectedItem}>
                                            <span className={style.benefitName}>{benefit.Name}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setBenefits((prev) => [...prev, benefit]);
                                                    setSelectedIncluded((prev) => prev.filter((selected) => selected._id !== benefit._id));
                                                }}
                                                className={style.benefitRemoveButton}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.benefitGroup}>
                                <label className={style.benefitLabel}>Esclusi</label>
                                <div className={style.benefitControlGroup}>
                                    {benefits.length > 0 ? (
                                        <>
                                            <select name="excluded" ref={excludedRef} className={style.benefitSelect}>
                                                {benefits.map((benefit, index) => (
                                                    <option key={index} value={benefit._id}>{benefit.Name}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const selected = benefits.find((benefit) => benefit._id === excludedRef.current.value);
                                                    setSelectedExcluded((prev) => [...prev, selected]);
                                                    setBenefits((prev) => prev.filter((benefit) => benefit._id !== excludedRef.current.value));
                                                }}
                                                className={style.benefitAddButton}
                                            >
                                                Add
                                            </button>
                                        </>
                                    ) : (
                                        <p className={style.benefitEmptyMessage}>There are no benefits left to add</p>
                                    )}
                                </div>
                                <div className={style.benefitSelectedGroup}>
                                    {selectedExcluded.map((benefit, index) => (
                                        <div key={index} className={style.benefitSelectedItem}>
                                            <span className={style.benefitName}>{benefit.Name}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setBenefits((prev) => [...prev, benefit]);
                                                    setSelectedExcluded((prev) => prev.filter((selected) => selected._id !== benefit._id));
                                                }}
                                                className={style.benefitRemoveButton}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
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
                                            <input type="checkbox" name="categories" value={category._id} className={style.categoryCheckbox} />
                                            <div className={style.categoryName}>{category.Name}</div>
                                            <div className={style.categoryDescription}
                                                dangerouslySetInnerHTML={{ __html: category.Description }}
                                            ></div>
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
                    <button onClick={closeModal} className={style.cancelButton}>Cancel</button>
                    <button type="submit" className={style.submitButton}>Create Course</button>
                </div>
            </form>
        </div>
    </>);
};
export default CreateModal;
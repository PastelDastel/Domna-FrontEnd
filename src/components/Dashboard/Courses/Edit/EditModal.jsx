import { useEffect, useState, useRef } from "react";
import style from "./EditModal.module.css";

const EditModal = ({ closeModal, course, axios, onCourseUpdated }) => {
    const [benefits, setBenefits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState(course.Included || []);
    const [selectedExcluded, setSelectedExcluded] = useState(course.Excluded || []);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [discount, setDiscount] = useState(course.Price.Discounted ? true : false);
    const includedRef = useRef();
    const excludedRef = useRef();
    const [encodedImage, setEncodedImage] = useState(course.Image || null);
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`/api/courses/${course._id}/details`);
                console.log("Course details: ", response.data);

                const included = response.data.Benefits.filter(
                    (benefit) => benefit.Type === "Included"
                ).map((benefit) => benefit.Benefit);

                const excluded = response.data.Benefits.filter(
                    (benefit) => benefit.Type === "Excluded"
                ).map((benefit) => benefit.Benefit);

                setSelectedIncluded(included);
                setSelectedExcluded(excluded);

                // Combine selected benefits directly
                return [...included, ...excluded];
            } catch (error) {
                console.error("Error fetching course details:", error);
                return [];
            }
        };

        const fetchBenefits = async (selectedBenefits) => {
            try {
                const response = await axios.get("/api/benefits");

                const availableBenefits = response.data.filter(
                    (benefit) =>
                        !selectedBenefits.some((selected) => selected._id === benefit._id)
                );

                setBenefits(availableBenefits);
                console.log("Available benefits: ", availableBenefits);
            } catch (error) {
                console.error("Error fetching benefits:", error);
            }
        };

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
            const selectedBenefits = await fetchCourseDetails();
            await fetchBenefits(selectedBenefits);
            await fetchCategories();
        };

        fetchData();
    }, [course]);
    const formSubmit = async (e) => {
        e.preventDefault();
        const Title = e.target.title.value;
        const Interval = e.target.interval.value;
        const Description = e.target.description.value;
        const Image = encodedImage;
        const Stripe_price = e.target.stripe_price.value;
        const Normal_price = e.target.normal_price.value;
        const Discount_price = e.target.discount_price?.value || 0;
        const Categories = selectedCategories.map((category) => category._id);
        const Included = selectedIncluded.map((benefit) => benefit._id);
        const Excluded = selectedExcluded.map((benefit) => benefit._id);
        console.log("Discounted price: ", Discount_price);
        const data = {
            Title,
            Interval,
            Description,
            Image,
            Price: {
                Stripe: Stripe_price,
                Normal: Normal_price,
                Discounted: Discount_price,
            },
            Categories,
            Benefits: {
                Included,
                Excluded,
            },
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
                            <div className={style["interval"]}>
                                <label>Interval</label>
                                <select name="interval" defaultValue={course.Interval}>
                                    <option value="1">Monthly</option>
                                    <option value="3">Quarterly</option>
                                    <option value="6">Semi-annually</option>
                                    <option value="12">Annually</option>
                                </select>
                            </div>
                        </div>
                        <div className={style["description"]}>
                            <label>Description</label>
                            <textarea name="description" defaultValue={course.Description} />
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
                                <input type="text" name="stripe_price" required defaultValue={course.Price.Stripe} />
                            </div>
                            <div className={style["price"]}>
                                <label>Price</label>
                                <input type="number" name="normal_price" required step={0.01} min={0.01} defaultValue={course.Price.Normal} />
                                <div className={style["discount-section"]}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setDiscount((prev) => !prev);
                                    }}>
                                        {discount ? "Remove Discount" : "Add Discount"}
                                    </button>
                                    {discount && (<div className={style["discount"]}>
                                        <label>Discount</label>
                                        <input type="number" name="discount_price" required step={0.01} min={0.01} defaultValue={course.Price.Discounted} />
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
                                            <div className={style.categoryDescription}>{category.Description}</div>
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
                    <button type="submit" className={style.submitButton}>Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;

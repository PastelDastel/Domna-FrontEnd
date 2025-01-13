import { useEffect, useState, useRef } from "react";
import style from "./EditModal.module.css";

const EditModal = ({ closeModal, course, axios, onCourseUpdated }) => {
    const [benefits, setBenefits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState(course.Included || []);
    const [selectedExcluded, setSelectedExcluded] = useState(course.Excluded || []);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [discount, setDiscount] = useState(!!course.Discount_price);
    const includedRef = useRef();
    const excludedRef = useRef();
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
        const Image = e.target.image.value;
        const Stripe_price = e.target.stripe_price.value;
        const Normal_price = e.target.normal_price.value;
        const Discount_price = e.target.discount_price?.value || 0;
        const Categories = selectedCategories.map((category) => category._id);
        const Included = selectedIncluded.map((benefit) => benefit._id);
        const Excluded = selectedExcluded.map((benefit) => benefit._id);

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
        console.log("Data: ", data);
        try {
            const response = await axios.put(`/api/courses/${course._id}`, data);
            console.log("Course updated: ", response.data);
            onCourseUpdated(response.data);
            closeModal();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <div className={style.container}>
            <h1>Edit {course.Title}</h1>
            <form onSubmit={formSubmit}>
                <div className={style.leftColumn}>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" defaultValue={course.Title} required />
                    </div>
                    <div>
                        <label>Interval</label>
                        <select name="interval" defaultValue={course.Interval}>
                            <option value="1">Monthly</option>
                            <option value="3">Quarterly</option>
                            <option value="6">Semi-annually</option>
                            <option value="12">Annually</option>
                        </select>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" defaultValue={course.Description} />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif" />
                    </div>
                    <div>
                        <label>Stripe Price</label>
                        <input type="text" name="stripe_price" defaultValue={course.Price.Stripe} required />
                    </div>
                    <div>
                        <label>Normal Price</label>
                        <input type="number" name="normal_price" defaultValue={course.Price.Normal} required />
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setDiscount((prev) => !prev);
                            }}
                        >
                            {discount ? "Remove Discount" : "Apply Discount"}
                        </button>
                        {discount && (
                            <div>
                                <label>Discount Price</label>
                                <input type="number" name="discount_price" defaultValue={course.Price.Discounted || ""} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <div>
                        <label>Benefits</label>
                        {benefits.length > 0 ? (
                            <>
                                <select name="benefits" ref={includedRef}>
                                    {benefits.map((benefit, index) => (
                                        <option key={index} value={benefit._id}>
                                            {benefit.Name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const selected = benefits.find(
                                            (benefit) => benefit._id === includedRef.current.value
                                        );
                                        setSelectedIncluded((prev) => [...prev, selected]);
                                        setBenefits((prev) =>
                                            prev.filter((benefit) => benefit._id !== includedRef.current.value)
                                        );
                                    }}
                                >
                                    Add
                                </button>
                            </>
                        ) : (
                            <span>No benefits left to add</span>
                        )}
                    </div>
                    <div>
                        {selectedIncluded.map((benefit, index) => (
                            <div key={index}>
                                <span>{benefit.Name}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setBenefits((prev) => [...prev, benefit]);
                                        setSelectedIncluded((prev) =>
                                            prev.filter((selected) => selected._id !== benefit._id)
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Excluded Benefits</label>
                        {benefits.length > 0 ? (
                            <>
                                <select name="excluded" ref={excludedRef}>
                                    {benefits.map((benefit, index) => (
                                        <option key={index} value={benefit._id}>
                                            {benefit.Name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const selected = benefits.find(
                                            (benefit) => benefit._id === excludedRef.current.value
                                        );
                                        setSelectedExcluded((prev) => [...prev, selected]);
                                        setBenefits((prev) =>
                                            prev.filter((benefit) => benefit._id !== excludedRef.current.value)
                                        );
                                    }}
                                >
                                    Add
                                </button>
                            </>
                        ) : (
                            <span>No benefits left to add</span>
                        )}
                    </div>
                    <div>
                        {selectedExcluded.map((benefit, index) => (
                            <div key={index}>
                                <span>{benefit.Name}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setBenefits((prev) => [...prev, benefit]);
                                        setSelectedExcluded((prev) =>
                                            prev.filter((selected) => selected._id !== benefit._id)
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Categories</label>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        name="categories"
                                        value={category._id}
                                        defaultChecked={course.Categories.includes(category._id)}
                                        onClick={(e) => {
                                            setSelectedCategories((prev) => {
                                                if (e.target.checked) {
                                                    return [...prev, category];
                                                } else {
                                                    return prev.filter((selected) => selected._id !== category._id);
                                                }
                                            });
                                        }}
                                    />
                                    <div>{category.Name}</div>
                                </div>
                            ))
                        ) : (
                            <span>No categories available</span>
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Update Course</button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;

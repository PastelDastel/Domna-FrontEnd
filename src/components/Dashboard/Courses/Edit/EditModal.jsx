import { useEffect, useState, useRef } from "react";
import style from "./EditModal.module.css";

const EditModal = ({ closeModal, course, axios, onCourseUpdated }) => {
    const [benefits, setBenefits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState(course.Included || []);
    const [selectedExcluded, setSelectedExcluded] = useState(course.Excluded || []);
    const [discount, setDiscount] = useState(!!course.Discount_price);
    const includedRef = useRef();
    const excludedRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/courses/${course._id}/details`);
            console.log(response.data)
        }
        fetchData();
    }, [axios, course]);

    const formSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
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
                        <input type="text" name="stripe_price" defaultValue={course.Stripe_price} required />
                    </div>
                    <div>
                        <label>Normal Price</label>
                        <input type="number" name="normal_price" defaultValue={course.Normal_price} required />
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
                                <input type="number" name="discount_price" defaultValue={course.Discount_price || ""} />
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

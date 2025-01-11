import React, { useRef, useState, useEffect } from "react";
import style from "./CreateModal.module.css";

const CreateModal = ({ axios, onCourseCreated, closeModal, mockData }) => {
    const [benefits, setBenefits] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState([]);
    const [selectedExcluded, setSelectedExcluded] = useState([]);
    const [discount, setDiscount] = useState(false);
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

    const formSubmit = async (e) => {
        e.preventDefault();
        const Included = selectedIncluded.map((benefit) => benefit._id);
        const Excluded = selectedExcluded.map((benefit) => benefit._id);
        const Title = e.target.title.value;
        const Interval = e.target.interval.value;
        const Description = e.target.description.value;
        const Image = e.target.image.value;
        console.log("Image: ", Image);
        //url encode the image
        // const Image = e.target.image.value;

        const Stripe_price = e.target.stripe_price.value;
        const Normal_price = e.target.normal_price.value;
        const Discount_price = e.target.discount_price?.value | 0;
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
        <div className={style.container}>
            <h1>New Course</h1>
            <form onSubmit={formSubmit}>
                <div className={style.leftColumn}>
                    <div>
                        <div>
                            <label>Title</label>
                            <input type="text" name="title" required />
                        </div>
                        <div>
                            <label>Interval</label>
                            <select name="interval">
                                <option value="1">Monthly</option>
                                <option value="3">Quarterly</option>
                                <option value="6">Semi-annually</option>
                                <option value="12">Annually</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea name="description" />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif" />
                    </div>
                    <div>
                        <div>
                            <label>Stripe</label>
                            <input type="text" name="stripe_price" required />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="normal_price" required />
                        </div>
                        <div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setDiscount((prev) => !prev);
                            }}>
                                Apply discount
                            </button>
                            {discount && (<div>
                                <label>Discount</label>
                                <input type="number" name="discount_price" required />
                            </div>)}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Benefits</label>
                            {benefits.length > 0 ? (<>                            <select name="benefits" ref={includedRef}>
                                {benefits.map((benefit, index) => (
                                    <option key={index} value={benefit._id}>{benefit.Name}</option>
                                ))}
                            </select>
                                <button type="button" onClick={() => {
                                    const selected = benefits.find((benefit) => benefit._id === includedRef.current.value);
                                    setSelectedIncluded((prev) => [...prev, selected]);
                                    //remove the benefit from the list
                                    setBenefits((prev) => prev.filter((benefit) => benefit._id !== includedRef.current.value));
                                }}>Add</button></>) : (<>There are no benefits left to add</>)}
                        </div>
                        <div>
                            {selectedIncluded.map((benefit, index) => (
                                <div key={index}>
                                    <span>{benefit.Name}</span>
                                    <button type="button" onClick={() => {
                                        setBenefits((prev) => [...prev, benefit]);
                                        setSelectedIncluded((prev) => prev.filter((selected) => selected._id !== benefit._id));
                                    }}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Excluded Benefits</label>
                            {benefits.length > 0 ? (<><select name="excluded" ref={excludedRef}>
                                {benefits.map((benefit, index) => (
                                    <option key={index} value={benefit._id}>{benefit.Name}</option>
                                ))}
                            </select>
                                <button type="button" onClick={() => {
                                    const selected = benefits.find((benefit) => benefit._id === excludedRef.current.value);
                                    setSelectedExcluded((prev) => [...prev, selected]);
                                    //remove the benefit from the list
                                    setBenefits((prev) => prev.filter((benefit) => benefit._id !== excludedRef.current.value));
                                }}>Add</button></>) : (<>There are no benefits left to add</>)}
                        </div>
                        <div>
                            {selectedExcluded.map((benefit, index) => (
                                <div key={index}>
                                    <span>{benefit.Name}</span>
                                    <button type="button" onClick={() => {
                                        setBenefits((prev) => [...prev, benefit]);
                                        setSelectedExcluded((prev) => prev.filter((selected) => selected._id !== benefit._id));
                                    }}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <div>
                        <div><label>Categories</label></div>
                        {categories.length > 0 ? (<>
                            {categories.map((category, index) => (
                                <div key={index}>
                                    <input type="checkbox" name="categories" value={category._id} />
                                    <div>{category.Name}</div>
                                    <div>{category.Description}</div>
                                    <div>Months: {category.Months?.length}</div>
                                    <div>SubCat: {category.SubCategories?.length}</div>
                                </div>
                            ))}
                        </>) : (<>
                            <span>No categories available</span></>)}
                    </div>
                </div>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Create Course</button>
                </div>
            </form>
        </div>
    </>);
};
export default CreateModal;
/*
{
"_id": { "$oid": "677cc91984d0295901cd3861" },
"Title": "Domna Course",
"Description": "This course has no particular description",
"Image": "https://placehold.co/200x200",
"Benefits": [],
"Categories": [],
"Price": {
  "Stripe": "price_1QMa64Kn6sYGkBb0ZNc3wyL9",
  "Normal": { "$numberInt": "39" }
},
"Subscribers": [{ "$oid": "6734cb05fe1406b0b8998e47" }],
"createdAt": { "$date": { "$numberLong": "1736231193257" } },
"updatedAt": { "$date": { "$numberLong": "1736414009102" } },
"__v": { "$numberInt": "4" },
"Interval": { "$numberInt": "1" }
}
*/
import { useEffect, useState } from "react";
import style from "./EditModal.module.css";

const EditModal = ({ closeModal, course, axios, onCourseUpdated }) => {
    const {
        _id, Title, Description, Image, Interval, Price, Benefits, Categories
    } = course;

    const [allBenefits, setAllBenefits] = useState([]);
    const [includedBenefits, setIncludedBenefits] = useState([]);
    const [excludedBenefits, setExcludedBenefits] = useState([]);

    const setBenefits = (benefits) => {
        const included = benefits.filter(benefit => benefit.Type === "Included");
        const excluded = benefits.filter(benefit => benefit.Type === "Excluded");
        setIncludedBenefits(included);
        setExcludedBenefits(excluded);
    };
    useEffect(() => {

    }, [allBenefits]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log("Form submitted: ", formData);
    };
    const handleDiscountedPrice = (e) => {
        const discountedPrice = e.target.value;
        if (discountedPrice == 0) {
            e.target.value = "";
        }
    };
    useEffect(() => {
        const fetchBenefits = async () => {
            const response = await axios.get("/api/benefits");
            console.log("All benefits: ", response.data);
            setAllBenefits(response.data);
            setBenefits(Benefits)
        };
        fetchBenefits();
    }, [course, axios]);
    const handleIncludedBenefitClick = (e) => {
        const benefit = e.target.textContent;
        console.log("Benefit clicked: ", benefit);
    };
    const handleAddIncludedBenefit = (e) => {
        const benefitId = e.target.value;
        console.log("Benefit added: ", benefitId);
    };
    return (
        <div className={style.content}>
            <h1>Edit Modal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="Title" placeholder={Title} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="Description" placeholder={Description} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" name="Image" placeholder={Image} />
                </div>
                <div>
                    <label>Interval</label>
                    <select name="Interval" id="IntervalSelect">
                        <option value="1" selected={Interval === "1"}>1 Month</option>
                        <option value="3" selected={Interval === "3"}>3 Months</option>
                        <option value="6" selected={Interval === "6"}>6 Months</option>
                        <option value="12" selected={Interval === "12"}>1 Year</option>
                    </select>
                </div>
                <div>
                    <span>Price</span>
                    <div>
                        <label>Stripe</label>
                        <input type="text" name="Price" placeholder={Price.Stripe} />
                    </div>
                    <div>
                        <label>Normal</label>
                        <input type="text" name="Price" placeholder={Price.Normal} />
                    </div>
                    <div>
                        <label>Discounted</label>
                        <input type="number" name="Price" placeholder={Price.Discounted ? Price.Discounted : "There is no discounted price"} min={0} step={0.01} onChange={handleDiscountedPrice} />
                    </div>
                </div>
                <div>
                    <label>Included Benefits</label>
                    <select name="Benefits" id="IncludedBenefits" onChange={handleAddIncludedBenefit} onSelect={handleAddIncludedBenefit}>
                        {allBenefits.length > 0 ? allBenefits.map((benefit, index) => (
                            <option key={benefit._id} value={benefit._id}>{benefit.Name}</option>
                        )) : <option value="No Benefits included">No Benefits available</option>}
                    </select>
                    <div>
                        {Benefits.length > 0 ? Benefits.map((benefit, index) => (
                            <div key={benefit._id} className={style.benefit} onClick={handleIncludedBenefitClick}>
                                {benefit.Name}
                            </div>
                        )) : <div>No Benefits included</div>}
                    </div>
                </div>
                <div>
                    <label>Excluded Benefits</label>
                    <select name="Benefits" id="ExcludedBenefits">
                        {Benefits.length > 0 ? Benefits.map((benefit, index) => (
                            <option key={benefit._id} value={benefit._id}>{benefit.Name}</option>
                        )) : <option value="No Benefits included">No Benefits available</option>}
                    </select>
                    <div>
                        {Benefits.length > 0 ? Benefits.map((benefit, index) => (
                            <div key={benefit._id} className={style.benefit} onClick={handleIncludedBenefitClick}>
                                {benefit.Name}
                            </div>
                        )) : <div>No Benefits included</div>}
                    </div>
                </div>
                <input type="text" name="Title" defaultValue={Title} />
                <input type="text" name="Description" defaultValue={Description} />
                <input type="text" name="Image" defaultValue={Image} />
                <input type="text" name="Interval" defaultValue={Interval} />
                <input type="text" name="Price" defaultValue={Price} />
                <input type="text" name="Benefits" defaultValue={Benefits} />
                <input type="text" name="Categories" defaultValue={Categories} />
                <button type="submit">Update</button>
            </form>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default EditModal;
import React, { useRef, useState } from "react";
import style from "./CreateModal.module.css";

const CreateModal = ({ axios, onCourseCreated, closeModal }) => {
    const mockData = {
        title: "Title",
        description: "Description",
        price: 1,
        discountedPrice: 0,
        stripePriceId: "stripePriceId",
        benefits: ["benefit1", "benefit2", "benefit3", "Longer Text here"],
        excluded_benefits: ["excluded_benefit1", "excluded_benefit2"],
        section: "DOMNA" || "DOMNA LIVE",
        categories: [
            {
                name: "Category1",
                description: "Category1 Description",
                months: [{
                    index: 1,
                    name: "Month1",
                    description: "Month1 Description1",
                    videos: [
                        "video1",
                        "video2",
                        "video3",
                        "video4",
                        "video5",
                    ]
                }
                ]
            },
            {
                name: "Category2",
                description: "Category2 Description",
                months: [{
                    index: 1,
                    name: "Month1",
                    description: "Month1 Description Category2",
                    videos: [
                        "video1",
                        "video2",
                        "video3",
                        "video4",
                        "video5",
                    ]
                },
                {
                    index: 2,
                    name: "Month2",
                    description: "Month2 Description Category2",
                    videos: [
                        "video6",
                        "video7",
                        "video8",
                        "video9",
                        "video10",
                    ]
                }
                ]
            }


        ],
    }

    const [benefits, setBenefits] = useState([]);
    const [excludedBenefits, setExcludedBenefits] = useState([]);
    const formRef = useRef();


    const handleBenefits = (e) => {
        const value = e.target.value;
        if (value) {
            setBenefits([...benefits, value]);
            e.target.value = "";
        }
    };
    const handleRemoveBenefit = (index) => {
        const newBenefits = benefits.filter((_, i) => i !== index);
        setBenefits(newBenefits);
    };
    const handleExcludedBenefits = (e) => {
        const value = e.target.value;
        if (value) {
            setExcludedBenefits([...excludedBenefits, value]);
            e.target.value = "";
        }
    };
    const handleRemoveExcludedBenefit = (index) => {
        const newExcludedBenefits = excludedBenefits.filter((_, i) => i !== index);
        setExcludedBenefits(newExcludedBenefits);
    };

    const handleSubmit = async () => {

        const form = formRef.current;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (data.price <= data.discountedPrice) {
            console.info("Discounted price should be less than price");
        } else {
            console.log(data);
        }
    };

    return (
        <div className={style.container}>
            <h1>Create Course</h1>
            <div className={style.FormContainer}>
                <form ref={formRef}>
                    <div className={style.leftColumn}>
                        <div className={style.InputTitle}>
                            <label className={style.Label}>Title</label>
                            <input
                                className={style.Input}
                                type="text"
                                name="title"
                                defaultValue={mockData.title}
                                placeholder="Title"
                            />
                        </div>
                        <div className={style.InputDescription}>
                            <label className={style.Label}>Description</label>
                            <textarea
                                className={style.Textarea}
                                name="description"
                                defaultValue={mockData.description}
                                placeholder="Description"
                            />
                        </div>
                        <div className={style.InputSection}>
                            <label className={style.Label}>Section</label>
                            <div className={style.RadioGroup}>
                                <input
                                    className={style.RadioInput}
                                    type="radio"
                                    name="section"
                                    value="DOMNA"
                                    id="domna"
                                    defaultChecked
                                />
                                <label htmlFor="domna" className={style.RadioLabel}>
                                    DOMNA
                                </label>

                                <input
                                    className={style.RadioInput}
                                    type="radio"
                                    name="section"
                                    value="DOMNA LIVE"
                                    id="domnaLive"
                                />
                                <label htmlFor="domnaLive" className={style.RadioLabel}>
                                    DOMNA LIVE
                                </label>
                            </div>
                        </div>
                        <div className={style.InputPrices}>
                            <div className={style.InputPrice}>
                                <label className={style.Label}>Price</label>
                                <input
                                    className={style.Input}
                                    type="number"
                                    name="price"
                                    defaultValue={mockData.price}
                                    placeholder="Price"
                                    min={0}
                                    step={0.01}
                                />
                            </div>
                            <div className={style.InputDiscountedPrice}>
                                <label className={style.Label}>Discounted Price</label>
                                <input
                                    className={style.Input}
                                    type="number"
                                    name="discountedPrice"
                                    defaultValue={mockData.discountedPrice}
                                    placeholder="Discounted Price"
                                    min={0}
                                    step={0.01}
                                />
                            </div>
                        </div>
                        <div className={style.InputStripePriceId}>
                            <label className={style.Label}>Stripe Price Id</label>
                            <input
                                className={style.Input}
                                type="text"
                                name="stripePriceId"
                                defaultValue={mockData.stripePriceId}
                                placeholder="Stripe Price Id"
                            />
                        </div>
                        <div className={style.InputBenefits}>
                            <label>
                                Benefits
                            </label>
                            <input
                                type="text"
                                name="benefits"
                                defaultValue={mockData.benefits}
                                placeholder="Benefits"
                                className={style.Input}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleBenefits(e);
                                    }
                                }}
                            />
                        </div>
                        <div className={style.ShowBenefits}>
                            {benefits.map((benefit, index) => (
                                <div key={index} onClick={() => handleRemoveBenefit(index)}>
                                    {benefit}
                                </div>
                            ))}
                        </div>
                        <div className={style.InputExcludedBenefits}>
                            <label>
                                Excluded Benefits
                            </label>
                            <input
                                type="text"
                                name="excluded_benefits"
                                defaultValue={mockData.excluded_benefits}
                                placeholder="Excluded Benefits"
                                className={style.Input}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleExcludedBenefits(e);
                                    }
                                }}
                            />
                        </div>
                        <div className={style.ShowExcludedBenefits}>
                            {excludedBenefits.map((excluded_benefit, index) => (
                                <div key={index} onClick={() => {
                                    handleRemoveExcludedBenefit(index);
                                }}>
                                    {excluded_benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.rightColumn}>
                        <h1>Work in progress...</h1>
                    </div>
                </form>
                <button className={style.Button} onClick={() => {
                    handleSubmit();
                }}>
                    Submit
                </button>
            </div>
        </div>
    )
};
export default CreateModal;

import React, { useRef, useState, useEffect } from "react";
import style from "./CreateModal.module.css";

const CreateModal = ({ axios, onCourseCreated, closeModal, mockData }) => {
    const [data, setData] = useState({});
    useEffect(() => {
        //simulation of getting data from the server
        setData(mockData);
    }, [axios]);
    console.log(data);

    const handleTitle = (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
            setData({ ...data, benefits: [...data.benefits, e.target.value] });
            e.target.className += " " + style.added;
        }
    };
    const handleDescription = (e) => {
        e.preventDefault();

        //if ctrl + enter is pressed, add the description
        if (e.ctrlKey && e.key === "Enter") {
            setData({ ...data, benefits: [...data.benefits, e.target.value] });
            e.target.className += " " + style.added;
        }
    };
    const handlePrice = (e) => {
        e.preventDefault();

        if (e.target.value < 1) return;
        setData({ ...data, price: e.target.value });
        e.target.className += " " + style.added;
    };
    const handleStripePriceId = (e) => {
        if (e.key === "Enter") {
            setData({ ...data, benefits: [...data.benefits, e.target.value] });
            e.target.className += " " + style.added;
        } else {
            if (e.target.className.includes(style.added)) {
                e.target.className = e.target.className.replace(style.added, "");
            }
        }
    };
    const handleBenefits = (e) => {
        if (e.key === "Enter") {
            setData({ ...data, benefits: [...data.benefits, e.target.value] });
            e.target.value = "";
            console.log(data.benefits);
        }
    };
    const handleExcludedBenefits = (e) => {
        if (e.key === "Enter") {
            setData({ ...data, excluded_benefits: [...data.excluded_benefits, e.target.value] });
            e.target.value = "";
            console.log(data.excluded_benefits);
        }
    };
    const handleSection = (e) => {
        e.preventDefault();

        setData({ ...data, section: e.target.value });
    };
    const handleCategories = (e) => {
        e.preventDefault();


    };
    const handleMonths = (e) => {
        e.preventDefault();


    };
    const handleVideos = (e) => {
        e.preventDefault();


    };
    const checkForm = (data) => {
        if (data.title && data.description && data.price && data.discountedPrice && data.stripePriceId && data.benefits && data.excluded_benefits && data.section && data.categories) {
            return true;
        }
        return false;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkForm(data)) {
            axios.post("/courses", data).then((res) => {
                onCourseCreated(res.data);
                closeModal();
            });
        } else {
            return alert("Please fill all the fields");
        }
    };
    return (<>
        <h1>Create Course</h1>
        <form>
            <div className={style.container}>
                <div className={style.left}>
                    <div className={style.firstGroup}>
                        <div className={style.title}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" />
                        </div>
                        <div className={style.section}>
                            <label htmlFor="section">Section</label>
                            <select id="section">
                                <option value="DOMNA">DOMNA</option>
                                <option value="DOMNA LIVE">DOMNA LIVE</option>
                            </select>
                        </div>
                    </div>

                    <div className={style.description}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description"></textarea>
                    </div>

                    <div className={style.priceGroup}>
                        <div className={style.price}>
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" min={1} step={0.01} />
                        </div>
                        <div className={style.stripe}>
                            <label htmlFor="stripe">Stripe Price Id</label>
                            <input type="text" id="stripe" />
                        </div>
                    </div>
                    <div className={style.benefitGroup}>
                        <div className={style.benefitInput}>
                            <label htmlFor="benefits">Benefits</label>
                            <input type="text" id="benefits" onKeyDown={handleBenefits} />
                        </div>
                        <div className={style.benefitDisplay}>
                            {data.benefits && data.benefits.map((benefit, index) => {
                                return <span key={index} className={style.benefit}>{benefit}</span>
                            })}
                        </div>
                    </div>
                    <div className={style.excludedGroup}>
                        <div className={style.excludedInput}>
                            <label htmlFor="excludedBenefits">Excluded Benefits</label>
                            <input type="text" id="excludedBenefits" onKeyDown={handleExcludedBenefits} />
                        </div>
                        <div className={style.excludedDisplay}>
                            {data.excluded_benefits && data.excluded_benefits.map((excluded_benefit, index) => {
                                return <span key={index} className={style.excluded}>{excluded_benefit}</span>
                            })}
                        </div>
                    </div>
                    <div className={style.category}>
                        <div className={style.categoryName}>
                            <label htmlFor="categoryname">Category</label>
                            <input type="text" id="categoryname" />
                        </div>
                        <div className={style.categoryDescription}>
                            <label htmlFor="categorydescription">Category Description</label>
                            <textarea id="categorydescription"></textarea>
                        </div>
                        <button onClick={handleCategories}>Add</button>
                    </div>
                </div>
                <div className={style.right}>
                    {data.categories && data.categories.map((category, index) => {
                        return (
                            <>
                                <div className={style.displayCategory}>
                                    <h2>{category.name}</h2>
                                    <p>{category.description}</p>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
            <button onClick={handleSubmit}>Crea corso</button>
        </form>
    </>)
};
export default CreateModal;
/*
{
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
*/
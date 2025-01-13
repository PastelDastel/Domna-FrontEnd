import style from "./Overview.module.css";
import { useEffect, useState } from "react";

const OverviewModal = ({ closeModal, course, users, benefits, categories, axiosPrivate }) => {

    const [extededBenefits, setExtendedBenefits] = useState([]);
    useEffect(() => {
        if (benefits.length > 0) {
            const fetchBenefits = async () => {
                const extendedBenefits = [];
                for (const benefit of benefits) {
                    try {
                        console.log("Fetching benefit:", benefit.Benefit._id);
                        const response = await axiosPrivate.get(`/api/benefits/${benefit.Benefit._id}`);
                        extendedBenefits.push({ Benefit: response.data, Type: benefit.Type });
                        console.log("Fetched benefit:", response.data);
                    } catch (err) {
                        console.error("Failed to fetch benefit:", err);
                    }
                }
                setExtendedBenefits(extendedBenefits);
            };
            fetchBenefits();
        }
    }, [course]);



    const displayBenefits = () => {
        console.log("Displaying benefits:", extededBenefits);
        return extededBenefits.map((benefit) => (
            <div key={benefit.Benefit._id} className={style.benefit}>
                <h3>{benefit.Benefit.Name}</h3>
                <p><strong>Descrizione:</strong> {benefit.Benefit.Description}</p>
                <p><strong>Tipo:</strong> {benefit.Type === "Included" ? "Incluso" : "Escluso"}</p>
            </div>
        ));
    };
    return (
        <div className={style.courseOverviewModal}>
            {/* Two-column content */}
            <h1>Dettagli di {course.Title}</h1>
            <div className={style.content}>
                {/* Left Column - General Course Data */}
                <div className={style.column}>
                    <div className={style.userData}>
                        <h2>Informazioni</h2>
                        <p><strong>Id:</strong> {course._id}</p>
                        <p><strong>Nome:</strong> {course.Title}</p>
                        <p><strong>Descrizione:</strong> {course.Description}</p>
                        <p><strong>Iscritti:</strong> {course.Subscribers.length}</p>
                        <p><strong>Prezzo:</strong> {course.Price.Discounted ? course.Price.Discounted : course.Price.Normal}</p>
                    </div>
                    <div className={style.courseBenefits}>
                        <h2>Benefici</h2>
                        {benefits.length > 0 ? displayBenefits() : (<>No benefits</>)}

                        {course.Subscribers.length > 0 ? (
                            <>
                                <h2>Iscritti</h2>
                                <ul>
                                    {users.map((user) => (
                                        <li key={user._id}><p><strong>Nome:</strong> {user.username} - <strong>Id:</strong> {user._id}</p></li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <h3>No subscribers</h3>
                        )}
                    </div>

                </div>

                {/* Right Column - Categories */}
                <div className={style.column}>
                    <h2>Categories</h2>
                    {categories.length > 0 ? (
                        <ul>
                            {categories.map((category) => (
                                <li key={category._id} className={style.category}>
                                    <h3>{category.Name}</h3>
                                    <p><strong>Id:</strong> {category._id}</p>
                                    <p><strong>Descrizione:</strong> {category.Description ? category.Description : "Nessuna descrizione"}</p>
                                    {category.Months?.length > 0 ? (<>
                                        <h4>Months</h4>
                                        <div>
                                            {
                                                category.Months.map((month, index) => (
                                                    <div key={month._id} className={style.month}>
                                                        <h5>Month {index + 1}</h5>
                                                        <h5>{month.Name}</h5>
                                                        <h5>{month.Description}</h5>
                                                        {month.Videos?.length > 0 ? (<h5>Video: {month.Videos.length}</h5>) : (<h5>No videos</h5>)}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>) : (<p>No Months</p>)}
                                    {category.SubCategories?.length > 0 ? (<>
                                        <h4>Subcategories</h4>
                                        <div>
                                            {
                                                category.SubCategories.map((subCategory) => (
                                                    <div key={subCategory._id} className={style.subCategory}>
                                                        <h5>{subCategory.Name}</h5>
                                                        <p>{subCategory.Description}</p>
                                                        {subCategory.Videos?.length > 0 ? (<div>Video: {subCategory.Videos.length}</div>) : (<div>No videos</div>)}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>) : (<p>
                                        No subcategories
                                    </p>)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h3>No categories</h3>
                    )}
                </div>
            </div>

            {/* Footer - Close Button */}
            <div className={style.footer}>
                <button onClick={closeModal} className={style.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default OverviewModal;

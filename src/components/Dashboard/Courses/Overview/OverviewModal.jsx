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




    return (
        <div className={style.courseOverviewModal}>
            <h1>Dettagli di {course.Title}</h1>
            <div className={style.content}>
                {/* Left Column - General Course Data */}
                <div className={style.column}>
                    <div className={style.userData}>
                        <h2 className={style.sectionHeading}>Informazioni</h2>
                        <p><strong>Id:</strong> {course._id}</p>
                        <p><strong>Nome:</strong> {course.Title}</p>
                        <p
                            dangerouslySetInnerHTML={
                                { __html: "<strong>Descrizione:</strong> " + course.Description }
                            }
                        ></p>
                        {course.Image ? <img src={course.Image} className={style.courseImage} /> : <p className={style.noImage}>No image detected</p>}
                        <p><strong>Iscritti:</strong> {course.Subscribers.length}</p>
                        <p><strong>Prezzo:</strong> {course.Price.Discounted ? course.Price.Discounted : course.Price.Normal}</p>
                    </div>
                    <div className={style.courseBenefits}>
                        <h2 className={style.sectionHeading}>Benefici</h2>
                        {benefits.length > 0 ? (
                            <>
                                <div className={style.benefitTypeGroup}>
                                    <h3 className={style.benefitTypeHeading}>Inclusi</h3>
                                    <div className={style.benefitCards}>
                                        {benefits.filter(b => b.Type === "Included").map((benefit, index) => (
                                            <div key={index} className={style.benefitCard}>
                                                <h3 className={style.benefitTitle}>{benefit.Benefit.Name}</h3>
                                                <p className={style.benefitDescription} dangerouslySetInnerHTML={
                                                    { __html: benefit.Benefit.Description }
                                                }></p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={style.benefitTypeGroup}>
                                    <h3 className={style.benefitTypeHeading}>Esclusi</h3>
                                    <div className={style.benefitCards}>
                                        {benefits.filter(b => b.Type === "Excluded").map((benefit, index) => (
                                            <div key={index} className={style.benefitCard}>
                                                <h3 className={style.benefitTitle}>{benefit.Benefit.Name}</h3>
                                                <p className={style.benefitDescription} dangerouslySetInnerHTML={
                                                    { __html: benefit.Benefit.Description }
                                                }></p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className={style.noBenefits}>No benefits</p>
                        )}

                        {course.Subscribers.length > 0 ? (
                            <>
                                <h2 className={style.sectionHeading}>Iscritti</h2>
                                <ul className={style.subscriberList}>
                                    {users.map((user) => (
                                        <li key={user._id} className={style.subscriberItem}>
                                            <p><strong>Nome:</strong> {user.username}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <h6><strong>Id:</strong> {user._id}</h6>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <h3 className={style.noSubscribers}>No subscribers</h3>
                        )}
                    </div>
                </div>

                {/* Right Column - Categories */}
                <div className={style.column}>
                    <h2>Categories</h2>
                    {categories.length > 0 ? (
                        <ul className={style.categoryList}>
                            {categories.map((category) => (
                                <li key={category._id} className={style.category}>
                                    <h3 className={style.categoryTitle}>{category.Name}</h3>
                                    <p><strong>Id:</strong> {category._id}</p>
                                    <p
                                        dangerouslySetInnerHTML={
                                            { __html: "<strong>Descrizione:</strong> " + category.Description ? category.Description : "Nessuna descrizione" }
                                        }
                                    ></p>
                                    {category.Months?.length > 0 ? (
                                        <>
                                            <h4 className={style.sectionHeading}>Months</h4>
                                            <div className={style.monthList}>
                                                {category.Months.map((month, index) => (
                                                    <div key={month._id} className={style.monthItem}>
                                                        <h5>Month {index + 1}</h5>
                                                        <h5>{month.Name}</h5>
                                                        <h5>{month.Description}</h5>
                                                        {month.Videos?.length > 0 ? (
                                                            <h5>Video: {month.Videos.length}</h5>
                                                        ) : (
                                                            <h5>No videos</h5>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p>No Months</p>
                                    )}
                                    {category.SubCategories?.length > 0 ? (
                                        <>
                                            <h4 className={style.sectionHeading}>Subcategories</h4>
                                            <div className={style.subCategoryList}>
                                                {category.SubCategories.map((subCategory) => (
                                                    <div key={subCategory._id} className={style.subCategoryItem}>
                                                        <h5>{subCategory.Name}</h5>
                                                        <p
                                                            dangerouslySetInnerHTML={
                                                                { __html: "<strong>Description:</strong> " + subCategory.Description }
                                                            }
                                                        ></p>
                                                        {subCategory.Videos?.length > 0 ? (
                                                            <div>Video: {subCategory.Videos.length}</div>
                                                        ) : (
                                                            <div>No videos</div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p>No subcategories</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h3>No categories</h3>
                    )}
                </div>

            </div>
            <div className={style.footer}>
                <button onClick={closeModal} className={style.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default OverviewModal;

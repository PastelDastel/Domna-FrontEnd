import { useEffect, useState } from "react";
import style from "./Overview.module.css";
const Overview = ({ closeModal, axios, category }) => {
    console.log(category);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`/api/categories/details/${category._id}`);
                setCategoryDetails(response.data);
            } catch (err) {
                console.error("Failed to fetch category details:", err);
                setError("Failed to load category details.");
            } finally {
                setLoading(false);
            }
        };
        if (category && category._id) {
            fetchCategoryDetails();
        }
    }, [axios, category]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!categoryDetails) {
        return <div>No details available.</div>;
    }
    return (
        <div className={style.overviewCategory}>
            <h1>Dettagli della categoria</h1>
            <div className={style.flexContainer}>
                <div className={style.left}>
                    <div className={style.categoryDetails}>
                        <div>
                            <p><strong>Nome:</strong> {categoryDetails.Name}</p>
                            <p dangerouslySetInnerHTML={
                                { __html: "<strong>Descrizione:</strong> " + categoryDetails.Description }
                            }></p>
                            {categoryDetails.Image ? (
                                <img src={categoryDetails.Image} alt="Category" className={style.categoryImage} />
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.months}>
                        <h2>Months</h2>
                        <div className={style.monthsContainer}>
                            {categoryDetails.Months && categoryDetails.Months.length > 0 ? (
                                categoryDetails.Months.map((month, index) => (
                                    <div key={index} className={style.monthDetails}>
                                        <p><strong>Month {index + 1}</strong></p>
                                        <p dangerouslySetInnerHTML={
                                            { __html: month.Description }
                                        }></p>
                                        <p><strong>Videos</strong></p>
                                        <div className={style.monthContent}>
                                            {month.Videos && month.Videos.length > 0 ? (
                                                month.Videos.map((video) => (
                                                    <a href={video.Url} target="_blank" rel="noreferrer" key={video._id}>{video.Title}</a>
                                                ))
                                            ) : (
                                                <div>No videos for this month.</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No months added yet.</p>
                            )}
                        </div>
                    </div>
                    <div className={style.subcategories}>
                        <h2>Subcategories</h2>
                        <div className={style.subcategoriesContainer}>
                            {categoryDetails.SubCategories && categoryDetails.SubCategories.length > 0 ? (
                                categoryDetails.SubCategories.map((subCat, index) => (
                                    <div key={index} className={style.subcategoryDetails}>
                                        <p><strong>{subCat.Name}</strong></p>
                                        <p dangerouslySetInnerHTML={
                                            { __html: subCat.Description }
                                        }></p>
                                        <div>
                                            {subCat.Image ? <img src={subCat.Image} /> : <p>No image available.</p>}
                                        </div>
                                        <p><strong>Videos</strong></p>
                                        <div className={style.subcategoryContent}>
                                            {subCat.Videos && subCat.Videos.length > 0 ? (
                                                subCat.Videos.map((video) => (
                                                    <a href={video.Url} target="_blank" rel="noreferrer" key={video._id}>{video.Title}</a>
                                                ))
                                            ) : (
                                                <p>No videos for this subcategory.</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No subcategories added yet.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default Overview;
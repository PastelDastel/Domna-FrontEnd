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
        <div className={style["overview-modal"]}>
            <h1>Dettagli della categoria</h1>
            <div className={style["main-details"]}>
                <span>Nome: {categoryDetails.Name}</span>
                {categoryDetails.Image ? (
                    <img src={categoryDetails.Image} alt="Category" className={style.categoryImage} />
                ) : (
                    <p>No image available.</p>
                )}
                <span dangerouslySetInnerHTML={
                    { __html: "Descrizione: " + categoryDetails.Description }
                }></span>
            </div>
            <div className={style["overview-months"]}>
                <h2>Months</h2>
                {categoryDetails.Months && categoryDetails.Months.length > 0 ? (
                    categoryDetails.Months.map((month, index) => (
                        <div key={index} className={style["month-card"]}>
                            <span>Month {index + 1}</span>
                            <span dangerouslySetInnerHTML={
                                { __html: month.Description }
                            }></span>
                            <span>Videos</span>
                            <div className={style["month-videos"]}>
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
            <div className={style["overview-subcategories"]}>
                <h2>Subcategories</h2>
                {categoryDetails.SubCategories && categoryDetails.SubCategories.length > 0 ? (
                    categoryDetails.SubCategories.map((subCat, index) => (
                        <div key={index} className={style["subcategory-card"]}>
                            <div>
                                {subCat.Image ? <img src={subCat.Image} /> : <p>No image available.</p>}
                            </div>
                            <span>{subCat.Name}</span>
                            <span dangerouslySetInnerHTML={
                                { __html: subCat.Description.length > 0 ? subCat.Description : "No description available." }
                            }></span>
                            <span>Videos</span>
                            <div className={style["subcategory-videos"]}>
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
            <button onClick={closeModal} className={style["overview-close"]}>Close</button>
        </div>
    );
};

export default Overview;
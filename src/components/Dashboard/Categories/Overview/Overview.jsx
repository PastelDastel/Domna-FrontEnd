import { useEffect, useState } from "react";

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
        <div>
            <h1>Category Overview</h1>
            <button onClick={closeModal}>Close</button>
            <div>
                <h2>Name: {categoryDetails.Name}</h2>
                <p>Description: {categoryDetails.Description}</p>
            </div>
            {/* Months Section */}
            <div>
                <h2>Months</h2>
                {categoryDetails.Months && categoryDetails.Months.length > 0 ? (
                    categoryDetails.Months.map((month, index) => (
                        <div key={index}>
                            <h3>Month {index + 1}</h3>
                            <h5>{month.Description}</h5>
                            <div>
                                <h4>Videos:</h4>
                                {month.Videos && month.Videos.length > 0 ? (
                                    month.Videos.map((video) => (
                                        <div key={video._id}>
                                            <div>{video.Title}</div>
                                            {video.Description ? <div> - {video.Description}</div> : <div>No description provided</div>}
                                            <div>{video.Url}</div>
                                        </div>
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
            {/* Subcategories Section */}
            <div>
                <h2>Subcategories</h2>
                {categoryDetails.SubCategories && categoryDetails.SubCategories.length > 0 ? (
                    categoryDetails.SubCategories.map((subCat, index) => (
                        <div key={index}>
                            <h3>{subCat.Name}</h3>
                            <p>{subCat.Description}</p>
                            <div>
                                <h4>Videos:</h4>
                                {subCat.Videos && subCat.Videos.length > 0 ? (
                                    subCat.Videos.map((video) => (
                                        <div key={video._id}>
                                            <div>{video.Title}</div>
                                            {video.Description ? <div> - {video.Description}</div> : <div>No description provided</div>}
                                            <div>{video.Url}</div>
                                        </div>
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
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default Overview;

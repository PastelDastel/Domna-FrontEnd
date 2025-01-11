import { useState, useEffect, useRef } from "react";

const Create = ({ closeModal, axios, onCategoryCreated }) => {
    const [videos, setVideos] = useState([]);
    const [months, setMonths] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const monthDescriptionRef = useRef();
    const subCatRef = useRef();
    const subCatDescriptionRef = useRef();
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [availableVideos, setAvailableVideos] = useState([]);

    const [isMonth, setIsMonth] = useState(false);

    const removeSubCat = (subCat) => {
        setSubCats((prevSubCats) => prevSubCats.filter((s) => s !== subCat));
    };




    const addSubCat = () => {
        const subCatName = subCatRef.current.value.trim();
        const subCatDescription = subCatDescriptionRef.current.value.trim();
        if (!subCatName) return;
        const newSubCat = { Name: subCatName, Description: subCatDescription, Videos: selectedVideos };
        setSubCats((prevSubCats) => [...prevSubCats, newSubCat]);
        subCatRef.current.value = ""; // Clear the input field
        subCatDescriptionRef.current.value = ""; // Clear the input field
        setSelectedVideos([]); // Clear the selected videos
        refreshVideosAvailable();
    }

    const refreshVideosAvailable = () => {
        setAvailableVideos(videos);
    };


    const removeMonth = (month) => {
        setMonths((prevMonths) => prevMonths.filter((m) => m !== month));
    };
    // Fetch videos when the component mounts
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                setVideos(response.data);
                setAvailableVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, [axios]);

    // Add a new month
    const addMonth = () => {
        const monthDescription = monthDescriptionRef.current.value.trim();

        if (!monthDescription) return;
        const newMonth = { Description: monthDescription, Videos: selectedVideos };
        setMonths((prevMonths) => [...prevMonths, newMonth]);
        monthDescriptionRef.current.value = ""; // Clear the input field
        setSelectedVideos([]); // Clear the selected videos
        refreshVideosAvailable();
    };


    const removeVideofromSubCat = (subCat, video) => {
        setSubCats((prevSubCats) =>
            prevSubCats.map((s) =>
                s === subCat
                    ? { ...s, Videos: s.Videos.filter((v) => v._id !== video._id) }
                    : s
            )
        );
    }


    // Remove a video from a specific month
    const removeVideofromMonth = (month, video) => {
        setMonths((prevMonths) =>
            prevMonths.map((m) =>
                m === month
                    ? { ...m, Videos: m.Videos.filter((v) => v._id !== video._id) }
                    : m
            )
        );
    };

    // Submit the main form
    const submitForm = async (e) => {
        e.preventDefault(); // Prevent default page reload
        const name = e.target.name.value.trim();
        const description = e.target.description.value.trim();
        try {
            const category = { name, description, months, subCats };
            console.log("Category before submitting: ", category)

            const response = await axios.post("/api/categories", category);
            onCategoryCreated(response.data); // Notify parent about the new category
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };
    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={submitForm}>
                {/* General Category Information */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>
                {/* Months Section */}
                <div>
                    <button type="button" onClick={(e) => {
                        setIsMonth(!isMonth)
                        setSelectedVideos([]);
                        refreshVideosAvailable();
                    }}>Switch</button>
                    {isMonth ? (<div>
                        <label>Month configuration</label>
                        <textarea type="text" ref={monthDescriptionRef} />
                        <button type="button" onClick={addMonth}>
                            Add Month
                        </button>
                        {availableVideos.length > 0 ? (<><select name="videos" id="videosss">
                            {availableVideos.map((video) => (
                                <option key={video._id} value={video._id}>
                                    {video.Title}
                                </option>
                            ))}
                        </select>
                            <button type="button" onClick={() => {
                                const selectedVideo = document.getElementById("videosss").value;
                                const video = videos.find((v) => v._id === selectedVideo);
                                setSelectedVideos((prev) => [...prev, video]);
                                setAvailableVideos(availableVideos.filter((v) => v._id !== selectedVideo));
                            }}>Add Video</button></>) : (<>No more videos available</>)}
                        {selectedVideos.map((video) => (
                            <div key={video._id}>
                                <span>{video.Title}</span>
                                <button
                                    onClick={() => setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>) : (<div>
                        <label>Add SubCategory</label>
                        <input type="text" ref={subCatRef} />
                        <label>SubCategory Description</label>
                        <textarea type="text" ref={subCatDescriptionRef} />
                        <button type="button" onClick={addSubCat}>Add SubCat</button>
                        {availableVideos.length > 0 ? (<><select name="videos" id="videosss">
                            {availableVideos.map((video) => (
                                <option key={video._id} value={video._id}>
                                    {video.Title}
                                </option>
                            ))}
                        </select>
                            <button type="button" onClick={() => {
                                const selectedVideo = document.getElementById("videosss").value;
                                const video = videos.find((v) => v._id === selectedVideo);
                                setSelectedVideos((prev) => [...prev, video]);
                                setAvailableVideos(availableVideos.filter((v) => v._id !== selectedVideo));
                            }}>Add Video</button></>) : (<>No more videos available</>)}
                        {selectedVideos.map((video) => (
                            <div key={video._id}>
                                <span>{video.Title}</span>
                                <button
                                    onClick={() => setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>)}
                </div>
                <div>
                    {months.length > 0 ? (<div>
                        {months.map((month, index) => (
                            <div key={month.Description}>
                                <div>
                                    <h1>Month {index + 1}</h1>
                                    <button type="button" onClick={() => { removeMonth(month) }}>Remove</button>
                                </div>
                                <h3>{month.Description}</h3>
                                {month.Videos.map((video) => (
                                    <div key={video._id}>
                                        <span>{video.Title}</span>
                                        <button
                                            onClick={() => removeVideofromMonth(month, video)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>) : (<div>
                        <p>No months added yet.</p>
                    </div>)}
                </div>
                <div>
                    {subCats.length > 0 ? (<div>
                        {subCats.map((subCat, index) => (
                            <div key={subCat.Name}>
                                <div>
                                    <h1>SubCategory {index + 1}</h1>
                                    <button type="button" onClick={() => { removeSubCat(subCat) }}>Remove</button>
                                </div>
                                <h3>{subCat.Name}</h3>
                                <h3>{subCat.Description}</h3>
                                {subCat.Videos.map((video) => (
                                    <div key={video._id}>
                                        <span>{video.Title}</span>
                                        <button
                                            onClick={() => removeVideofromSubCat(subCat, video)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>) : (<div>
                        <p>No subCats added yet.</p>
                    </div>)}
                </div>
                <button type="submit">Create Category</button>
            </form>
        </div>
    );
};

export default Create;

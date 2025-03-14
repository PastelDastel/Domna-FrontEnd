import { useState, useEffect, useRef } from "react";
import style from "./Create.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";



const Create = ({ closeModal, axios, onCategoryCreated }) => {
    const editorMain = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });

    const subCatEdit = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });

    const MonthEdit = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });


    const [videos, setVideos] = useState([]);
    const [months, setMonths] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const subCatRef = useRef();
    const [base64SubCatImage, setBase64SubCatImage] = useState("");
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [availableVideos, setAvailableVideos] = useState([]);

    const [isMonth, setIsMonth] = useState(false);

    const removeSubCat = (subCat) => {
        setSubCats((prevSubCats) => prevSubCats.filter((s) => s !== subCat));
    };




    const addSubCat = () => {
        const subCatName = subCatRef.current.value.trim();
        const subCatDescription = subCatEdit.getHTML();
        const subCatImg = base64SubCatImage;
        if (!subCatName) return;
        const newSubCat = { Name: subCatName, Description: subCatDescription, Videos: selectedVideos, Image: subCatImg };
        setSubCats((prevSubCats) => [...prevSubCats, newSubCat]);
        subCatRef.current.value = ""; // Clear the input field
        subCatEdit.commands.setContent("Enter description here\n");
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
        const monthDescription = MonthEdit.getHTML();

        if (!monthDescription) return;
        const newMonth = { Description: monthDescription, Videos: selectedVideos };
        setMonths((prevMonths) => [...prevMonths, newMonth]);
        MonthEdit.commands.setContent("Enter description here\n");
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
    const [base64Image, setBase64Image] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBase64Image(event.target.result); // Set Base64 string in state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    const handleSubCatImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBase64SubCatImage(event.target.result); // Set Base64 string in state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };
    // Submit the main form
    const submitForm = async (e) => {
        e.preventDefault(); // Prevent default page reload
        const name = e.target.name.value.trim();
        const description = editorMain.getHTML();
        //send the img as a urlencoded string
        const img = base64Image;

        try {
            const category = { name, description, months, subCats, img };
            console.log("Category before submitting: ", category)

            const response = await axios.post("/api/categories", category);
            onCategoryCreated(response.data); // Notify parent about the new category
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };



    const handlePutSubcatImage = (subCat, imageUrl) => {
        setSubCats((prevSubCats) =>
            prevSubCats.map((s) =>
                s === subCat
                    ? { ...s, Image: imageUrl }
                    : s
            )
        );
    }


    return (
        <div className={style["create-category"]}>
            <h1>Create Category</h1>
            <form onSubmit={submitForm}>
                <div className={style["form-content"]}>
                    <div className={style["create-first-section"]}>
                        <div className={style["name-create"]}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className={style["image-create"]}>
                            <label htmlFor="img">Immagine</label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className={style["description-create"]}>
                            <label htmlFor="description">Description</label>
                            <span><EditorContent editor={editorMain} /></span>
                        </div>
                        <div className={style["image-preview"]}>
                            {base64Image ? <img src={base64Image} /> : <p>No image available.</p>}
                        </div>
                    </div>
                    <div>
                        <button type="button" className={style["switch-button"]} onClick={(e) => {
                            setIsMonth(!isMonth)
                            setSelectedVideos([]);
                            refreshVideosAvailable();
                        }}>{isMonth ? "Vai a Sottocategorie" : "Vai a Mesi"}</button>
                        {isMonth ? (

                            <div className={style["month-section"]}>

                                <div className={style["month-name"]}>
                                    <label>Nome</label>
                                    <input type="text" readonly value={"Mese " + (months.length + 1)} />
                                </div>
                                <div className={style["month-description"]}>
                                    <label>Descrizione</label>
                                    <span><EditorContent editor={MonthEdit} /></span>
                                </div>

                                <div className={style["month-videos-input"]}>
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
                                        }}>Add Video</button></>) : (<p>No more videos available</p>)}
                                </div>

                                <div>
                                    <p><strong>{selectedVideos.length > 0 ? "Video aggiunti" : "Nessun vudeo aggiunto"}</strong></p>
                                    <div className={style["month-video-container"]}>
                                        {selectedVideos.map((video) => (
                                            <div key={video._id} className={style["month-video-card"]}>
                                                <span>{video.Title}</span>
                                                <button
                                                    onClick={() => setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id))}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={style["month-add-button"]}>
                                    <button type="button" onClick={addMonth}>
                                        Add Month
                                    </button>
                                </div>
                            </div>
                        ) : (




                            <div className={style["subCat-section"]}>
                                <div className={style["subCat-name"]}>
                                    <label>Nome</label>
                                    <input type="text" ref={subCatRef} />
                                </div>
                                <div className={style["subCat-image"]}>
                                    <label htmlFor="subCatImage">Image</label>
                                    <input type="file" id="subCatImage" name="subCatImage" onChange={handleSubCatImageUpload} accept="image/*" />
                                </div>
                                <div className={style["subCat-description"]}>
                                    <label>Description</label>
                                    <span><EditorContent editor={subCatEdit} /></span>
                                </div>
                                <div className={style["subCat-image-preview"]}>
                                    {base64SubCatImage ? <img src={base64SubCatImage} /> : <p>No image available.</p>}
                                </div>
                                <div className={style["subCat-videos-input"]}>
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
                                        }}>Add Video</button></>) : (<p>No more videos available</p>)}
                                </div>
                                <div><p><strong>{selectedVideos.length > 0 ? "Video aggiunti" : "Nessun video aggiunto"}</strong></p>
                                    <div className={style["subCat-video-container"]}>
                                        {selectedVideos.map((video) => (
                                            <div key={video._id} className={style["subCat-video-card"]}>
                                                <span>{video.Title}</span>
                                                <button
                                                    onClick={() => setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id))}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={style["subCat-add-button"]}>
                                    <button type="button" onClick={addSubCat}>Add SubCat</button>
                                </div>
                                {selectedVideos.map((video) => (
                                    <div key={video._id}>
                                        <span>{video.Title}</span>
                                        <button
                                            onClick={() => setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id))}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            {months.length > 0 ? (
                                <div className={style["existing-months"]}>
                                    {months.map((month, index) => (
                                        <div key={month.Description} className={style["existing-month-card"]}>
                                            <div className={style["existing-month-header"]}>
                                                <h1>Mese {index + 1}</h1>
                                                <button type="button" onClick={() => { removeMonth(month) }}>x</button>
                                            </div>
                                            <div className={style["existing-month-body"]}>
                                                <h5>{month.Description}</h5>
                                                <div className={style["existing-month-videos"]}>
                                                    {month.Videos.map((video) => (
                                                        <div key={video._id} className={style["existing-month-video-card"]}>
                                                            <span>{video.Title}</span>
                                                            <button
                                                                onClick={() => removeVideofromMonth(month, video)}
                                                            >
                                                                x
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p>No months added yet.</p>
                                </div>
                            )}
                        </div>
                        <div>
                            {subCats.length > 0 ? (
                                <div className={style["existing-subCats"]}>
                                    {subCats.map((subCat, index) => (
                                        <div key={subCat.Name} className={style["existing-subCat-card"]}>
                                            <div className={style["existing-subCat-header"]}>
                                                <h3>{subCat.Name}</h3>
                                                <button type="button" onClick={() => { removeSubCat(subCat) }}>x</button>
                                            </div>
                                            <div className={style["existing-subCat-image"]}>
                                                {subCat.Image ? <img src={subCat.Image} /> : <p>No image available.</p>}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                const base64String = reader.result;
                                                                handlePutSubcatImage(subCat, base64String);
                                                            };
                                                            reader.onerror = () => {
                                                                console.error("Failed to read the file.");
                                                            };
                                                            reader.readAsDataURL(file); // Convert the file to a data URL
                                                        } else {
                                                            console.log("No file selected.");
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={style["existing-subCat-body"]}>
                                                <h5>{subCat.Description}</h5>
                                                <div className={style["existing-subCat-videos"]}>
                                                    {subCat.Videos.map((video) => (
                                                        <div key={video._id} className={style["existing-subCat-video-card"]}>
                                                            <span>{video.Title}</span>
                                                            <button
                                                                onClick={() => removeVideofromSubCat(subCat, video)}
                                                            >
                                                                x
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>) : (<div>
                                    <p>No subCats added yet.</p>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className={style["edit-modal-footer"]}>
                    <button type="button" className={style["close-button"]} onClick={closeModal}>Annulla</button>
                    <button type="submit" className={style["final-confirm"]}>Conferma</button>
                </div>




            </form >
        </div >
    );
};

export default Create;

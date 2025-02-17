import { useState, useEffect, useRef } from "react";
import styles from "./Edit.module.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MonthsInput = ({ index, videos, setMonths }) => {
    const [description, setDescription] = useState("");
    const [selectedVideos, setSelectedVideos] = useState([]);
    const MonthEdit = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
        onChange: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        console.log("Selected videos in Months Input: " + selectedVideos);
    }, [selectedVideos]);
    const _handleAddMonth = () => {
        const newMonth = { Description: description, Videos: selectedVideos };
        setMonths((prevMonths) => [...prevMonths, newMonth]);
        MonthEdit.commands.setContent("Enter description here\n");
        setSelectedVideos([]);
    };
    return <>
        <div key={index} className={styles["new-month-card"]}>
            <div className={styles["month-input-name"]}>
                <span>Nuovo mese  ={">"} Mese {index}</span>
            </div>
            <div className={styles["month-input-videos"]}>
                {videos.length >= 0 ? <>
                    {!isVisible ?
                        <button type="button"
                            onClick={() => setIsVisible(true)}
                        >Gestisci video</button> :
                        <VideoInput
                            videos={videos}
                            selectedVideos={selectedVideos}
                            CloseModal={() => setIsVisible(false)}
                            setSelectedVideos={setSelectedVideos}
                        />}
                </> : <>
                    <span>Nessun video disponibile</span>
                </>}
            </div>
            <div className={styles["month-input-description"]}>
                <span>Description</span>
                <EditorContent editor={MonthEdit} />
            </div>
            <div className={styles["month-display-selected"]}>Video aggiunti: {selectedVideos.length}</div>
            <div className={styles["month-input-footer"]}>
                <button type="button" onClick={() => _handleAddMonth()}>Aggiungi Mese</button>
            </div>
        </div>
    </>
};

const VideoInput = ({ videos, selectedVideos, CloseModal, setSelectedVideos }) => {
    const [availableVideos, setAvailableVideos] = useState([]);
    const [selectedMonthVideos, setSelectedMonthVideos] = useState(selectedVideos);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    useEffect(() => {
        setAvailableVideos(videos.filter((video) => !selectedVideos.includes(video)));
    }, [videos, selectedVideos]);
    const handleDragStart = (index) => {
        setDraggedItemIndex(index);
    };
    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };
    const handleDrop = (index) => {
        if (draggedItemIndex === null || draggedItemIndex === index) return;
        const newVideos = [...selectedMonthVideos];
        const [movedVideo] = newVideos.splice(draggedItemIndex, 1);
        newVideos.splice(index, 0, movedVideo);
        setSelectedMonthVideos(newVideos);
        setDraggedItemIndex(null);
    };
    const _handleAddVideo = (video) => {
        setSelectedMonthVideos((prev) => [...prev, video]);
        setAvailableVideos((prev) => prev.filter((v) => v._id !== video._id));
    };
    const _handleRemoveVideo = (video) => {
        setSelectedMonthVideos((prev) => prev.filter((v) => v._id !== video._id)); // Remove the video from the selected videos
        setAvailableVideos((prev) => [...prev, video]);
    };
    const _handleSaveSelectedVideos = () => {
        console.log("Selected videos in _handleSaveSelectedVideos: " + selectedMonthVideos);
        setSelectedVideos(selectedMonthVideos);
        CloseModal();
    };
    return (
        <div className={styles["video-input"]}>
            <div className={styles["video-input-available"]}>
                <h1>Video disponibili</h1>
                {availableVideos.map((video) => (
                    <div key={video._id} className={styles["video-input-item"]}>
                        <span>{video.Title}</span>
                        <span> <a href={video.Url} target="_blank">{video.Url}</a></span>
                        <button type="button" onClick={() => _handleAddVideo(video)}>
                            Aggiungi
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles["video-input-selected"]}>

                <h1>Video aggiunti</h1>
                {selectedMonthVideos.length <= 0 ? <span>Nessun video aggiunto</span> : null}
                {selectedMonthVideos.map((video, index) => (
                    <div
                        key={video._id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        className={styles["video-input-item-selected"]}
                    >
                        <span>{video.Title}</span>
                        <button type="button" onClick={() => { _handleRemoveVideo(video) }}>Rimuovi</button>
                    </div>
                ))}

            </div>
            <div className={styles["video-input-footer"]}>
                <button type="button" onClick={CloseModal}>Chiudi</button>
                <button type="button" onClick={_handleSaveSelectedVideos}>Salva</button>
            </div>
        </div>
    );
};

const EditDescription = ({ description, setDescription, CloseModal }) => {
    // Creazione dell'editor con il valore iniziale della descrizione
    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description, // Contenuto iniziale
    });

    // Sincronizza l'editor con la descrizione esterna quando cambia
    useEffect(() => {
        if (DescriptionEditor && description !== DescriptionEditor.getHTML()) {
            DescriptionEditor.commands.setContent(description);
        }
    }, [description, DescriptionEditor]);

    return (
        <div className={styles["editor-description"]}>
            <div className={styles["editor-description-content"]}>
                <span>Descrizione</span>
                <EditorContent editor={DescriptionEditor} />
            </div>
            <div className={styles["editor-description-footer"]}>
                <button type="button" onClick={CloseModal}>Chiudi</button>
                <button
                    type="button"
                    onClick={() => {
                        if (DescriptionEditor) {
                            setDescription(DescriptionEditor.getHTML());
                        }
                        CloseModal();
                    }}
                >
                    Salva
                </button>
            </div>
        </div>
    );
};

const EditName = ({ name, setName, CloseModal }) => {
    return (
        <div className={styles["edit-name"]}>
            <div className={styles["edit-name-content"]}>
                <span>Nome</span>
                <input
                    type="text"
                    value={name}
                />
            </div>
            <div className={styles["edit-name-footer"]}>

                <button type="button" onClick={CloseModal}>Chiudi</button>
                <button
                    type="button"
                    onClick={() => {  // Chiudi il modal e salva il nuovo nome
                        setName(name);
                        CloseModal();
                    }}
                >
                    Salva
                </button>
            </div>
        </div>
    );

};


const MonthCard = ({ month, index, videos, setMonth }) => {
    const [description, setDescription] = useState(month.Description);
    const [selectedVideos, setSelectedVideos] = useState(month.Videos);
    const [isVisible, setIsVisible] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);



    return <>
        <div key={month._id} className={styles["existing-month-card"]}>
            <div className={styles["month-card-content"]}>
                <h1>Mese {index + 1}</h1>
                {
                    !isDescriptionVisible ? <>
                        <button type="button" onClick={() => setIsDescriptionVisible(true)}>Modifica</button>
                    </> : <>
                        <EditDescription
                            description={description}
                            setDescription={(newDescription) => {
                                setDescription(newDescription); // Aggiorna lo stato locale
                                setMonth((prevMonths) =>
                                    prevMonths.map((m) =>
                                        m === month ? { ...m, Description: newDescription } : m
                                    )
                                );
                            }}
                            CloseModal={() => setIsDescriptionVisible(false)}
                        />
                    </>
                }
                {!isVisible ?
                    <><button type="button"
                        onClick={() => setIsVisible(true)}
                    >Video</button>
                        <button
                            type="button"
                            onClick={() => {
                                setMonth((prevMonths) =>
                                    prevMonths.filter((m) => m !== month)
                                );
                            }}
                        >
                            Rimuovi
                        </button>
                    </>
                    :
                    <VideoInput videos={videos}
                        selectedVideos={selectedVideos}
                        CloseModal={() => {
                            setMonth((prevMonths) => prevMonths.map((m) => m === month ? { ...m, Videos: selectedVideos } : m));
                            setIsVisible(false)
                        }}
                        setSelectedVideos={setSelectedVideos} />}
            </div>
            <div>
                <span dangerouslySetInnerHTML={{ __html: description }}></span>
            </div>
            <div>
                <span>Video nel mese: {selectedVideos.length}</span>
            </div>
        </div >
    </>
};

const SubCategoriesInput = ({ index, videos, setSubCats }) => {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [base64Image, setBase64Image] = useState(null);

    //ref dei vari input
    const nameRef = useRef();
    const imageRef = useRef();




    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
        onChange: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });
    const [isVisible, setIsVisible] = useState(false);
    const _handleAddSubCat = () => {
        const newSub = { Description: description, Videos: selectedVideos, Image: base64Image, Name: nome };
        //Name Description Videos Image
        setSubCats((prevSubs) => [...prevSubs, newSub]);
        DescriptionEditor.commands.setContent("Enter description here\n");
        nameRef.current.value = "";
        imageRef.current.value = "";
        setBase64Image(null);
        setNome("");
        setSelectedVideos([]);
    };

    const _handleSubCatImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBase64Image(event.target.result); // Set Base64 string in state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    return <>
        <div key={index} className={styles["input-subCat"]}>
            <div className={styles["input-subCat-name"]}>
                <span>Nome</span>
                <input
                    type="text"
                    placeholder="Inserisci nome"
                    onChange={(e) => setNome(e.target.value)}
                    ref={nameRef}
                />
            </div>
            <div className={styles["input-subCat-image"]}>
                <label className={styles["custom-file-button"]} onClick={() => document.getElementById("subCatImage").click()}>
                    Scegli immagine
                </label>
                <input
                    type="file"
                    id="subCatImage"
                    name="subCatImage"
                    onChange={_handleSubCatImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={imageRef}
                />
            </div>

            <div className={styles["input-subCat-description"]}>
                <span>Description</span>
                <EditorContent editor={DescriptionEditor} />
            </div>
            <div className={styles["input-subCat-image-preview"]}>
                {base64Image ? <img src={base64Image} /> : <p>No image available.</p>}
            </div>
            <div className={styles["input-subCat-videos"]}>
                {videos.length > 0 ? <>
                    {!isVisible ? <>
                        <button type="button"
                            onClick={() => setIsVisible(true)}
                        >Gestisci video</button>
                        <div className={styles["input-subCat-videos-number"]}>Video aggiunti: {selectedVideos.length}</div>

                    </> :
                        <VideoInput
                            videos={videos}
                            selectedVideos={selectedVideos}
                            CloseModal={() => setIsVisible(false)}
                            setSelectedVideos={setSelectedVideos}
                        />}
                </> : <>
                    <span>Nessun video disponibile</span>
                </>}
            </div>
            <div className={styles["input-subCat-footer"]}>
                <button type="button" onClick={() => _handleAddSubCat()}>Aggiungi Sottocategoria</button>
            </div>
        </div>
    </>


};

const SubCatCard = ({ subCat, index, videos, setSubCats }) => {
    const [name, setName] = useState(subCat.Name);
    const [description, setDescription] = useState(subCat.Description);
    const [selectedVideos, setSelectedVideos] = useState(subCat.Videos);
    const [base64Image, setBase64Image] = useState(subCat.Image || null);
    const [isVisible, setIsVisible] = useState(false);
    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description,
        onChange: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });
    const _handleSaveSubCat = () => {
        const newSubCat = { Name: name, Description: description, Videos: selectedVideos, Image: base64Image };
        setSubCats((prevSubs) => prevSubs.map((s) => s === subCat ? newSubCat : s));
    };
    const _handleSubCatImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBase64Image(event.target.result); // Set Base64 string in state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    return <>
        <div>
            <div>
                <span>Nome</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <span>Immagine</span>
                <input type="file" id="subCatImage" name="subCatImage" onChange={_handleSubCatImageUpload} accept="image/*" />
            </div>
            <div>
                <span>Description</span>
                <span><EditorContent editor={DescriptionEditor} /></span>
            </div>
            <div>
                {base64Image ? <img src={base64Image} /> : <p>No image available.</p>}
            </div>
            <div>
                {videos.length > 0 ? <>
                    {!isVisible ?
                        <button type="button"
                            onClick={() => setIsVisible(true)}
                        >Gestisci video</button> :
                        <VideoInput
                            videos={videos}
                            selectedVideos={selectedVideos}
                            CloseModal={() => setIsVisible(false)}
                            setSelectedVideos={setSelectedVideos}
                        />}
                </> : <>
                    <span>Nessun video disponibile</span>
                </>}
            </div>
            <div>Video aggiunti: {selectedVideos.length}</div>
            <div>
                <button type="button" onClick={() => _handleSaveSubCat()}>Salva</button>
            </div>
        </div>
    </>
};

const Edit = ({ closeModal, axios, onCategoryUpdated, category }) => {
    const [videos, setVideos] = useState([]);
    const [months, setMonths] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const subCatRef = useRef();
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [availableVideos, setAvailableVideos] = useState([]);

    const [base64Image, setBase64Image] = useState(null);
    const [base64SubCatImage, setBase64SubCatImage] = useState(null);


    const editorMain = useEditor({
        extensions: [StarterKit],
        content: category.Description,
        editable: true,
    });

    const subCatEdit = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });

    const MonthEdit = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });



    console.log(category);
    const [isMonth, setIsMonth] = useState(false);

    const removeSubCat = (subCat) => {
        setSubCats((prevSubCats) => prevSubCats.filter((s) => s !== subCat));
    };




    const addSubCat = () => {
        const subCatName = subCatRef.current.value.trim();
        const subCatDescription = subCatEdit.getHTML();
        const img = base64SubCatImage;
        if (!subCatName) {
            alert("Please enter a subCat name.");
            return;
        }
        const newSubCat = { Name: subCatName, Description: subCatDescription, Videos: selectedVideos, Image: img };
        console.log("New SubCat: ", newSubCat);
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
        setBase64Image(category.Image || null);
    }, [category]);



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
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`/api/categories/details/${category._id}`);
                setMonths(response.data.Months);
                setSubCats(response.data.SubCategories);
            } catch (err) {
                console.error("Failed to fetch category details:", err);
            }
        };
        fetchCategoryDetails();
    }, [axios]);


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
    const handlePutSubcatImage = (subCat, imageUrl) => {
        setSubCats((prevSubCats) =>
            prevSubCats.map((s) =>
                s === subCat
                    ? { ...s, Image: imageUrl }
                    : s
            )
        );
    }
    // Submit the main form
    const submitForm = async (e) => {
        e.preventDefault(); // Prevent default page reload
        const name = e.target.name.value.trim();
        const description = editorMain.getHTML();
        const img = base64Image;

        try {
            const updatedCategory = { name, description, months, subCats, img };
            console.log("Category before submitting: ", updatedCategory)

            const response = await axios.put(`/api/categories/${category._id}`, updatedCategory);
            onCategoryUpdated(response.data); // Notify parent about the new category
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };

    return (
        <div className={styles["edit-category"]}>
            <h1>Update {category.Name}</h1>
            <form onSubmit={submitForm}>
                <div className={styles["form-content"]}>
                    <div className={styles["edit-first-section"]}>
                        <div className={styles["name-edit"]}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required defaultValue={category.Name} />
                        </div>
                        <div className={styles["image-edit"]}>
                            <label className={styles["custom-file-button"]} onClick={() => document.getElementById("image").click()}>
                                Scegli immagine
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className={styles["description-edit"]}>
                            <label htmlFor="description">Description</label>
                            <EditorContent editor={editorMain} />
                        </div>
                        <div className={styles["image-preview"]}>
                            {base64Image ? <img src={base64Image} /> : <span>Nessuna immagine scelta</span>}
                        </div>
                    </div>
                    <div>
                        <button type="button" className={styles["switch-button"]} onClick={(e) => {
                            setIsMonth(!isMonth)
                            setSelectedVideos([]);
                            refreshVideosAvailable();
                        }}>{isMonth ? "Vai a Sottocategorie" : "Vai a Mesi"}</button>
                        {isMonth ? (
                            <MonthsInput index={months.length + 1} videos={availableVideos} setMonths={setMonths} />
                        ) : (
                            <SubCategoriesInput index={subCats.length + 1} videos={availableVideos} setSubCats={setSubCats} />
                        )}
                    </div>
                    <div className={styles["edit-second-section"]}>
                        <div className={styles["existing-section-month"]}>
                            {months.length > 0 ? (<>
                                {
                                    months.map((month, index) => (
                                        <MonthCard month={month} index={index} videos={availableVideos} setMonth={setMonths} />
                                    ))
                                }
                            </>
                            ) : (
                                <div className={styles["no-months"]}>
                                    <span>No months added yet</span>
                                </div>
                            )}
                        </div>
                        <div>
                            {subCats.length > 0 ? (
                                <div className={styles["existing-subCats"]}>
                                    {subCats.map((subCat, index) => (
                                        <SubCatCard subCat={subCat} index={index} videos={availableVideos} setSubCats={setSubCats} />
                                    ))}
                                </div>) : (<div>
                                    <p>No subCats added yet.</p>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className={styles["edit-modal-footer"]}>
                    <button type="button" className={styles["close-button"]} onClick={closeModal}>Annulla</button>
                    <button type="submit" className={styles["final-confirm"]}>Conferma</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
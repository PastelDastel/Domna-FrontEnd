import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Edit.module.css";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Edit({ closeModal, axios, onCategoryUpdated, category }) {
    useEffect(() => {
        //fetch category details
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`/api/categories/details/${category._id}`);
                setMainName(response.data.Name);
                setMainDescription(response.data.Description);
                setMainImage(response.data.Image);
                setMonths(response.data.Months);
                setSubCats(response.data.SubCategories);
                console.log("Category details fetched: ", response.data);
            } catch (error) {
                console.error("Failed to fetch category details:", error);
            }
        };
        fetchCategoryDetails();

    }, []);
    const [mainName, setMainName] = useState(category.Name);
    const [mainDescription, setMainDescription] = useState(category.Description);
    const [mainImage, setMainImage] = useState(category.Image);
    const [settingMonths, setSettingMonths] = useState(false);
    const [settingSubCats, setSettingSubCats] = useState(false);
    const [catMonths, setMonths] = useState(category.Months);
    const [catSubCats, setSubCats] = useState(category.SubCategories);


    const [editingMonthIndex, setEditingMonthIndex] = useState(null);
    const [editingSubcatId, setEditingSubcatId] = useState(null);



    const mainImageRef = useRef();
    const mainEditor = useEditor({
        extensions: [StarterKit],
        content: mainDescription,
        editable: true,
        onUpdate: ({ editor }) => {
            setMainDescription(editor.getHTML());
        },
    });

    const _mainImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setMainImage(event.target.result); // Set Base64 string in state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    const submitForm = async () => {
        try {
            const name = mainName;
            const description = mainDescription;
            const months = catMonths;
            const subCats = catSubCats;
            const updatedCategory = { name, description, months, subCats, img: mainImage };
            console.log("Category before submitting: ", updatedCategory);
            const response = await axios.put(`/api/categories/${category._id}`, updatedCategory);
            onCategoryUpdated(response.data); // Notify parent about the new category
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };
    console.log("Months: ", catMonths);
    return (
        <div className={styles["edit-modal-container"]}>
            <div>
                <h1>Modifica categoria</h1>
            </div>
            <div className={styles["edit-main-category"]}>
                <span className={styles["main-category-details"]}>
                    <span>
                        <p>Nome</p>
                        <input
                            type="text"
                            placeholder="Nome categoria"
                            value={mainName}
                            onChange={(e) => setMainName(e.target.value)}
                        />
                    </span>
                    <span>
                        <p>Descrizione</p>
                        <EditorContent editor={mainEditor} />
                    </span>
                </span>
                <span className={styles["main-category-image-container"]}>
                    <span className={styles["main-category-image"]}>
                        <img src={mainImage} alt="Immagine categoria" />
                    </span>
                    <span>
                        <button className={styles["custom-file-button"]} onClick={() => mainImageRef.current.click()}>
                            Cambia Immagine
                        </button>
                        <input
                            type="file"
                            onChange={_mainImageUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={mainImageRef}
                        />
                    </span>
                </span>
            </div>
            <div className={styles["edit-category-add-buttons"]}>
                <button onClick={() => {
                    setSettingMonths(true);
                    setSettingSubCats(false);
                }}>Aggiungi Mese</button>
                <button onClick={() => {
                    setSettingMonths(false);
                    setSettingSubCats(true);
                }}>Aggiungi Sottocategoria</button>
                {settingMonths && <SettingNewMonths setMonths={setMonths} close={() => {
                    setSettingMonths(false);
                    setSettingSubCats(false);
                }} monthIndex={catMonths.length + 1} axios={axios} />}
                {settingSubCats && <SettingNewSubCats setSubCats={setSubCats} close={() => {
                    setSettingMonths(false);
                    setSettingSubCats(false);
                }} axios={axios} />}
            </div>
            <div className={styles["existing-category-info"]}>
                <div className={styles["edit-category-months"]}>
                    {catMonths.length <= 0 ? (<>
                        <span>There are no months</span>
                    </>) : (
                        <>
                            {catMonths.map((month, index) => (
                                <div key={index} className={styles["edit-category-month-card"]}>
                                    <span>Mese {index + 1}</span>
                                    <span dangerouslySetInnerHTML={{ __html: month.Description }}></span>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setEditingMonthIndex(index);
                                            }}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            onClick={() => {
                                                setMonths((prevMonths) => prevMonths.filter((m) => m !== month));
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {editingMonthIndex === index && (
                                        <EditMonth
                                            month={month}
                                            setMonths={setMonths}
                                            close={() => setEditingMonthIndex(null)}
                                            axios={axios}
                                            indexMonth={index + 1}
                                        />
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className={styles["edit-category-subcats"]}>
                    {catSubCats.length <= 0 ? (<span>There are no subcategories</span>) : (
                        <>
                            {catSubCats.map((subCat, index) => (
                                <div key={index} className={styles["edit-category-subcat-card"]}>
                                    <span>{subCat.Name}</span>
                                    <span dangerouslySetInnerHTML={{ __html: subCat.Description }}></span>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setEditingSubcatId(subCat._id);
                                            }}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSubCats((prevSubCats) => prevSubCats.filter((s) => s !== subCat));
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {editingSubcatId === subCat._id && (
                                        <EditSubcat
                                            subCat={subCat}
                                            setSubCat={setSubCats}
                                            CloseModal={() => setEditingSubcatId(null)}
                                            axios={axios}
                                        />
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className={styles["footer-buttons-edit-category"]}>
                <button type="button" onClick={closeModal}>
                    Annulla
                </button>
                <button type="button" onClick={submitForm}>
                    Conferma
                </button>
            </div>
        </div>
    );
}

function SettingNewMonths({ setMonths, close, monthIndex, axios }) {
    const [name, setName] = useState("Mese " + monthIndex);
    const [description, setDescription] = useState("");
    const [videos, setVideos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const monthDescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description,
        editable: true,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, []);

    const handleNewMonth = () => {
        const newMonth = { Name: name, Description: description, Videos: selectedVideos };
        setMonths((prevMonths) => [...prevMonths, newMonth]);
        setName("");
        setDescription("");
        setSelectedVideos([]);
        close();
    }

    const handleVideoSelection = (video) => {
        setSelectedVideos((prev) => [...prev, video]);
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
    };

    const handleVideoDeselection = (video) => {
        setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id));
        setVideos((prev) => [...prev, video]);
    }



    return <div className={styles["setting-new-months"]}>
        <h1>Aggiungi Mese</h1>
        <div className={styles["setting-month-details"]}>
            <div>
                <span>Nome</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <span><p>Descrizione</p><EditorContent editor={monthDescriptionEditor} /></span>
            </div>
        </div>
        <div className={styles["setting-month-videos-container"]}>
            <div>
                <span>Video disponibili</span>
                <div className={styles["setting-month-videos"]}>
                    {videos.map((video) => (
                        <div key={video._id} className={styles["setting-video-item"]}>
                            <span>{video.Title}</span>
                            <button type="button" onClick={() => handleVideoSelection(video)}>Aggiungi</button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <span>Video selezionati</span>
                <div className={styles["setting-selected-videos"]}>
                    {selectedVideos.map((video) => (
                        <div key={video._id} className={styles["setting-video-item"]}>
                            <span>{video.Title}</span>
                            <button type="button" onClick={() => handleVideoDeselection(video)}>Rimuovi</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="setting-footer">
            <button type="button" onClick={close}>Chiudi</button>
            <button type="button" onClick={handleNewMonth}>Aggiungi</button>
        </div>
    </div>
}


function EditMonth({ month, setMonths, close, axios, indexMonth }) {
    const [description, setDescription] = useState(month.Description);
    const [videos, setVideos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState(month.Videos || []);

    // Editor per la descrizione del mese
    const monthDescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description,
        editable: true,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    useEffect(() => {
        setDescription(month.Description);
    }, [month.Description]);
    useEffect(() => {
        if (monthDescriptionEditor && description !== monthDescriptionEditor.getHTML()) {
            monthDescriptionEditor.commands.setContent(description);
        }
    }, [description, monthDescriptionEditor]);


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                const fetchedVideos = response.data;
                // Filtra i video già selezionati
                const availableVideos = fetchedVideos.filter(
                    (v) => !selectedVideos.some((s) => s._id === v._id)
                );

                setVideos(availableVideos);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, [selectedVideos, axios]);
    console.log("Selected videos in EditMonth: ", selectedVideos);
    console.log("Videos in EditMonth: ", videos);
    const handleVideoSelection = useCallback((video) => {
        setSelectedVideos((prev) => [...prev, video]);
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
    }, []);

    const handleVideoDeselection = useCallback((video) => {
        setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id));
        setVideos((prev) => [...prev, video]);
    }, []);

    const handleConfirm = () => {
        setMonths((prevMonths) =>
            prevMonths.map((m) =>
                m._id === month._id ? { ...m, Description: description, Videos: selectedVideos } : m
            )
        );
        close();
    };

    console.log("Selected videos in modal: ", selectedVideos);
    return (
        <div className={styles["edit-month-container"]}>
            <h1>Modifica Mese {indexMonth}</h1>
            <div className={styles["edit-month-details"]}>
                <div>
                    <span>Nome</span>
                    <input type="text" value={`Mese ${indexMonth}`} readOnly />
                </div>
                <div>
                    <span>Descrizione</span>
                    <EditorContent editor={monthDescriptionEditor} />
                </div>
            </div>
            <div className={styles["edit-month-videos-container"]}>
                <div>
                    <span>Video disponibili</span>
                    <div className={styles["edit-month-videos"]}>
                        {videos.map((video) => (
                            <div key={`available-${video._id}`} className={styles["edit-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoSelection(video)}>
                                    Aggiungi
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <span>Video selezionati</span>
                    <div className={styles["edit-selected-videos"]}>
                        {selectedVideos.map((video) => (
                            <div key={`selected-${video._id}`} className={styles["edit-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoDeselection(video)}>
                                    Rimuovi
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles["edit-month-footer"]}>
                <button type="button" onClick={close}>Annulla</button>
                <button type="button" onClick={handleConfirm}>Conferma</button>
            </div>
        </div>
    );
}

function SettingNewSubCats({ setSubCats, close, axios }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("Enter description here\n");
    const [videos, setVideos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [base64Image, setBase64Image] = useState(null);

    const subCatDescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description,
        editable: true,
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, []);


    const handleNewSubCat = () => {
        const newSubCat = { Name: name, Description: description, Videos: selectedVideos, Image: base64Image };
        setSubCats((prevSubCats) => [...prevSubCats, newSubCat]);
        setName("");
        setDescription("");
        setSelectedVideos([]);
        setBase64Image(null);
        close();
    };

    const handleVideoSelection = (video) => {
        setSelectedVideos((prev) => [...prev, video]);
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
    };

    const handleVideoDeselection = (video) => {
        setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id));
        setVideos((prev) => [...prev, video]);
    }


    return <>
        <div className={styles["setting-new-subcat-container"]}>
            <h1>Aggiungi Sottocategoria</h1>
            <div className={styles["setting-subcat-details"]}>
                <div>
                    <span>Nome</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <span>Descrizione</span>
                    <EditorContent editor={subCatDescriptionEditor} />
                </div>
                <div className={styles["setting-subcat-image"]}>
                    <div>
                        <img src={base64Image} alt="" />
                    </div>
                    <div>
                        <span>Immagine</span>
                        <label className={styles["custom-file-button"]} onClick={() => document.getElementById("subCatImage").click()}>
                            Scegli immagine
                        </label>
                        <input
                            type="file"
                            id="subCatImage"
                            name="subCatImage"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setBase64Image(event.target.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

            </div>
            <div className={styles["setting-subcat-videos-container"]}>
                <div>
                    <span>Video disponibili</span>
                    <div className={styles["setting-subcat-videos"]}>
                        {videos.map((video) => (
                            <div key={video._id} className={styles["setting-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoSelection(video)}>Aggiungi</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <span>Video selezionati</span>
                    <div className={styles["setting-selected-videos"]}>
                        {selectedVideos.map((video) => (
                            <div key={video._id} className={styles["setting-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoDeselection(video)}>Rimuovi</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className={styles["footer-setting-buttons"]}>
                <button type="button" onClick={close}>Chiudi</button>
                <button type="button" onClick={handleNewSubCat}>Conferma</button>
            </div>
        </div>
    </>
}

function EditSubcat({ subCat, setSubCat, CloseModal, axios }) {
    const [name, setName] = useState(subCat.Name);
    const [description, setDescription] = useState(subCat.Description.trim().length > 0 ? subCat.Description : "Enter description here\n");
    const [image, setImage] = useState(subCat.Image);
    const [videos, setVideos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState(subCat.Videos || []);

    const fileInputRef = useRef(null);

    const _handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log("Description: ", description);
    // Editor instance
    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: subCat.Description.trim().length > 0 ? subCat.Description : "Enter description here\n",
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML());
        },
    });

    // Sync description when subCat changes
    useEffect(() => {
        if (DescriptionEditor) {
            DescriptionEditor.commands.setContent(subCat.Description);
        }
    }, [subCat.Description, DescriptionEditor]);

    // Fetch videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("/api/videos");
                const fetchedVideos = response.data;
                // Remove already selected videos
                const availableVideos = fetchedVideos.filter(
                    (v) => !selectedVideos.some((s) => s._id === v._id)
                );
                setVideos(availableVideos);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, [axios]);

    // Add video only if not already selected
    const handleVideoSelection = (video) => {
        setSelectedVideos((prev) =>
            prev.some((v) => v._id === video._id) ? prev : [...prev, video]
        );
        setVideos((prev) => prev.filter((v) => v._id !== video._id));
    };

    // Remove video and return it to available videos
    const handleVideoDeselection = (video) => {
        setSelectedVideos((prev) => prev.filter((v) => v._id !== video._id));
        setVideos((prev) => [...prev, video]);
    };

    const handleConfirm = () => {
        setSubCat((prevSubCats) =>
            prevSubCats.map((cat) =>
                cat._id === subCat._id
                    ? { ...cat, Name: name, Description: description, Videos: selectedVideos, Image: image }
                    : cat
            )
        );
        CloseModal();
    };

    return (
        <div className={styles["edit-subcategory-container"]}>
            <h1>Edit SubCategory</h1>
            <div className={styles["edit-subcategory-details"]}>
                <div>
                    <span>Name</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <span>Description</span>
                    <EditorContent editor={DescriptionEditor} />
                </div>
                <div className={styles["edit-subcategory-image-container"]}>
                    <div className={styles["edit-subcategory-image"]}>
                        <img src={image} alt="Subcategory image" />
                    </div>
                    <div>
                        <span>Image</span>
                        <label className={styles["custom-file-button"]} onClick={() => fileInputRef.current.click()}>
                            Choose image
                        </label>
                        <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={_handleFileInput} />
                    </div>
                </div>
            </div>

            {/* Video selection */}
            <div className={styles["edit-subcategory-videos-container"]}>
                <div>
                    <span>Available Videos</span>
                    <div className={styles["edit-subcategory-videos"]}>
                        {videos.map((video) => (
                            <div key={`available-${video._id}`} className={styles["edit-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoSelection(video)}>Add</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <span>Selected Videos</span>
                    <div className={styles["edit-selected-videos"]}>
                        {selectedVideos.map((video) => (
                            <div key={`selected-${video._id}`} className={styles["edit-video-item"]}>
                                <span>{video.Title}</span>
                                <button type="button" onClick={() => handleVideoDeselection(video)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles["edit-subcategory-footer"]}>
                <button type="button" onClick={CloseModal}>Close</button>
                <button type="button" onClick={handleConfirm}>Save</button>
            </div>
        </div>
    );
}


/*

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
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [base64Image, setBase64Image] = useState(null);

    //ref dei vari input
    const nameRef = useRef();
    const imageRef = useRef();




    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: "Enter description here\n",
    });
    const [isVisible, setIsVisible] = useState(false);
    const _handleAddSubCat = () => {
        const description = DescriptionEditor.getHTML();
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

const EditSubcat = ({ subCat, setSubCat, CloseModal }) => {
    const [name, setName] = useState(subCat.Name || "");
    const [description, setDescription] = useState(subCat.Description || "");
    const [image, setImage] = useState(subCat.Image || "");

    const fileInputRef = useRef(null);

    const DescriptionEditor = useEditor({
        extensions: [StarterKit],
        content: description?.length > 0 ? description : "Enter description here\n",
    });

    useEffect(() => {
        if (DescriptionEditor && subCat.Description !== description) {
            DescriptionEditor.commands.setContent(subCat.Description);
        }
    }, [subCat.Description, DescriptionEditor]);

    const _handleSaveSubCat = () => {
        setDescription(DescriptionEditor.getHTML());
        const newSubCat = { ...subCat, Name: name, Description: description, Image: image };
        setSubCat(newSubCat);
        CloseModal();
    };

    const _handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles["edit-subCat-modal"]}>
            <h1>Modifica della categoria {subCat.Name}</h1>

            <div className={styles["edit-subCat-name"]}>
                <span>Nome</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={styles["edit-subCat-image"]}>
                <label
                    className={styles["custom-file-button"]}
                    onClick={() => fileInputRef.current.click()}
                >
                    Scegli immagine
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    name="subCatImage"
                    onChange={_handleChangeImage}
                    accept="image/*"
                    style={{ display: "none" }}
                />
            </div>

            <div className={styles["edit-subCat-description"]}>
                <span>Description</span>
                <EditorContent editor={DescriptionEditor} />
            </div>

            <div className={styles["edit-subCat-image-preview"]}>
                {image ? <img src={image} alt="Preview" /> : <p>No image available.</p>}
            </div>

            <div className={styles["edit-subCat-footer"]}>
                <button type="button" onClick={CloseModal}>Chiudi</button>
                <button type="button" onClick={_handleSaveSubCat}>Salva</button>
            </div>
        </div>
    );
};





const SubCatCard = ({ subCat, videos, setSubCats }) => {
    const [name, setName] = useState(subCat.Name);
    const [description, setDescription] = useState(subCat.Description || "Nessuna descrizione trovata");
    const [selectedVideos, setSelectedVideos] = useState(subCat.Videos);
    const [base64Image, setBase64Image] = useState(subCat.Image || null);
    const [isVisible, setIsVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const _handleSaveSubCat = (updatedSubCat) => {
        console.log("Updated SubCat: ", updatedSubCat);
        setDescription(updatedSubCat.Description);
        setName(updatedSubCat.Name);
        setBase64Image(updatedSubCat.Image);
        setSubCats((prevSubs) =>
            prevSubs.map((s) => (s._id === subCat._id ? updatedSubCat : s))
        );
    };

    const _handleRemoveSubCat = () => {
        setSubCats((prevSubs) => prevSubs.filter((s) => s._id !== subCat._id));
    };

    return (
        <>
            <div key={subCat._id} className={styles["existing-subCat-card"]}>
                <div className={styles["subCat-card-header"]}>
                    {base64Image ? <img src={base64Image} alt="Category" /> : <p>No image available.</p>}
                </div>
                <div className={styles["subCat-card-name"]}>
                    <span>Nome: </span> <span>{name}</span>
                </div>
                <div className={styles["subCat-card-description"]}>
                    <span>Description:</span>
                    {description ? (
                        <span dangerouslySetInnerHTML={{ __html: description }}></span>
                    ) : (
                        <span>No description available.</span>
                    )}
                </div>
                <div className={styles["subCat-card-videos"]}>
                    Video presenti: {selectedVideos.length}
                </div>

                <div>
                    {videos.length > 0 ? (
                        isVisible && (
                            <VideoInput
                                videos={videos}
                                selectedVideos={selectedVideos}
                                CloseModal={() => setIsVisible(false)}
                                setSelectedVideos={setSelectedVideos}
                            />
                        )
                    ) : (
                        <span>Nessun video disponibile</span>
                    )}
                </div>

                <div className={styles["subCat-card-footer"]}>
                    <button type="button" onClick={() => setIsEditVisible(true)}>Modifica</button>
                    <button type="button" onClick={() => setIsVisible(true)}>Video</button>
                    <button type="button" onClick={_handleRemoveSubCat}>Rimuovi</button>
                </div>
            </div>

            {isEditVisible && (
                <EditSubcat subCat={subCat} setSubCat={_handleSaveSubCat} CloseModal={() => setIsEditVisible(false)} />
            )}
        </>
    );
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
            setMonths((prevMonths) => prevMonths.filter((m) => m !== month));
        };
    }

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
                const response = await axios.get(`/api/categories/${category._id}`);
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
                    s === subCat ? { ...s, Image: imageUrl } : s
                )
            );
        };

        const submitForm = async (e) => {
            e.preventDefault();
            const img = base64Image;
            const description = editorMain.getHTML();
            const name = category.Name;

            try {
                const updatedCategory = { name, description, months, subCats, img };
                console.log("Category before submitting: ", updatedCategory);

                const response = await axios.put(`/api/categories/${category._id}`, updatedCategory);
                onCategoryUpdated(response.data); // Notify parent about the new category
                closeModal(); // Close the modal
            } catch (error) {
                console.error("Failed to update category:", error);
            }
        };

        return (
            <div className={styles["edit-category"]}>
                <h1>Update {category.Name}</h1>
                <form onSubmit={submitForm}>
                    <div className={styles["form-content"]}>
                        <div className={styles["edit-first-section"]}>
                            <label htmlFor="image" className={styles["custom-file-button"]} onClick={() => document.getElementById("image").click()}>
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
                            {base64Image && <img src={base64Image} alt="Category" />}
                        </div>
                        <div className={styles["description-edit"]}>
                            <label htmlFor="description">Description</label>
                            <EditorContent editor={editorMain} />
                        </div>
                        <button type="button" className={styles["switch-button"]} onClick={() => setIsMonth(!isMonth)}>
                            {isMonth ? "Vai a Sottocategorie" : "Vai a Mesi"}
                        </button>
                        {isMonth ? (
                            <MonthsInput index={months.length + 1} videos={availableVideos} setMonths={setMonths} />
                        ) : (
                            <SubCategoriesInput index={subCats.length + 1} videos={availableVideos} setSubCats={setSubCats} />
                        )}
                    </div>
                    <div className={styles["edit-second-section"]}>
                        <div className={styles["existing-section-month"]}>
                            {months.length > 0 ? (
                                <>
                                    {months.map((month, index) => (
                                        <MonthCard key={index} month={month} index={index} videos={availableVideos} setMonth={setMonths} />
                                    ))}
                                </>
                            ) : (
                                <div className={styles["no-months"]}>
                                    <span>No months added yet</span>
                                </div>
                            )}
                        </div>
                        <div className={styles["existing-section-subCat"]}>
                            {subCats.length > 0 ? (
                                <div className={styles["existing-subCats"]}>
                                    {subCats.map((subCat, index) => (
                                        <SubCatCard key={index} subCat={subCat} index={index} videos={availableVideos} setSubCats={setSubCats} />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p>No subCats added yet.</p>
                                </div>
                            )}
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

*/

import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./Lives.module.css"; // Assume there's a CSS module for styling
import Create from "./Create/Create";
import Overview from "./Overview/Overview";
import Edit from "./Edit/Edit";

const Lives = () => {
    const axios = useAxiosPrivate();
    const MySwal = withReactContent(Swal);
    const [lives, setLives] = useState([]);
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true);
    const linkRef = useRef(null);
    const [link, setLink] = useState("");
    const reloadLives = () => {
        setReload((prev) => !prev);
    };
    useEffect(() => {
        const fetchLives = async () => {
            try {
                const response = await axios.get("/api/recordings");
                setLives(response.data);
                setGlobalLoading(false);
            } catch (error) {
                console.error("Fetch lives error:", error);
                setGlobalLoading(false);
            }
        };
        const fetchLiveLink = async () => {
            try {
                const response = await axios.get("/api/streaming/streaming-link");
                setLink(response.data.live.Url);
            } catch (error) {
                console.error("Fetch live link error:", error);
            }
        };
        fetchLives();
        fetchLiveLink();
    }, [axios, reload]);

    const deleteLive = async (live) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${live.Date}</strong>?<br><em>You won't be able to revert this!</em>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/recordings/${live._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${live.Date} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadLives(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${live.Date}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                text: `${live.Date} didn't get deleted!`,
                icon: "info",
                confirmButtonColor: "#3085d6",
            });
        }
    }

    const createRecording = () => {
        MySwal.fire({
            html: (
                <Create onRecordingCreated={reloadLives} closeModal={() => Swal.close()} axios={axios} />
            ),
            showConfirmButton: false,
            allowOutsideClick: false,
        })
    }

    const viewRecording = async (live) => {
        MySwal.fire({
            html: <Overview recording={live} closeModal={() => Swal.close()} />,
            showConfirmButton: false,
            focusConfirm: false,
        });
    };

    const editRecording = async (live) => {
        MySwal.fire({
            html: <Edit axios={axios} closeModal={() => Swal.close()} onRecordingUpdated={reloadLives} recording={live} />,
            showConfirmButton: false,
        });
    };

    const updateLink = async () => {
        try {
            await axios.post("/api/streaming/streaming-link", { link: linkRef.current.value });
            Swal.fire({
                title: "Updated!",
                text: "Live link has been updated.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                willClose: () => setLink(linkRef.current.value),
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update live link. Please try again.",
                icon: "error",
                confirmButtonColor: "#3085d6",
            });
            console.error("Update link error:", error);
        }
    };

    return (
        <div className={style["recordings"]}>
            {globalLoading ? (
                <div className={style["loading-screen"]}>
                    <div className={style["spinner"]}></div>
                    <p>Loading lives...</p>
                </div>) : (
                <>
                    <div className={style["header-container"]}>

                        <div className={style["header"]}>
                            <h1>Lives</h1>
                            <button onClick={createRecording} className={style["button-create"]}>
                                Create new Recording
                            </button>
                        </div>
                    </div>

                    <div className={style["card-container-recordings"]}>
                        {lives.map((live) => {
                            const date = new Date(live.Date);
                            const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                            return (
                                <div key={live._id} className={style["card"]}>
                                    <div className={style["card-header"]}>{live.Name}</div>
                                    <div className={style["card-body"]}>
                                        <p><strong>ID:</strong> {live._id}</p>
                                        <p><strong>URL:</strong> {live.Url}</p>
                                        <p><strong>Date:</strong> {displayDate}</p>
                                    </div>
                                    <div className={style["card-footer"]}>
                                        <button onClick={() => viewRecording(live)} className={style["button-view"]}>View</button>
                                        <button onClick={() => editRecording(live)} className={style["button-edit"]}>Edit</button>
                                        <button onClick={() => deleteLive(live)} className={style["button-delete"]}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Lives;
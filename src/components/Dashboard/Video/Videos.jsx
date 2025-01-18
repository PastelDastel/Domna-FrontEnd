import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./Videos.module.css"; // Assume there's a CSS module for styling
import Create from "./Create/Create";
import Overview from "./Overview/Overview";
import Edit from "./Edit/Edit";
const Videos = () => {
    const axios = useAxiosPrivate();
    const MySwal = withReactContent(Swal);

    const [videos, setVideos] = useState([]);
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true);

    const reloadVideos = () => {
        setReload((prev) => !prev);
    };

    const deleteVideo = async (video) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${video.Title}</strong>?<br><em>You won't be able to revert this!</em>`,
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
                await axios.delete(`/api/videos/${video._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${video.Title} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadVideos(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${video.Title}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                text: `${video.Title} didn't get deleted!`,
                icon: "info",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    const viewVideo = async (video) => {
        MySwal.fire({
            html: <Overview video={video} closeModal={() => Swal.close()}
            />,
            showConfirmButton: false,
            focusConfirm: false,

        });
    };

    const editVideo = async (video) => {
        MySwal.fire({
            html: <Edit axios={axios} closeModal={() => Swal.close()} onVideoUpdated={reloadVideos} video={video} />,
            showConfirmButton: false,
        });
    };




    const createVideo = () => {
        MySwal.fire({
            html: (
                <Create
                    onVideoCreated={reloadVideos}
                    closeModal={() => Swal.close()}
                    axios={axios}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    useEffect(() => {
        const fetchVideos = async () => {
            setGlobalLoading(true);
            try {
                const response = await axios.get("/api/videos");
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            } finally {
                setGlobalLoading(false);
            }
        };
        fetchVideos();
    }, [axios, reload]);
    console.log(videos);
    return (
        <div className={style.videos}>
            {globalLoading ? (
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                    <p>Loading videos...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Videos</h1>
                        <button onClick={createVideo} className={style.createButton}>
                            Create new Video
                        </button>
                    </div>
                    <div className={style["card-container-videos"]}>
                        {videos.map((video) => (
                            <div key={video._id} className={style.card}>
                                <div className={style["card-header"]}>{video.Title}</div>
                                <div className={style["card-body"]}>
                                    <p><strong>ID:</strong> {video._id}</p>
                                    <p><strong>Description:</strong> {video.Description}</p>
                                </div>
                                <div className={style["card-footer"]}>
                                    <button
                                        onClick={() => viewVideo(video)}
                                        className={style["view-button"]}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editVideo(video)}
                                        className={style["edit-button"]}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteVideo(video)}
                                        className={style["delete-button"]}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Videos;

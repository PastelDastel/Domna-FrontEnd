import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./Videos.module.css"; // Assume there's a CSS module for styling

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
            title: `<strong>Video Details</strong>`,
            html: `
                <div>
                <h3>${video.Title}</h3>
                <p>${video.Description}</p>
                <p>${video.Url}</p>
                <h5>${video._id}</h5>
                </div>
            `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Close",
        });
    };

    const editVideo = async (video) => {
        MySwal.fire({
            title: `<strong>Edit Video</strong>`,
            html: `
                <div>
                    <input
                        id="video-title"
                        class="swal2-input"
                        placeholder="Title"
                        value="${video.Title}"
                    />
                    <textarea
                        id="video-description"
                        class="swal2-textarea"
                        placeholder="Description"
                    >${video.Description}</textarea>
                    <input
                        id="video-url"
                        class="swal2-input"
                        placeholder="Video URL"
                        value="${video.Url}"
                    />
                </div>
            `,
            preConfirm: async () => {
                const title = document.getElementById("video-title").value;
                const description = document.getElementById("video-description").value;
                const url = document.getElementById("video-url").value;
                if (!title || !description) {
                    Swal.showValidationMessage("Both fields are required.");
                    return false;
                }

                try {
                    await axios.put(`/api/videos/${video._id}`, { Title: title, Description: description, Url: url });
                    reloadVideos();
                    return true;
                } catch (error) {
                    console.error("Error updating video:", error);
                    Swal.showValidationMessage("Failed to update the video. Please try again.");
                    return false;
                }
            },
        });
    };

    const createVideo = () => {
        MySwal.fire({
            title: `<strong>Create Video</strong>`,
            html: `
                <div>
                    <input id="new-video-title" class="swal2-input" placeholder="Title" />
                    <textarea id="new-video-description" class="swal2-textarea" placeholder="Description"></textarea>
                    <input id="new-video-url" class="swal2-input" placeholder="Video URL" />
                </div>
            `,
            preConfirm: async () => {
                const title = document.getElementById("new-video-title").value;
                const description = document.getElementById("new-video-description").value;
                const url = document.getElementById("new-video-url").value;

                if (!title || !url) {
                    Swal.showValidationMessage("Both fields are required.");
                    return false;
                }

                try {
                    await axios.post("/api/videos", { Title: title, Description: description, Url: url });
                    reloadVideos();
                    return true;
                } catch (error) {
                    console.error("Error creating video:", error);
                    Swal.showValidationMessage("Failed to create the video. Please try again.");
                    return false;
                }
            },
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
                    <div className={style.videosList}>
                        {videos.map((video) => (
                            <div key={video._id} className={style.video}>
                                <div className={style.header}>{video.Title}</div>
                                <div className={style.main}>
                                    <div>ID: {video._id}</div>
                                    <div>Description: {video.Description}</div>
                                </div>
                                <div className={style.footer}>
                                    <button
                                        onClick={() => viewVideo(video)}
                                        className={style.footerButton}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editVideo(video)}
                                        className={style.footerButton}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteVideo(video)}
                                        className={style.footerButton}
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

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./Users.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Overview from "./Overview/OverviewModal";
import CreateModal from "./Create/CreateModal";
import EditModal from "./Edit/EditModal";

const Users = () => {
    const MySwal = withReactContent(Swal);
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true); // General loading state
    const axiosPrivate = useAxiosPrivate();

    const deleteUser = async (user) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${user.username}</strong>?<br><em>You won't be able to revert this!</em>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true, // Swaps the position of Cancel and Confirm
        });

        if (result.isConfirmed) {
            try {
                // Call your delete function here
                await axiosPrivate.delete(`/api/users/${user._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${user.username} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadUsers(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${user.username}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                text: `${user.username} didn't get deleted!`,
                icon: "info",
                confirmButtonColor: "#3085d6",
            });
        }


    };





    const reloadUsers = () => {
        setReload((prev) => !prev);
    };

    const viewUser = async (user) => {
        const controller = new AbortController();
        const signal = controller.signal;

        MySwal.fire({
            title: `<div class="${style.modalTitle}">Fetching Data</div>`,
            html: `
                <div class="${style.modalContent}">
                    <div class="${style.spinner}"></div>
                    <p class="${style.modalText}">Fetching user details...</p>
                    <button id="cancel-button" class="${style.cancelButton}">Cancel</button>
                </div>
            `,
            didOpen: () => {
                document
                    .getElementById("cancel-button")
                    .addEventListener("click", () => {
                        controller.abort();
                        Swal.close();
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
            showConfirmButton: false,
            allowEscapeKey: true,
            willClose: () => controller.abort(),
        });

        try {
            const response = await axiosPrivate.get(`/api/users/${user._id}/courses`, { signal });
            const courses = response.data;
            const fetchTrackedData = await axiosPrivate.get(`/api/video`, { signal });
            const trackedData = fetchTrackedData.data;
            console.log("trackedData in general users", trackedData);
            MySwal.fire({
                html: (
                    <Overview
                        closeModal={() => Swal.close()}
                        user={user}
                        courses={courses}
                        trackData={trackedData}
                    />
                ),
                showConfirmButton: false,
                allowOutsideClick: true,
            });
        } catch (err) {
            if (err.name === "CanceledError") {
                console.log("Fetch operation was cancelled");
            } else {
                console.error("Error fetching user courses:", err);
                Swal.fire("Error", "Failed to fetch user data", "error");
            }
        }
    };


    const editUser = async (user) => {
        const controller = new AbortController();
        const signal = controller.signal;

        MySwal.fire({
            title: `<div class="${style.modalTitle}">Fetching Data</div>`,
            html: `
                <div class="${style.modalContent}">
                    <div class="${style.spinner}"></div>
                    <p class="${style.modalText}">Fetching user details</p>
                    <button id="cancel-button" class="${style.cancelButton}">Cancel</button>
                </div>
            `,
            didOpen: () => {
                document
                    .getElementById("cancel-button")
                    .addEventListener("click", () => {
                        controller.abort();
                        Swal.close();
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
            showConfirmButton: false,
            allowEscapeKey: true,
            willClose: () => controller.abort(),
        });

        try {
            const response = await axiosPrivate.get(`/api/users/${user._id}/courses`, { signal });
            const courses = response.data;

            MySwal.fire({
                width: "80vw",
                html: (
                    <EditModal
                        closeModal={() => Swal.close()}
                        user={user}
                        courses={courses}
                        axios={axiosPrivate}
                        onUserUpdated={reloadUsers}
                    />
                ),
                showConfirmButton: false,
                allowOutsideClick: true,
            });
        } catch (err) {
            if (err.name === "CanceledError") {
                console.log("Fetch operation was cancelled");
            } else {
                console.error("Error fetching user courses:", err);
                Swal.fire("Error", "Failed to fetch user data", "error");
            }
        }
    };
    const createUser = () => {
        MySwal.fire({
            width: "50vw",
            html: (
                <CreateModal
                    onUserCreated={reloadUsers}
                    closeModal={() => Swal.close()}
                    axios={axiosPrivate}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
            willClose: () => {
                reloadUsers();
            }
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setGlobalLoading(true); // Show global loading spinner
            try {
                const response = await axiosPrivate.get("/api/users");
                console.log("Users:", response.data);
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setGlobalLoading(false); // Hide global loading spinner
            }
        };
        fetchUsers();
    }, [axiosPrivate, reload]);

    return (
        <div className={style.users}>
            {globalLoading ? ( // Global loading screen
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                    <p>Caricamento in corso...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Utenti</h1>
                        <button
                            onClick={createUser}
                            className={style.createButton}
                        >
                            Crea nuovo utente
                        </button>
                    </div>
                    <div className={style["card-container-users"]}>
                        {users.map((user) => (
                            <div key={user._id} className={style["card"]}>
                                <div className={style["card-header"]}>{user.username}</div>
                                <div className={style["card-body"]}>
                                    <p><strong>Id:</strong> {user._id}</p>
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Online: {user.IsOnline ? "Yes" : "No"}</strong></p>
                                    {user.LastSeen && <p><strong>LastSeen: {new Date(user.LastSeen).toLocaleString("it-IT")}</strong></p>}
                                </div>
                                <div className={style["card-footer"]}>
                                    <button
                                        onClick={() => viewUser(user)}
                                        className={style["view-button"]}
                                    >
                                        Dettagli
                                    </button>
                                    <button
                                        onClick={() => editUser(user)}
                                        className={style["edit-button"]}
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user)}
                                        className={style["delete-button"]}
                                    >
                                        Elimina
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

export default Users;

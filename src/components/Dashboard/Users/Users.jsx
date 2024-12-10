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

    const getUserCourses = async (userId) => {
        try {
            const response = await axiosPrivate.get(`/api/users/${userId}/courses`);
            return response.data;
        } catch (err) {
            console.error("Error fetching user courses:", err);
            return [];
        }
    };

    const reloadUsers = () => {
        setReload((prev) => !prev);
    };

    const viewUser = async (user) => {
        MySwal.fire({
            title: "Loading...",
            html: '<p>Fetching user details...</p>',
            showConfirmButton: true,
            confirmButtonText: "Close",
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: true,
        });

        const courses = await getUserCourses(user._id);

        MySwal.fire({
            title: "User Overview",
            html: (
                <Overview
                    closeModal={() => Swal.close()}
                    user={user}
                    courses={courses}
                />
            ),
            showConfirmButton: false,
        });
    };

    const editUser = async (user) => {
        MySwal.fire({
            title: "Loading...",
            html: '<p>Fetching user details...</p>',
            showConfirmButton: true,
            confirmButtonText: "Close",
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: true,
        });

        const courses = await getUserCourses(user._id);

        MySwal.fire({
            html: (
                <EditModal
                    closeModal={() => Swal.close()}
                    user={user}
                    courses={courses}
                />
            ),
            showConfirmButton: false,
        });
    };

    const createUser = () => {
        MySwal.fire({
            html: (
                <CreateModal
                    closeModal={() => Swal.close()}
                />
            ),
            showConfirmButton: false,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setGlobalLoading(true); // Show global loading spinner
            try {
                const response = await axiosPrivate.get("/api/users");
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
                    <p>Loading users...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Users</h1>
                        <button
                            onClick={createUser}
                            className={style.createButton}
                        >
                            Create new User
                        </button>
                    </div>
                    <div className={style.usersList}>
                        {users.map((user) => (
                            <div key={user._id} className={style.user}>
                                <div className={style.header}>{user.username}</div>
                                <div className={style.main}>
                                    <div>Id: {user._id}</div>
                                    <div>Username: {user.username}</div>
                                    <div>Email: {user.email}</div>
                                </div>
                                <div className={style.footer}>
                                    <button
                                        onClick={() => viewUser(user)}
                                        className={style.footerButton}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editUser(user)}
                                        className={style.footerButton}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => reloadUsers()}
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

export default Users;

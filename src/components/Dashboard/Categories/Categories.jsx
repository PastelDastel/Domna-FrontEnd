import { useState, useEffect } from "react";
import style from "./Categories.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Overview from "./Overview/Overview";
import CreateModal from "./Create/Create";
import EditModal from "./Edit/Edit";

const Categories = () => {
    const MySwal = withReactContent(Swal);
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const reloadCategories = () => {
        setReload((prev) => !prev);
    };
    const viewCategory = async (category) => {
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
            const response = await axiosPrivate.get(`/api/categories/${category._id}/details`, { signal });
            const details = response.data;
            MySwal.fire({
                width: "80vw",
                html: (
                    <Overview
                        closeModal={() => Swal.close()}
                        category={category}
                        videos={details.Videos}
                        axiosPrivate={axiosPrivate}
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
    const editCategory = async (category) => {
        MySwal.fire({
            width: "50vw",
            html: (
                <EditModal
                    closeModal={() => Swal.close()}
                    category={category}
                    axios={axiosPrivate}
                    onCategoryUpdated={reloadCategories}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    const createCategory = () => {
        MySwal.fire({
            width: "80vw",
            html: (
                <CreateModal
                    onCategoryCreated={reloadCategories}
                    closeModal={() => Swal.close()}
                    axios={axiosPrivate}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    const deleteCategory = async (category) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${category.Name}</strong>?<br><em>You won't be able to revert this!</em>`,
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
                await axiosPrivate.delete(`/api/categories/${category._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${category.Name} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadCategories(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${category.Name}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setGlobalLoading(true);
            try {
                const response = await axiosPrivate.get("/api/categories");
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            } finally {
                setGlobalLoading(false);
            }
        };
        fetchCategories();
    }, [axiosPrivate, reload]);
    console.log(categories);
    return (<>
        {
            globalLoading ? (
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                    <p>Loading categories...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Categories</h1>
                        <button onClick={createCategory}>Create Category</button>
                    </div>
                    <div className={style.categories}>
                        {categories.map((category) => (
                            <div key={category._id} className={style.category}>
                                <div className={style.header}>{category.Name}</div>
                                <div className={style.main}>
                                    <div>Id: {category._id}</div>
                                    <div>Name: {category.Name}</div>
                                    <div>{category.Description ? "Description: " + category.Description : "No description provided"}</div>
                                </div>
                                <div className={style.footer}>
                                    <button
                                        onClick={() => viewCategory(category)}
                                        className={style.footerButton}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editCategory(category)}
                                        className={style.footerButton}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className={style.footerButton}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    </>);
};

export default Categories;
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
        MySwal.fire({
            width: "80vw",
            html: (
                <Overview
                    closeModal={() => Swal.close()}
                    category={category}
                    axios={axiosPrivate}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });

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
            width: "60vw",
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
    return (<div className={style.categories}>
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
                        <button onClick={createCategory} className={style.createButton}>Create Category</button>
                    </div>
                    <div className={style["card-container-categories"]}>
                        {categories.map((category) => (
                            <div key={category._id} className={style["card"]}>
                                <div className={style["card-header"]}>{category.Name}</div>
                                <div className={style["card-body"]}>
                                    <p><strong>Id:</strong> {category._id}</p>
                                    <p><strong>Name:</strong> {category.Name}</p>
                                    <p><strong>Description:</strong> {category.Description ? category.Description : "No description provided"}</p>
                                </div>
                                <div className={style["card-footer"]}>
                                    <button
                                        onClick={() => viewCategory(category)}
                                        className={style["view-button"]}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editCategory(category)}
                                        className={style["edit-button"]}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className={style["delete-button"]}
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
    </div>);
};

export default Categories;
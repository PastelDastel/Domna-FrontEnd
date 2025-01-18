import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./Benefits.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Overview from "./Overview/Overview";
import CreateModal from "./Create/Create";
import EditModal from "./Edit/Edit";

const Benefits = () => {
    const MySwal = withReactContent(Swal);
    const [benefits, setBenefits] = useState([]); // List of benefits
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true); // General loading state
    const axiosPrivate = useAxiosPrivate();

    const deleteBenefit = async (benefit) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${benefit.Name}</strong>?<br><em>You won't be able to revert this!</em>`,
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
                await axiosPrivate.delete(`/api/benefits/${benefit._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${benefit.Name} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadBenefits(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${benefit.Name}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        }
    };

    const reloadBenefits = () => {
        setReload((prev) => !prev);
    };

    const viewBenefit = async (benefit) => {
        const controller = new AbortController();

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
            MySwal.fire({
                width: "80vw",
                html: (

                    <Overview
                        closeModal={() => Swal.close()}
                        benefit={benefit}
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

    const editBenefit = async (benefit) => {
        MySwal.fire({
            width: "80vw",
            html: (
                <EditModal
                    closeModal={() => Swal.close()}
                    benefit={benefit}
                    axios={axiosPrivate}
                    onBenefitUpdated={reloadBenefits}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    const createBenefit = () => {
        MySwal.fire({
            width: "80vw",
            html: (
                <CreateModal
                    onBenefitUpdated={reloadBenefits}
                    closeModal={() => Swal.close()}
                    axiosPrivate={axiosPrivate}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            setGlobalLoading(true);
            try {
                const response = await axiosPrivate.get("/api/benefits"); // Fetch courses
                setBenefits(response.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            } finally {
                setGlobalLoading(false);
            }
        };
        fetchCourses();
    }, [axiosPrivate, reload]);
    console.log(benefits);
    return (
        <div className={style.benefits}>
            {globalLoading ? (
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                    <p>Loading benefits...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Benefits</h1>
                        <button onClick={createBenefit} className={style.createButton}>
                            Create New Benefit
                        </button>
                    </div>
                    <div className={style["card-container-benefits"]}>
                        {benefits.map((benefit) => (
                            <div key={benefit._id} className={style["card"]}>
                                <div className={style["card-header"]}>{benefit.Name}</div>
                                <div className={style["card-body"]}>
                                    <p><strong>Id:</strong> {benefit._id}</p>
                                    <p><strong>Name:</strong> {benefit.Name}</p>
                                    <p><strong>Description:</strong>{benefit.Description ? benefit.Description : "No description provided"}</p>
                                </div>
                                <div className={style["card-footer"]}>
                                    <button
                                        onClick={() => viewBenefit(benefit)}
                                        className={style["view-button"]}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editBenefit(benefit)}
                                        className={style["edit-button"]}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteBenefit(benefit)}
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

export default Benefits;

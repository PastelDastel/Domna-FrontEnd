import style from "./Overview.module.css";
import { useEffect, useState } from "react";

const OverviewModal = ({ closeModal, benefit, axiosPrivate }) => {
    return (
        <>
            <h1>YOLO</h1>
            <h2>{benefit.Name}</h2>
            {benefit.Description && <p>{benefit.Description}</p>}
            <button onClick={closeModal}>Close</button>
        </>
    )
};

export default OverviewModal;
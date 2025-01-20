import style from "./Overview.module.css";
import { useEffect, useState } from "react";

const OverviewModal = ({ closeModal, benefit }) => {
    return (
        <>
            <h1>{benefit.Name}</h1>
            {benefit.Description && <p 
                dangerouslySetInnerHTML={{ __html: benefit.Description }}
            ></p>}
            <button onClick={closeModal}>Close</button>
        </>
    )
};

export default OverviewModal;
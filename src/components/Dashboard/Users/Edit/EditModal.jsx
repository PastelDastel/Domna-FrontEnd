import style from "./EditModal.module.css";

const EditModal = ({ closeModal }) => {
    return (
        <div className={style.container}>
            <h1>Edit User</h1>
            <button onClick={closeModal} className={style.closeButton}>
                Close
            </button>
        </div>
    );
};

export default EditModal;
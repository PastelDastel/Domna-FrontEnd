import style from "./CreateModal.module.css";

const CreateModal = ({ closeModal }) => {
    return (
        <div className={style.container}>
            <h1>Create User</h1>
            <button onClick={closeModal} className={style.closeButton}>
                Close
            </button>
        </div>
    );
};

export default CreateModal;
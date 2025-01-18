import style from "./Create.module.css";



const Create = ({ closeModal, axios, onVideoCreated }) => {

    const createVideo = async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const url = document.getElementById("url").value;
        if (!title || !url) {
            alert("Title, URL, and Category are required.");
            return;
        }
        try {
            const res = await axios.post("/api/videos", {
                Title: title,
                Description: description,
                Url: url,
            });
            console.log("Created video:", res.data);
            onVideoCreated(res.data); // Reload videos after a successful creation
            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error creating video:", error);
        }
    };





    return (
        <div className={style.createVideo}>
            <h1>Create Video</h1>
            <form onSubmit={createVideo}>
                <div className={style.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div className={style.inputGroup}>

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>
                <div className={style.inputGroup}>

                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="url" required />
                </div>
                <div className={style.buttonGroup}>
                    <button type="button" onClick={closeModal}>Close</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
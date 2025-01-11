



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
        <div>
            <h1>Create Video</h1>
            <form onSubmit={createVideo}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="url" required />
                </div>
                <button type="submit">Create Video</button>
            </form>
        </div>
    );
};

export default Create;
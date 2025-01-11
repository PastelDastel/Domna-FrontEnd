const Create = () => {
    return (
        <div>
            <h1>Create Video</h1>
            <form>
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
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" required />
                </div>
                <button type="submit">Create Video</button>
            </form>
        </div>
    );
};

export default Create;
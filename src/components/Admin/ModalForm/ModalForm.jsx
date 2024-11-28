import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./ModalForm.module.css"; // Import the CSS module

const ModalForm = ({
  view,
  selectedItem,
  setSelectedItem,
  setShowModal,
  isAdding,
  setData,
  data,
  auth,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [formState, setFormState] = useState(selectedItem || {});
  const [benefitInput, setBenefitInput] = useState("");
  const [excludedBenefitInput, setExcludedBenefitInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [videoInputs, setVideoInputs] = useState({}); // Object to track video inputs for each category

  useEffect(() => {
    setFormState(selectedItem || {});
    setVideoInputs({}); // Reset videoInputs when the modal opens with a new item
  }, [selectedItem]);

  const isValidYouTubeURL = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToList = (value, listName) => {
    if (!value.trim()) return;
    setFormState((prev) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), value.trim()],
    }));
  };

  const handleRemoveFromList = (index, listName) => {
    setFormState((prev) => ({
      ...prev,
      [listName]: (prev[listName] || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddCategory = () => {
    if (!categoryInput.trim()) return;
    setFormState((prev) => ({
      ...prev,
      categories: [
        ...(prev.categories || []),
        { name: categoryInput.trim(), videos: [] },
      ],
    }));
    setCategoryInput("");
  };

  const handleVideoInputChange = (value, categoryIndex) => {
    setVideoInputs((prev) => ({
      ...prev,
      [categoryIndex]: value, // Update video input for the specific category
    }));
  };

  const handleAddVideoToCategory = (categoryIndex) => {
    const videoInput = videoInputs[categoryIndex] || "";
    if (!isValidYouTubeURL(videoInput)) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    setFormState((prev) => {
      const updatedCategories = [...(prev.categories || [])];
      updatedCategories[categoryIndex].videos = [
        ...(updatedCategories[categoryIndex].videos || []),
        videoInput.trim(),
      ];
      return { ...prev, categories: updatedCategories };
    });
    setVideoInputs((prev) => ({
      ...prev,
      [categoryIndex]: "", // Clear the input for this category
    }));
  };

  const handleRemoveVideoFromCategory = (categoryIndex, videoIndex) => {
    setFormState((prev) => {
      const updatedCategories = [...(prev.categories || [])];
      updatedCategories[categoryIndex].videos = updatedCategories[
        categoryIndex
      ].videos.filter((_, i) => i !== videoIndex);
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSaveChanges = async () => {
    try {
      const itemData = { ...formState, CreatedBy: auth.id };

      if (isAdding) {
        const response = await axiosPrivate.post(`/api/${view}`, itemData);
        setData([...data, response.data]);
      } else {
        await axiosPrivate.put(`/api/${view}/${selectedItem._id}`, itemData);
        setData(
          data.map((item) =>
            item._id === selectedItem._id ? { ...item, ...itemData } : item
          )
        );
      }

      setSelectedItem(null);
      setShowModal(false);
      alert(
        `${
          view === "courses" ? "Course" : view === "users" ? "User" : "Blog"
        } ${isAdding ? "added" : "modified"} successfully!`
      );
    } catch (err) {
      console.error(`Error ${isAdding ? "adding" : "modifying"} ${view}:`, err);
      alert(
        err.response?.data?.message ||
          `Failed to ${isAdding ? "add" : "modify"} ${view}`
      );
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setShowModal(false);
  };  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2 className={style.header}>
          {isAdding ? "Add New" : "Modify"}{" "}
          {view === "courses" ? "Course" : view === "users" ? "User" : "Blog"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveChanges();
          }}
        >
          {view === "courses" && (
            <>
              <label className={style.label}>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formState.title || ""}
                  onChange={(e) => handleInputChange(e)}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Description:
                <input
                  type="text"
                  name="description"
                  value={formState.description || ""}
                  onChange={(e) => handleInputChange(e)}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Instructor:
                <input
                  type="text"
                  name="instructor"
                  value={formState.instructor || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Duration:
                <select
                  name="duration"
                  value={formState.duration || ""}
                  onChange={handleInputChange}
                  className={style.input}
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="monthly">Monthly</option>
                  <option value="3 months">3 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="1 year">1 Year</option>
                </select>
              </label>
              <label className={style.label}>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formState.price || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Stripe Price Id:
                <input
                  type="text"
                  name="stripePriceId"
                  value={formState.stripePriceId || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Section:
                <input
                  type="text"
                  name="section"
                  value={formState.section || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Benefits:
                <input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddToList(benefitInput, "benefits");
                      setBenefitInput("");
                    }
                  }}
                  className={style.input}
                  placeholder="Type a benefit and press Enter"
                />
                <div className={style.flexContainer}>
                  {(formState.benefits || []).map((benefit, index) => (
                    <span key={index} className={style.benefit}>
                      {benefit}
                      <button
                        type="button"
                        className={style.deleteButton}
                        onClick={() => handleRemoveFromList(index, "benefits")}
                      >
                        Remove
                      </button>
                    </span>
                  ))}
                </div>
              </label>
              <label className={style.label}>
                Excluded Benefits:
                <input
                  type="text"
                  value={excludedBenefitInput}
                  onChange={(e) => setExcludedBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddToList(excludedBenefitInput, "excluded_benefits");
                      setExcludedBenefitInput("");
                    }
                  }}
                  className={style.input}
                  placeholder="Type an excluded benefit and press Enter"
                />
                <div className={style.flexContainer}>
                  {(formState.excluded_benefits || []).map((excluded, index) => (
                    <span key={index} className={style.excludedBenefit}>
                      {excluded}
                      <button
                        type="button"
                        className={style.deleteButton}
                        onClick={() => handleRemoveFromList(index, "excluded_benefits")}
                      >
                        Remove
                      </button>
                    </span>
                  ))}
                </div>
              </label>
              <label className={style.label}>
                Categories:
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  placeholder="Category name"
                  className={style.input}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className={style.addButton}
                >
                  Add Category
                </button>
                {(formState.categories || []).map((category, index) => (
                  <div key={index}>
                    <h4>{category.name}</h4>
                    <input
                      type="text"
                      value={videoInputs[index] || ""}
                      onChange={(e) =>
                        handleVideoInputChange(e.target.value, index)
                      }
                      placeholder="YouTube Video URL"
                      className={style.input}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddVideoToCategory(index)}
                      className={style.addButton}
                    >
                      Add Video
                    </button>
                    <ul>
                      {(category.videos || []).map((video, videoIndex) => (
                        <li key={videoIndex}>
                          {video}{" "}
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveVideoFromCategory(index, videoIndex)
                            }
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </label>
            </>
          )}
          {view === "users" && (
            <>
              <label className={style.label}>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formState.username || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formState.email || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formState.phone || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
            </>
          )}
          {view === "blog" && (
            <>
              <label className={style.label}>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formState.title || ""}
                  onChange={handleInputChange}
                  className={style.input}
                />
              </label>
              <label className={style.label}>
                Content:
                <textarea
                  name="content"
                  value={formState.content || ""}
                  onChange={handleInputChange}
                  className={style.textarea}
                />
              </label>
            </>
          )}
          <div className={style.buttonContainer}>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className={style.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={style.saveButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;

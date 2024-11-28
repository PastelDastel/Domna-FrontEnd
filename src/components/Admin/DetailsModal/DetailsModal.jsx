import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import style from "./DetailsModal.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faList } from "@fortawesome/free-solid-svg-icons"; // Example icons

const DetailsModal = ({ item, view, setShowDetailsModal }) => {
  const axiosPrivate = useAxiosPrivate();
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item || !item._id) {
      setLoading(false);
      return;
    }

    const fetchRelatedData = async () => {
      try {
        if (view === "users") {
          const response = await axiosPrivate.get(`/api/users/${item._id}/courses`);
          setRelatedData(response.data);
        } else if (view === "courses") {
          const response = await axiosPrivate.get(`/api/courses/${item._id}/users`);
          setRelatedData(response.data);
        }
      } catch (err) {
        console.error("Error fetching related data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedData();
  }, [item, view, axiosPrivate]);

  if (!item) {
    return null; // Render nothing if item is not defined
  }

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <header className={style.header}>
          <h2>{view === "users" ? "User Information" : "Course Information"}</h2>
          <button onClick={() => setShowDetailsModal(false)} className={style.closeButton}>
            &times;
          </button>
        </header>
        <section className={style.content}>
          {view === "users" ? (
            <>

            </>
          ) : (
            <>
              <div className={style.infoRow}>
                <FontAwesomeIcon icon={faUser} className={style.icon} />
                <p className={style.label}>Title:</p>
                <span className={style.value}>{item.title || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Description:</p>
                <span className={style.value}>{item.description || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Instructor:</p>
                <span className={style.value}>{item.instructor || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Duration:</p>
                <span className={style.value}>{item.duration || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Price:</p>
                <span className={style.value}>${item.price || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Stripe Price Id:</p>
                <span className={style.value}>{item.stripePriceId || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Section:</p>
                <span className={style.value}>{item.section || "N/A"}</span>
              </div>
              <div className={style.infoRow}>
                <p className={style.label}>Categories:</p>
                <span className={style.value}>
                  {item.categories && item.categories.length > 0 ? (
                    <ul className={style.categoryList}>
                      {item.categories.map((category, index) => (
                        <li key={index} className={style.categoryItem}>
                          <strong>{category.name}:</strong>
                          {category.videos && category.videos.length > 0 ? (
                            <ul className={style.videoList}>
                              {category.videos.map((video, videoIndex) => (
                                <li key={videoIndex} className={style.videoItem}>
                                  <a
                                    href={video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={style.videoLink}
                                  >
                                    {video}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span>No videos</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No categories"
                  )}
                </span>
              </div>

            </>
          )}
        </section>
        <section className={style.relatedSection}>
          <h3 className={style.sectionTitle}>
            Related {view === "users" ? "Courses" : "Users"}
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : relatedData.length > 0 ? (
            <ul className={style.list}>
              {relatedData.map((relatedItem) => (
                <li key={relatedItem._id}>
                  {view === "users" ? relatedItem.title : relatedItem.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className={style.noData}>
              No related {view === "users" ? "courses" : "users"} found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DetailsModal;

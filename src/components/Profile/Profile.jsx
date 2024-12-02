import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";

const API_KEY = import.meta.env.VITE_API_KEY;
const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const fetchVideoTitle = async (videoUrl) => {
    try {
      const videoId = new URL(videoUrl).toString().split("/")[3];
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
      );

      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].snippet.title;
      } else {
        return "Unknown Title";
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      return "Error Fetching Title";
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setUser(response.data.user);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    const getUserCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}/courses`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setCourses(response.data);

          // Fetch video titles
          const titles = {};
          for (const course of response.data) {
            for (const category of course.categories || []) {
              for (const video of category.videos || []) {
                if (!titles[video]) {
                  titles[video] = await fetchVideoTitle(video);
                }
              }
            }
          }
          setVideoTitles(titles);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user courses:", err);
        }
      }
    };

    getUserData();
    getUserCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  return (
    <>
      <MetaPixel
        pixelId={"410616855425028"}
        events={[{ type: "ThisDudeIsOnTheProfilePage", params: { userId: user?.id } }]}
      />
      <div className={styles.profileContainer}>
        <div className={styles.profileSidebar}>
          {user ? (
            <>
              <img
                src="https://placehold.co/150x150/ffaaff/ff4d94"
                alt="Foto Profilo"
                className={styles.profilePic}
              />
              <h2>{user.username}</h2>
              <p className={styles.userID}>User ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Telefono: {user.phone}</p>
              <button className={styles.editButton}>Modifica Password</button>
              <button className={styles.editButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className={styles.noData}>No user data to display</p>
          )}
        </div>
        <div className={styles.profileContent}>
          {courses.length > 0 ? (
            <>
              <h1>I Tuoi Corsi</h1>
              {courses.map((course) => (
                <div key={course._id} className={styles.courseDetail}>
                  <h2>{course.title}</h2>
                  {course.categories && course.categories.length > 0 && (
                    <div className={styles.categoriesSection}>
                      <h3>Categorie del corso:</h3>
                      {course.categories.map((category, index) => (
                        <div key={index} className={styles.categoryItem}>
                          <p>
                            <strong>{category.name}</strong>
                          </p>
                          {category.videos && category.videos.length > 0 ? (
                            <ul className={styles.videoList}>
                              {category.videos.map((video, videoIndex) => (
                                <li key={videoIndex} className={styles.videoItem}>
                                  <button
                                    className={styles.videoButton}
                                    onClick={() => window.open(video, "_blank")}
                                  >
                                    {videoTitles[video] || "Loading..."}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className={styles.noVideos}>No videos in this category</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className={styles.noCourseData}>No course data to display</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

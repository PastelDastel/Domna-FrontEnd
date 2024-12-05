import { useState, useEffect, useMemo, useRef } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";
const API_KEY = import.meta.env.VITE_API_KEY; // Your YouTube API Key
import VideoSDK from "./VideoSDK/VideoSDK";

const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const [lives, setLives] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [showLives, setShowLives] = useState(false);
  // Handle Logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // ActiveCampaign Tracking Initialization

  const handleShowLives = () => {

    if (showLives) {
      setShowLives(false);
    } else {
      setShowLives(true);
    }


  };
  // ActiveCampaign Event Tracking
  const trackActiveCampaignEvent = async (eventName, eventData) => {
    try {
      await axios.post("/api/activecampaign/track-event", { eventName, eventData });
      console.log(`Event "${eventName}" tracked successfully.`);
    } catch (error) {
      console.error("Error tracking ActiveCampaign event:", error);
    }
  };
  // Fetch Video Title from YouTube API
  const fetchVideoTitle = async (videoUrl) => {
    try {
      const videoId = new URL(videoUrl).pathname.split("/")[1];
      if (!videoId) throw new Error("Invalid YouTube URL");

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

  // Fetch User and Courses Data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setShowLives(false);

    const getUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) setUser(response.data.user);
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

          // Fetch video titles for all videos in courses
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

    const getLives = async () => {
      try {
        const response = await axiosPrivate.get(`/api/lives`, {
          signal: controller.signal,
        });
        if (isMounted) {
          console.log("Lives:", response.data);
          setLives(response.data);
        }
      } catch (error) {
        console.error("Error fetching lives:", error);
        setLives([]);
      }
    };

    getUserData();
    getUserCourses();
    const checkIfLive = courses.some(course => course.benefits.includes('LIVE'));
    if (checkIfLive) {
      getLives();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  return (
    <>
      {/* MetaPixel Component */}
      <MetaPixel
        pixelId={"410616855425028"}
        events={[{ type: "ThisDudeIsOnTheProfilePage", params: { userId: user?.id } }]}
      />
      <div className={styles.profileContainer}>
        {/* Sidebar */}
        <div className={styles.profileSidebar}>
          {user ? (
            <>
              <img
                src="https://placehold.co/150x150/ffaaff/ff4d94"
                alt="Foto Profilo"
                className={styles.profilePic}
              />
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Telefono: {user.phone}</p>
              {

                //if any of the courses has a 'LIVE' benefit, show the live button
                courses.some(course => course.benefits.includes('LIVE')) ?
                  (<button className={styles.liveButton} onClick={handleShowLives}>{showLives ? "Vai ai corsi" : "Vai alle live"}</button>) : (<>
                    <p className={styles.noLive}>Per accedere alle LIVE bisogna aver acquistato un corso DOMNA LIVE</p>
                  </>)

              }
              <button className={styles.editButton}>Modifica Password</button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className={styles.noData}>Log in to see your profile</p>
          )}
        </div>

        <div className={styles.profileContent}>
          {!showLives ? (<>
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
                                      onClick={() => {
                                        window.open(video, "_blank");
                                        trackActiveCampaignEvent("VideoWatched", {
                                          videoUrl: video,
                                          videoTitle: videoTitles[video] || "Unknown Title",
                                          userId: user?.id,
                                          userName: user?.username,
                                          courseTitle: course.title,
                                          categoryName: category.name,
                                          email: user?.email,
                                        });
                                      }}
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
              <p className={styles.noCourseData}>Iscriviti ad un corso per accedere a questa sezione</p>
            )}
          </>) : (<>
            {lives.length > -1 ?
              (<>
                <VideoSDK user={user} />
              </>) :
              (<>
                <p className={styles.noLiveData}>Iscriviti ad un corso DOMNA LIVE per accedere a questa sezione</p>
              </>)}
          </>)}





        </div>
      </div>

    </>
  );
};
export default Profile;

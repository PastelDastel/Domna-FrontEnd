import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";
import VideoSDK from "./VideoSDK/VideoSDK";
import { getLastRecordingBasedOnRoomId, getTodayRoomID } from "./VideoSDK/API";
import VideoTrack from "./VideoTrack"
const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [hasLiveBenefit, setHasLiveBenefit] = useState(false); // Separate state for LIVE benefit check
  const [loadingRecordings, setLoadingRecordings] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [showLives, setShowLives] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [activeVideoId, setActiveVideoId] = useState(null); // Tracks active video
  // Handle Logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleShowLives = () => {
    setShowLives(!showLives);
  };

  // Fetch User Data
  useEffect(() => {
    const controller = new AbortController();
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        setUser(response.data.user);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    fetchUserData();

    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  // Fetch Courses Data
  useEffect(() => {
    const controller = new AbortController();
    getTodayRoomID();
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}/courses`, {
          signal: controller.signal,
        });
        const fetchedCourses = response.data;
        setCourses(fetchedCourses);

        // Check if any course has LIVE benefit
        const liveBenefit = fetchedCourses.some(course =>
          course.benefits.includes("LIVE")
        );
        setHasLiveBenefit(liveBenefit);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching courses:", err);
        }
      }
    };

    fetchCourses();

    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate]);
  // Scroll Listener (with passive: true)
  useEffect(() => {
    const handleScroll = () => {
      console.log("User is scrolling the page with video.");
    };

    // Attach scroll listener with passive: true
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Fetch Recordings if LIVE benefit exists
  useEffect(() => {
    if (hasLiveBenefit) {
      const fetchRecordings = async () => {
        setLoadingRecordings(true);
        try {
          console.log("Fetching recordings...");
          const fetchedRecordings = await getLastRecordingBasedOnRoomId();
          const filteredRecordings = fetchedRecordings.filter(recording => {
            // Exclude recordings that are in progress or incomplete
            return recording.status !== "in-progress";
          });
          setRecordings(filteredRecordings || []); // Default to empty array if no valid recordings
          console.log("Filtered Recordings: ", filteredRecordings);
        } catch (error) {
          console.error("Error fetching recordings:", error);
          setRecordings([]); // Set to empty array in case of error
        } finally {
          setLoadingRecordings(false);
        }
      };

      fetchRecordings();
    }
  }, [hasLiveBenefit]);

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
              {hasLiveBenefit ? (
                <button className={styles.liveButton} onClick={handleShowLives}>
                  {showLives ? "Vai ai corsi" : "Vai alle live"}
                </button>
              ) : (
                <p className={styles.noLive}>
                  Per accedere alle LIVE bisogna aver acquistato un corso DOMNA LIVE
                </p>
              )}
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
          {!showLives ? (
            <>
              {courses.length > 0 ? (
                <>
                  <h1>I Tuoi Corsi</h1>
                  {courses.map((course) => (
                    <div key={course._id} style={{ marginBottom: "20px" }}>
                      <h2>{course.title}</h2>
                      {course.categories && course.categories.length > 0 && (
                        <div>
                          {course.categories.map((category, index) => (
                            <div key={index}>
                              <h3>{category.name}</h3>
                              {category.videos && category.videos.length > 0 ? (
                                <ul>
                                  {category.videos.map((video, videoIndex) => (
                                    <li key={videoIndex}>
                                      <button
                                        onClick={() =>
                                          setActiveVideoId((prev) =>
                                            prev === video ? null : video
                                          )
                                        }
                                      >
                                        {activeVideoId === video
                                          ? "Chiudi Video"
                                          : "Guarda il Video"}
                                      </button>
                                      {activeVideoId === video && (
                                        <VideoTrack videoId={video} />
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No videos in this category</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p className={styles.noCourseData}>
                  Iscriviti ad un corso per accedere a questa sezione
                </p>
              )}
            </>
          ) : (
            <>
              {loadingRecordings ? (
                <p className={styles.loading}>Getting live recordings, please wait...</p>
              ) : (
                <>
                  {hasLiveBenefit ? (
                    <>
                      <VideoSDK user={user} meetingId={getTodayRoomID()} />
                      {recordings.length > 0 ? (
                        <>
                          <h1>Registrazioni</h1>
                          {recordings.map(recording => {
                            const formattedDate = new Date(recording.file.createdAt).toLocaleDateString("it-IT", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            });

                            return (
                              <div key={recording.id} className={styles.recordingDetail}>
                                <button
                                  className={styles.recordingButton}
                                  onClick={() => setSelectedVideo(recording.file.fileUrl)}
                                >
                                  Live del {formattedDate}
                                </button>
                              </div>
                            );
                          })}

                          {/* Section to display the selected video */}
                          {selectedVideo && (
                            <div className={styles.videoSection}>
                              <video
                                controls
                                width="720"
                                height="480"
                                src={selectedVideo}
                                className={styles.recordingVideo}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </>
                      ) : (
                        <p>Non ci sono registrazioni disponibili</p>
                      )}
                    </>
                  ) : (
                    <p className={styles.noLiveData}>
                      Iscriviti ad un corso DOMNA LIVE per accedere a questa sezione
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div >
    </>
  );
};

export default Profile;

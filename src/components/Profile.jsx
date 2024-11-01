import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "../style/Profile.module.css"; // Import the CSS module

const Profile = () => {
  const [user, setUser] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) setUser(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
            
        } else {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  return (
    <div className={styles.profileContainer}>
      <section className={styles.profileForm}>
        <h2 className={styles.profileTitle}>User Profile</h2>
        {user ? (
          <div className={styles.userInfo}>
            <div className={styles.userInfoLine}>
              <span className={styles.userInfoLabel}>Username:</span> {user.username}
            </div>
            <div className={styles.userInfoLine}>
              <span className={styles.userInfoLabel}>Email:</span> {user.email}
            </div>
            {/* Add additional user details as needed */}
          </div>
        ) : (
          <p className={styles.noData}>No user data to display</p>
        )}
        <button className={styles.profileButton} onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
      </section>
    </div>
  );
};

export default Profile;

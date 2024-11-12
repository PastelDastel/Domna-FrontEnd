import { useState, useEffect } from "react";
import axios from "axios"; // Import axios to use isCancel
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Users.module.css"; // Import the CSS module

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        if (isMounted) setUsers(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <div className={styles.usersContainer}>
      <h2 className={styles.usersTitle}>Users List</h2>
      {users?.length ? (
        <ul className={styles.userList}>
          {users.map((user, i) => (
            <li key={i} className={styles.userListItem}>
              {user?.username}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noDataMessage}>No users to display</p>
      )}
    </div>
  );
};

export default Users;

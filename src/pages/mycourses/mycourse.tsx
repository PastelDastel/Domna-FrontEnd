import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from "react";

const MyCourse = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      console.log("You need to be logged in to access this page's content...");
      return; // Exit early if user is not logged in
    }

    const fetchUserCourses = async () => {
      try {
        console.log("User: ", user);
        console.log("Fetching user courses... : " + user._id);
        const response = await fetch(
          `https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/protected/profile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data); // Display the fetched data
        // Process and store the fetched course data as needed
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, [user]);

  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}'s Courses</h1>
          {user.role === "Guest" ? (
            <p>Upgrade to access more courses</p>
          ) : (
            <p>Here are your courses</p>
          )}
        </div>
      ) : (
        <p>You need to be logged in to access this page's content...</p>
      )}
    </>
  );
};

export default MyCourse;

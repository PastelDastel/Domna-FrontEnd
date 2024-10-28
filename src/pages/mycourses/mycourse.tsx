import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import "./mycourse.css";

interface Course {
  _id: string;
  name: string;
  description: string;
  instructor: string;
  videos: string[];
}

const MyCourse = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!user) {
      console.log("You need to be logged in to access this page's content...");
      return;
    }

    const fetchUserCourses = async () => {
      try {
        console.log("User: ", user);
        console.log("Fetching user courses... : " + user._id);
        const response = await fetch(
          `https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/protected/courses/${user._id}`,
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
        setCourses(data.courses);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, [user]);

  return (
    <div className="my-course-container">
      {user ? (
        <>
          <h1>{user.name}'s Courses</h1>
          {user.role === "Guest" ? (
            <p className="guest-message">Upgrade to access more courses</p>
          ) : (
            <div className="courses-list">
              {courses.map((course) => (
                <div key={course._id} className="course-card">
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <div className="videos-list">
                    <p><strong>Videos:</strong></p>
                    {course.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link"
                      >
                        Video {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="login-prompt">You need to be logged in to access this page's content...</p>
      )}
    </div>
  );
};

export default MyCourse;

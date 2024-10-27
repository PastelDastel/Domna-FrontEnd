import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);

    console.log("Useraskdfhgjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", user);
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
        <div className="profile-container">
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <h2>Your Courses</h2>
                    {/* Here you could map over the courses data if it is stored in the state */}
                    {/* Example:
                    {courses.map((course) => (
                        <p key={course.id}>{course.title}</p>
                    ))}
                    */}
                </div>
            ) : (
                <p>You need to be logged in to access this page's content...</p>
            )}
        </div>
    );
};

export default Profile;

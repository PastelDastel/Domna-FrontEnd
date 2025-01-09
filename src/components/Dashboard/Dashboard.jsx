import { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Users from "./Users/Users";
import Courses from "./Courses/Courses";
import Benefits from "./Benefits/Benefits";
const Dashboard = () => {
    const [selectedView, setSelectedView] = useState("overview");

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    return (
        <div className={style.container}>
            <Sidebar selectedView={selectedView} onViewChange={handleViewChange} />
            <MainView selectedView={selectedView} key={selectedView} />
        </div>
    );
};

const MainView = ({ selectedView }) => {
    switch (selectedView) {
        case "overview":
            return <Overview />;
        case "users":
            return <Users />;
        case "courses":
            return <Courses />;
        case "benefits":
            return <Benefits />;
        case "transactions":
            return <Transactions />;
        default:
            return <Overview />;
    }
};

const Overview = () => {
    const axios = useAxiosPrivate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/");
            } catch (err) {
                console.error("Error fetching overview:", err);
            }
        };

        fetchData();
    }, [axios]);



    <div className={style.content}>
        <h1>Overview</h1>
    </div>
};

const Transactions = () => <div className={style.content}><h1>Transactions</h1></div>;

const SidebarButton = ({ view, selectedView, onViewChange }) => {
    return (
        <div
            className={`${style.sidebarButton} ${selectedView === view ? style.selected : ""
                }`}
            onClick={() => onViewChange(view)}
        >
            {view.charAt(0).toUpperCase() + view.slice(1)}
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ selectedView, onViewChange }) => {
    const views = ["overview", "users", "courses", "benefits", "categories", "blogs", "transactions"];
    return (
        <div className={style.sidebar}>
            {views.map((view) => (
                <SidebarButton
                    key={view}
                    view={view}
                    selectedView={selectedView}
                    onViewChange={onViewChange}
                />
            ))}
        </div>
    );
};

export default Dashboard;

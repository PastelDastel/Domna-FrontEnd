import { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Users from "./Users/Users";
import Courses from "./Courses/Courses";
import Benefits from "./Benefits/Benefits";
import Categories from "./Categories/Categories";
import Videos from "./Video/Videos";
import Lives from "./Live/Lives";
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
        case "courses":
            return <Courses />;
        case "categories":
            return <Categories />;
        case "videos":
            return <Videos />;
        case "lives":
            return <Lives />;
        default:
            return <Courses />;
    }
};

const Overview = () => {
    return (<div className={style.content}>
        <h1>Overview</h1>
        <p>Work in progress...</p>
    </div>)
};

const Transactions = () => { return (<div className={style.content}><h1>Transactions</h1></div>) };

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
    const views = ["courses", "categories", "videos", "lives"];
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

import { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Users from "./Users/Users";
const Dashboard = () => {
    const [selectedView, setSelectedView] = useState("overview");

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    return (
        <div className={style.container}>
            <Sidebar selectedView={selectedView} onViewChange={handleViewChange} />
            {/* Add a unique key to force re-render */}
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
        case "products":
            return <Products />;
        case "transactions":
            return <Transactions />;
        default:
            return <Overview />;
    }
};

const Overview = () => (
    <div className={style.content}>
        <h1>Overview</h1>
    </div>
);

const Products = () => <div className={style.content}><h1>Products</h1></div>;
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
    const views = ["overview", "users", "products", "transactions"];
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

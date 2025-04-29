import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Layout from "./components/Global Components/Layout";
import Missing from "./components/Missing/Missing";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RequireAuth from "./components/Global Components/RequireAuth";
import PersistLogin from "./components/Global Components/LoadingSpinner/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

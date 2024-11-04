import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

const ROLES = {
  User: "User",
  Editor: "Editor",
  Admin: "Admin",
};

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

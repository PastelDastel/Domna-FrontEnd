import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Layout from "./components/Global Components/Layout";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing/Missing";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RequireAuth from "./components/Global Components/RequireAuth";
import PersistLogin from "./components/Global Components/LoadingSpinner/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Courses from "./components/Courses/Courses";
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import BlogArticlePage from "./components/BlogArticlePage/BlogArticlePage";
import Dashboard from "./components/Dashboard/Dashboard";
import Random from "./components/Test/Random";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<About />} />
          <Route path="/blog/article/:id" element={<BlogArticlePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={[4934503821911649, 6792941695628669]} />}>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[6792941695628669]} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="random" element={<Random />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>

      </Route>
      <SpeedInsights />
      <Analytics />
    </Routes>
  );
}

export default App;

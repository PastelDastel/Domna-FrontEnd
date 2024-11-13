import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/PNG/logo-removebg.png";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleCustomEvent = (eventLabel) => {
    console.log(`Button clicked: ${eventLabel}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <section className="bg-slate-900 text-white z-50" onClick={() => setIsMenuOpen(false)}>
      <nav className="flex items-center justify-between px-8 py-4 relative z-50" ref={menuRef} onClick={(e) => e.stopPropagation()}>
        {/* Logo Section */}
        <div className="flex items-center z-50">
          <Link to="/" onClick={() => handleCustomEvent('Home Button')}>
            <img src={logo} alt="Domna Logo" className="h-16 md:h-24 lg:h-32" />
          </Link>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden block cursor-pointer z-50" onClick={toggleMenu}>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>

        {/* Full-Screen Navigation Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ease-in-out z-50 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } md:static md:opacity-100 md:visible md:flex md:flex-row md:space-y-0 md:space-x-6 md:bg-slate-900  md:h-auto md:w-auto md:items-center md:justify-between`}
        >
          <ul className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-6">
            <li>
              <Link
                to="/"
                className={`text-xl hover:text-white ${isActive("/") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                onClick={() => {
                  handleCustomEvent('Home');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-xl hover:text-white ${isActive("/about") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                onClick={() => {
                  handleCustomEvent('About');
                  setIsMenuOpen(false);
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`text-xl hover:text-white ${isActive("/courses") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                onClick={() => {
                  handleCustomEvent('Courses');
                  setIsMenuOpen(false);
                }}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`text-xl hover:text-white ${isActive("/blog") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                onClick={() => {
                  handleCustomEvent('Blog');
                  setIsMenuOpen(false);
                }}
              >
                Blog
              </Link>
            </li>
            {auth?.roles?.Admin && (
              <li>
                <Link
                  to="/dashboard"
                  className={`text-xl hover:text-white ${isActive("/dashboard") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                  onClick={() => {
                    handleCustomEvent('Dashboard');
                    setIsMenuOpen(false);
                  }}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {auth?.accessToken ? (
              <>
                <li>
                  <Link
                    to={`/profile/${auth.id}`}
                    className={`text-xl hover:text-white ${isActive(`/profile/${auth.id}`) ? 'font-bold border-b-2 border-purple-500' : ''}`}
                    onClick={() => {
                      handleCustomEvent('Profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCustomEvent('Logout');
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-xl border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`text-xl hover:text-white ${isActive("/login") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                    onClick={() => {
                      handleCustomEvent('Log in');
                      setIsMenuOpen(false);
                    }}
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`text-xl hover:text-white ${isActive("/register") ? 'font-bold border-b-2 border-purple-500' : ''}`}
                    onClick={() => {
                      handleCustomEvent('Register');
                      setIsMenuOpen(false);
                    }}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: any;
  accessToken: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (credentials: any) => Promise<void>;
  refreshAccessToken: () => Promise<void>; // Function to refresh token
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  accessToken: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  refreshAccessToken: async () => {},
};

export const UserContext = createContext<AuthContextType>(
  defaultAuthContextValue
);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const login = async (credentials: any) => {
    try {
      const response = await fetch(
        "https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed: " + response.statusText);
      }

      const data = await response.json();

      // Store tokens and user
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Function to refresh access token using the refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await fetch(
        "https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/token/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        logout(); // Logout if refresh fails
        throw new Error("Token refresh failed: " + response.statusText);
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken); // Update stored access token
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };
  const register = async (credentials: any) => {
    try {
      const response = await fetch(
        "https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed: " + response.statusText);
      }

      const data = await response.json();

      // Store tokens and user
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  useEffect(() => {
    // Check if accessToken is close to expiration and refresh it if needed
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        logout();
      } else {
        // Implement expiration check here, e.g., if (isTokenExpiringSoon(accessToken)) { refreshAccessToken(); }
        refreshAccessToken();
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes or as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <UserContext.Provider
      value={{ user, accessToken, login, logout, refreshAccessToken, register }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

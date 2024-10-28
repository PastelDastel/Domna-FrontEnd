import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: any;
  accessToken: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (credentials: any) => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  accessToken: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  refreshAccessToken: async () => false,
};

export const UserContext = createContext<AuthContextType>(defaultAuthContextValue);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<any>(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));

  console.log("UserContextProvider, getting user from localstorage: ", storedUser);

  const login = async (credentials: any) => {
    try {
      const response = await fetchWithAuth(
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
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const response = await fetch(
        "https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/token/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: refreshToken }),
        }
      );

      if (!response.ok) {
        console.log("Failed to refresh token, logging out...");
        logout();
        return false;
      }

      const data = await response.json();
      console.log("Token refreshed successfully:", data.accessToken);
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return false;
    }
  };

  const register = async (credentials: any) => {
    try {
      const response = await fetchWithAuth(
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
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (accessToken && storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }

    const interval = setInterval(() => {
      if (accessToken) {
        refreshAccessToken();
      }
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [accessToken]);

  const fetchWithAuth = async (url: string, options: any) => {
    options.headers = {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };

    try {
      const response = await fetch(url, options);

      if (response.status === 401) {
        console.log("401 Unauthorized detected, attempting token refresh...");
        const refreshSuccess = await refreshAccessToken();

        if (refreshSuccess) {
          options.headers.Authorization = `Bearer ${accessToken}`;
          return await fetch(url, options);
        } else {
          throw new Error("Token refresh failed, unable to retry request.");
        }
      }

      return response;
    } catch (error) {
      console.error("Error during fetchWithAuth:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout, refreshAccessToken, register }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

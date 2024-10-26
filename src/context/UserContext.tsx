import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the context
interface AuthContextType {
    user: any;
    accessToken: string | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    accessToken: null,
    login: async () => {},
    logout: () => {},
};

export const UserContext = createContext<AuthContextType>(defaultAuthContextValue);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));

    const login = async (credentials: any) => {
        console.log("Credentials:", JSON.stringify(credentials));
        
        try {
            const response = await fetch('https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }

            const data = await response.json();
            console.log('Success:', data);

            // Store tokens
            setAccessToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken); // Optional, for refresh logic

            // Assuming `data` contains user information
            console.log(data);
            setUser(data.user); // Update user information if included in the response
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

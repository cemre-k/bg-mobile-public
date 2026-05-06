import { clearCookies, storeCookies } from "@/utils/cookies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { buildApiUrl } from "../utils/api";

type User = {
    username: string;
    email?: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (
        username: string,
        password: string,
        remember: boolean,
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const loggedIn = await AsyncStorage.getItem("isLoggedIn");
            const username = await AsyncStorage.getItem("username");
            const userDataStr = await AsyncStorage.getItem("userData");

            if (loggedIn === "true" && username) {
                const userData = userDataStr ? JSON.parse(userDataStr) : {};
                setUser({
                    username,
                    email: userData.email,
                    role: userData.role,
                });
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (
        username: string,
        password: string,
        remember: boolean,
    ): Promise<{ success: boolean; error?: string }> => {
        try {
            // Create form data
            const formData = new FormData();
            formData.append("username", username.trim());
            formData.append("password", password);
            if (remember) {
                formData.append("remember", "on");
            }

            const response = await fetch(buildApiUrl("/auth/login"), {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            console.log("login response:", response);

            if (response.ok) {
                // Store cookies from response
                await storeCookies(response);

                // Parse response to extract user data if available
                const contentType = response.headers.get("content-type");
                let userData = null;

                if (contentType && contentType.includes("application/json")) {
                    userData = await response.json();
                }

                // Store session data
                await AsyncStorage.setItem("isLoggedIn", "true");
                await AsyncStorage.setItem("username", username.trim());
                if (userData) {
                    await AsyncStorage.setItem(
                        "userData",
                        JSON.stringify(userData),
                    );
                }

                // Update state
                setUser({
                    username: username.trim(),
                    email: userData?.email,
                    role: userData?.role,
                });
                setIsAuthenticated(true);

                return { success: true };
            } else {
                // Parse error message from response
                const text = await response.text();

                let errorMessage = "Giriş yapılamadı. Lütfen tekrar deneyin.";

                if (text.includes("Kullanıcı adı/e-posta veya şifre hatalı")) {
                    errorMessage = "Kullanıcı adı/e-posta veya şifre hatalı.";
                } else if (text.includes("e-posta adresinizi doğrulayın")) {
                    errorMessage = "Lütfen e-posta adresinizi doğrulayın.";
                } else if (text.includes("Süperuser")) {
                    errorMessage =
                        "Süperuser hesabı için sadece kullanıcı adı ile giriş yapabilirsiniz.";
                }

                return { success: false, error: errorMessage };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                error: "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
            };
        }
    };

    const logout = async () => {
        try {
            // Call backend logout endpoint if available
            try {
                await fetch(buildApiUrl("/auth/logout"), {
                    method: "GET",
                    credentials: "include",
                });
            } catch (error) {
                console.error("Error calling logout endpoint:", error);
            }

            // Clear cookies
            await clearCookies();

            // Clear local storage
            await AsyncStorage.removeItem("isLoggedIn");
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("userData");

            // Update state
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                login,
                logout,
                checkAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

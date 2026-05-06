import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Utility functions for managing HTTP cookies in React Native
 */

// Store cookies from response headers
export const storeCookies = async (response: Response) => {
    try {
        const setCookieHeader = response.headers.get("set-cookie");
        if (setCookieHeader) {
            await AsyncStorage.setItem("session_cookies", setCookieHeader);
        }
    } catch (error) {
        console.error("Error storing cookies:", error);
    }
};

// Get stored cookies for requests
export const getCookies = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem("session_cookies");
    } catch (error) {
        console.error("Error getting cookies:", error);
        return null;
    }
};

// Clear stored cookies
export const clearCookies = async () => {
    try {
        await AsyncStorage.removeItem("session_cookies");
    } catch (error) {
        console.error("Error clearing cookies:", error);
    }
};

// Make authenticated fetch request with cookies
export const authenticatedFetch = async (
    url: string,
    options: RequestInit = {},
): Promise<Response> => {
    const cookies = await getCookies();
    const headers = new Headers(options.headers);

    if (cookies) {
        headers.append("Cookie", cookies);
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });
};

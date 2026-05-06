import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requireAuth?: boolean;
};

export default function ProtectedRoute({
    children,
    requireAuth = true,
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && requireAuth && !isAuthenticated) {
            // Redirect to login if not authenticated
            router.replace("/(tabs)/login");
        }
    }, [isAuthenticated, isLoading, requireAuth]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
});

import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinizden emin misiniz?", [
            {
                text: "İptal",
                style: "cancel",
            },
            {
                text: "Çıkış Yap",
                style: "destructive",
                onPress: async () => {
                    await logout();
                    Alert.alert("Başarılı", "Çıkış yapıldı.");
                },
            },
        ]);
    };

    const handleLoginPress = () => {
        router.push("/(tabs)/login");
    };

    return (
        <View
            className="bg-card-bg border-b border-border-color"
            style={styles.header}
        >
            {/* Header Sol */}
            <View className="flex-row items-center" style={styles.headerLeft}>
                {/* Hamburger Menu Butonu */}
                <TouchableOpacity
                    className="p-2"
                    accessibilityLabel="Menüyü aç/kapat"
                >
                    <Ionicons name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Logo */}
                <TouchableOpacity className="flex-row items-center ml-3">
                    <View className="flex-row items-center"></View>
                </TouchableOpacity>
            </View>

            {/* Header Orta - Arama Kutusu (Desktop) */}
            <View className="flex-1 mx-4 hidden md:flex">
                <View className="bg-header-bg rounded-lg px-3 py-2 flex-row items-center">
                    <Ionicons name="search" size={18} color="#94a3b8" />
                    <TextInput
                        className="flex-1 ml-2 text-base text-text-color"
                        placeholder="Ara"
                        placeholderTextColor="#94a3b8"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* Header Sağ */}
            <View className="flex-row items-center" style={styles.headerRight}>
                {/* Arama Butonu (Mobile) */}
                <TouchableOpacity
                    className="p-2 md:hidden"
                    accessibilityLabel="Ara"
                >
                    <Ionicons name="search" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Oluştur Butonu */}
                <TouchableOpacity
                    className="rounded-lg px-4 py-2 flex-row items-center"
                    accessibilityLabel="İçerik oluştur"
                    style={styles.createButton}
                >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                    <Text className="text-white font-medium ml-2 hidden sm:flex">
                        Oluştur
                    </Text>
                </TouchableOpacity>

                {/* Tema Değiştirme Butonu */}
                <TouchableOpacity
                    className="p-2 ml-2"
                    accessibilityLabel="Tema değiştir"
                >
                    <Ionicons name="moon" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Dil Seçici */}
                <TouchableOpacity
                    className="rounded-full px-3 py-2 flex-row items-center ml-2 hidden sm:flex"
                    accessibilityLabel="Dil seçimi"
                    style={styles.languageButton}
                >
                    <Ionicons name="globe-outline" size={16} color="#FFFFFF" />
                    <Text className="text-text-color text-sm font-medium ml-1.5">
                        TR
                    </Text>
                </TouchableOpacity>

                {/* Bildirim Butonu */}
                <TouchableOpacity
                    className="p-2 ml-2 relative"
                    accessibilityLabel="Bildirimler"
                >
                    <Ionicons
                        name="notifications-outline"
                        size={20}
                        color="#FFFFFF"
                    />
                    {/* Bildirim Badge */}
                    <View
                        className="absolute rounded-full"
                        style={styles.notificationBadge}
                    />
                </TouchableOpacity>

                {/* Profil Avatar / Login Button */}
                {isAuthenticated ? (
                    <>
                        <TouchableOpacity
                            className="rounded-full items-center justify-center ml-2"
                            accessibilityLabel="Profil menüsü"
                            style={styles.avatar}
                        >
                            <Text className="text-white font-bold text-sm">
                                {user?.username?.charAt(0).toUpperCase() || "U"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="p-2 ml-2"
                            accessibilityLabel="Çıkış yap"
                            onPress={handleLogout}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        className="rounded-lg px-4 py-2 flex-row items-center ml-2"
                        accessibilityLabel="Giriş yap"
                        style={styles.loginButton}
                        onPress={handleLoginPress}
                    >
                        <Ionicons
                            name="log-in-outline"
                            size={18}
                            color="#FFFFFF"
                        />
                        <Text className="text-white font-medium ml-2">
                            Giriş
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 64,
    },
    headerLeft: {
        gap: 12,
    },
    headerRight: {
        gap: 8,
    },
    searchInput: {
        outlineStyle: "none",
    },
    createButton: {
        backgroundColor: "#00de46c9",
    },
    languageButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
    },
    notificationBadge: {
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        backgroundColor: "#ef4444",
    },
    avatar: {
        width: 32,
        height: 32,
        backgroundColor: "#10b981",
    },
    loginButton: {
        backgroundColor: "#3b82f6",
        borderWidth: 1,
        borderColor: "#60a5fa",
    },
});

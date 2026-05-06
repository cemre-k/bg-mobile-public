import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validation
        if (!username.trim() || !password.trim()) {
            Alert.alert("Hata", "Lütfen kullanıcı adı ve şifre girin.");
            return;
        }

        setLoading(true);

        const result = await login(username, password, remember);

        setLoading(false);

        if (result.success) {
            Alert.alert("Başarılı", "Giriş başarılı!", [
                {
                    text: "Tamam",
                    onPress: () => {
                        router.replace("/");
                    },
                },
            ]);
        } else {
            Alert.alert("Hata", result.error || "Giriş yapılamadı.");
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-background"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="flex-grow justify-center p-5"
            >
                <View className="bg-card-bg border border-border-color rounded-2xl p-6 mx-4">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="bg-primary-color/20 p-4 rounded-full mb-4">
                            <Ionicons
                                name="log-in-outline"
                                size={40}
                                color="#00de46"
                            />
                        </View>
                        <Text className="text-text-color text-3xl font-bold mb-2">
                            Giriş Yap
                        </Text>
                        <Text className="text-secondary-text text-base text-center">
                            Hesabınıza giriş yapın
                        </Text>
                    </View>

                    {/* Username/Email Input */}
                    <View className="mb-5">
                        <Text className="text-text-color text-sm font-semibold mb-2">
                            Kullanıcı Adı / E-posta
                        </Text>
                        <View className="flex-row items-center border border-border-color rounded-xl bg-input-bg px-4 py-3">
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color="#94a3b8"
                            />
                            <TextInput
                                className="flex-1 text-text-color text-base ml-3"
                                placeholder="Kullanıcı adınız veya e-posta"
                                placeholderTextColor="#94a3b8"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loading}
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="mb-5">
                        <Text className="text-text-color text-sm font-semibold mb-2">
                            Şifre
                        </Text>
                        <View className="flex-row items-center border border-border-color rounded-xl bg-input-bg px-4 py-3">
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color="#94a3b8"
                            />
                            <TextInput
                                className="flex-1 text-text-color text-base ml-3"
                                placeholder="Şifreniz"
                                placeholderTextColor="#94a3b8"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>
                    </View>

                    {/* Remember Me Checkbox */}
                    <TouchableOpacity
                        className="flex-row items-center mb-6"
                        onPress={() => setRemember(!remember)}
                        disabled={loading}
                    >
                        <View
                            className={`w-5 h-5 border-2 rounded ${remember ? "bg-primary-color border-primary-color" : "border-border-color"} items-center justify-center mr-2`}
                        >
                            {remember && (
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color="#fff"
                                />
                            )}
                        </View>
                        <Text className="text-secondary-text text-sm">
                            Beni Hatırla
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        className={`rounded-xl py-4 items-center mb-4 ${loading ? "bg-button-secondary-bg" : "bg-primary-color"}`}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="log-in-outline"
                                    size={20}
                                    color="#fff"
                                />
                                <Text className="text-white text-base font-semibold ml-2">
                                    Giriş Yap
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        className="items-center py-2"
                        onPress={() => router.push("/(tabs)/forgot-password")}
                        disabled={loading}
                    >
                        <Text className="text-primary-color text-sm font-medium">
                            Şifremi Unuttum
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

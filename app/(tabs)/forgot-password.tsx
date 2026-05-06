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
import { buildApiUrl } from "../../utils/api";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert("Hata", "Lütfen e-posta adresinizi girin.");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert("Hata", "Geçerli bir e-posta adresi girin.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("email", email.trim());

            const response = await fetch(buildApiUrl("/auth/forgot-password"), {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                Alert.alert(
                    "Başarılı",
                    "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
                    [
                        {
                            text: "Tamam",
                            onPress: () => router.back(),
                        },
                    ],
                );
            } else {
                const text = await response.text();
                if (text.includes("E-posta adresi bulunamadı")) {
                    Alert.alert(
                        "Hata",
                        "Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.",
                    );
                } else {
                    Alert.alert(
                        "Hata",
                        "Şifre sıfırlama işlemi başarısız oldu.",
                    );
                }
            }
        } catch (error) {
            console.error("Password reset error:", error);
            Alert.alert(
                "Hata",
                "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
            );
        } finally {
            setLoading(false);
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
                    {/* Back Button */}
                    <TouchableOpacity
                        className="mb-6 self-start"
                        onPress={() => router.back()}
                    >
                        <View className="flex-row items-center">
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#00de46"
                            />
                            <Text className="text-primary-color text-base ml-2 font-medium">
                                Geri
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="bg-primary-color/20 p-4 rounded-full mb-4">
                            <Ionicons
                                name="key-outline"
                                size={40}
                                color="#00de46"
                            />
                        </View>
                        <Text className="text-text-color text-3xl font-bold mb-2">
                            Şifremi Unuttum
                        </Text>
                        <Text className="text-secondary-text text-sm text-center leading-5">
                            E-posta adresinizi girin, size şifre sıfırlama
                            bağlantısı gönderelim.
                        </Text>
                    </View>

                    {/* Email Input */}
                    <View className="mb-6">
                        <Text className="text-text-color text-sm font-semibold mb-2">
                            E-posta
                        </Text>
                        <View className="flex-row items-center border border-border-color rounded-xl bg-input-bg px-4 py-3">
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color="#94a3b8"
                            />
                            <TextInput
                                className="flex-1 text-text-color text-base ml-3"
                                placeholder="E-posta adresiniz"
                                placeholderTextColor="#94a3b8"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                editable={!loading}
                            />
                        </View>
                    </View>

                    {/* Reset Button */}
                    <TouchableOpacity
                        className={`rounded-xl py-4 items-center mb-4 ${loading ? "bg-button-secondary-bg" : "bg-primary-color"}`}
                        onPress={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="send-outline"
                                    size={20}
                                    color="#fff"
                                />
                                <Text className="text-white text-base font-semibold ml-2">
                                    Şifre Sıfırlama Bağlantısı Gönder
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Back to Login */}
                    <TouchableOpacity
                        className="items-center py-2 border-t border-border-color mt-4 pt-6"
                        onPress={() => router.back()}
                        disabled={loading}
                    >
                        <View className="flex-row items-center">
                            <Ionicons
                                name="log-in-outline"
                                size={18}
                                color="#94a3b8"
                            />
                            <Text className="text-secondary-text text-sm ml-2">
                                Giriş sayfasına dön
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

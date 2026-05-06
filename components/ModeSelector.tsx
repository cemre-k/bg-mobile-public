import { useMode } from "@/context/ModeContext";
import React from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

const ModeSelector = () => {
    const { isChatMode, toggleMode } = useMode();
    const slideAnim = React.useRef(
        new Animated.Value(isChatMode ? 0 : 1),
    ).current;

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isChatMode ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isChatMode]);

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 64], // Adjusted for larger toggle
    });

    return (
        <TouchableOpacity
            onPress={toggleMode}
            activeOpacity={0.8}
            className="border-2 border-primary-color rounded-full  w-40 h-14 absolute bottom-24 left-1/2 -ml-20 justify-center"
            style={{ backgroundColor: isChatMode ? "#1e3a8a" : "#374151" }}
        >
            <Animated.View
                className="w-20 h-10 bg-white rounded-full absolute items-center justify-center"
                style={{ transform: [{ translateX }] }}
            >
                <Text className="text-gray-800 font-semibold text-sm">
                    {isChatMode ? "Chat" : "Randevu"}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ModeSelector;

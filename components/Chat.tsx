import { ChatProvider, useChat } from "@/context/ChatContext";
import React, { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    KeyboardEvent,
    Platform,
    ScrollView,
    View,
} from "react-native";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const ChatContent = () => {
    const { messages } = useChat();
    const scrollViewRef = useRef<ScrollView>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    useEffect(() => {
        if (Platform.OS !== "android") return;

        const onShow = (event: KeyboardEvent) => {
            setKeyboardHeight(event.endCoordinates?.height ?? 0);
        };

        const onHide = () => {
            setKeyboardHeight(0);
        };

        const showSubscription = Keyboard.addListener(
            "keyboardDidShow",
            onShow,
        );
        const hideSubscription = Keyboard.addListener(
            "keyboardDidHide",
            onHide,
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-chat-bg"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={0}
        >
            <View className="flex-1 overflow-hidden ">
                <ScrollView
                    className="flex-1 "
                    ref={scrollViewRef}
                    keyboardShouldPersistTaps="handled"
                >
                    {messages.map((message, index) => (
                        <ChatBubble key={index} message={message} />
                    ))}
                </ScrollView>
                <View
                    style={
                        Platform.OS === "android"
                            ? { marginBottom: keyboardHeight }
                            : undefined
                    }
                >
                    <ChatInput />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const Chat = () => {
    return (
        <ChatProvider>
            <ChatContent />
        </ChatProvider>
    );
};

export default Chat;

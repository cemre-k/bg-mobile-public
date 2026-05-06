import { useChat } from "@/context/ChatContext";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TextInput, TouchableHighlight, View } from "react-native";

const ChatInput = () => {
    const [userInput, setUserInput] = React.useState("");
    const { sendMessage } = useChat();

    const handleSend = () => {
        if (!userInput.trim()) return;
        sendMessage(userInput);
        setUserInput("");
    };

    return (
        <View className="px-3 py-2 border-t border-border-color bg-card-bg">
            <View className="flex-row items-center border border-border-color rounded-full bg-card-bg p-2">
                <TextInput
                    className="flex-1 text-white px-4 py-2 text-base"
                    placeholder="Herhangi bir şey sor..."
                    placeholderTextColor="#999"
                    value={userInput}
                    onChangeText={setUserInput}
                    onSubmitEditing={handleSend}
                    returnKeyType="send"
                    submitBehavior="submit"
                />
                <TouchableHighlight
                    className="rounded-full bg-primary-color p-2 aspect-square items-center justify-center"
                    onPress={handleSend}
                >
                    <Feather name="arrow-up" size={22} color="white" />
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default ChatInput;

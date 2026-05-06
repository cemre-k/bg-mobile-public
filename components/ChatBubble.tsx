import { capitalizeFirstLetter } from "@/utils";
import React from "react";
import { Image, Text, View } from "react-native";

export interface Message {
    profilePicture: string;
    sender: string;
    content: string;
    timestamp: string;
}

const ChatBubble = ({ message }: { message: Message }) => {
    const isAI = message.sender === "ai";

    return (
        <View
            className={`flex-row items-center mx-3 ${isAI ? "flex-row" : "flex-row-reverse"}`}
        >
            <Image
                id="PROFILE-PICTURE"
                source={{ uri: message.profilePicture }}
                className="w-12 h-12 rounded-full mb-2 bg-white"
            />
            <View
                className={`${isAI ? "bg-message-bg" : "bg-primary-color"} p-4 m-2 rounded-xl w-[70%] border border-border-color`}
            >
                <Text
                    id="USERNAME"
                    className="text-white font-bold border-b border-border-color pb-1"
                >
                    {capitalizeFirstLetter(message.sender)}
                </Text>
                <Text id="CONTENT" className="text-white">
                    {isAI
                        ? capitalizeFirstLetter(message.content)
                        : message.content}
                </Text>
                <Text
                    id="TIMESTAMP"
                    className={`${isAI ? "text-left" : "text-right"} text-white text-sm mt-2 opacity-65`}
                >
                    {message.timestamp}
                </Text>
            </View>
        </View>
    );
};

export default ChatBubble;

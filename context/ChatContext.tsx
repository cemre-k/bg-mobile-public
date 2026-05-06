import React, { createContext, useContext, useState } from "react";
import { buildApiUrl } from "../utils/api";

export type Message = {
    profilePicture: string;
    sender: string;
    content: string;
    timestamp: string;
};

type ChatContextType = {
    messages: Message[];
    addMessage: (msg: Message) => void;
    sendMessage: (content: string) => Promise<void>;
    isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within ChatProvider");
    }
    return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            profilePicture: "https://example.com/user-profile.jpg",
            sender: "user",
            content: "Hello, how can I help you?",
            timestamp: "2024-06-15 12:00:00",
        },
        {
            profilePicture: "https://example.com/ai-profile.jpg",
            sender: "ai",
            content: "Hi! I have a question about my order.",
            timestamp: "2024-06-15 12:01:00",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const addMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
    };

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            profilePicture: "https://example.com/user-profile.jpg",
            sender: "user",
            content,
            timestamp: new Date().toISOString(),
        };
        addMessage(userMessage);

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("text", content);
            formData.append("bigchat_id", "demo-bigchat-id");
            formData.append("user_name", "demo-user");
            formData.append("voice_mode", "false");
            formData.append("stream_enabled", "false");
            formData.append("user_id", "demo-user-id");
            formData.append("session_id", "demo-session-id");
            console.log(`sending message, Text= "${formData.get("text")}"`);

            const response = await fetch(buildApiUrl("/generate_par"), {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error:", response.status, errorText);
                throw new Error(`API request failed: ${response.status}`);
            }

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const responseText = await response.text();
                console.error(
                    "Expected JSON but got:",
                    contentType,
                    responseText.substring(0, 200),
                );
                throw new Error("Server returned non-JSON response");
            }
            const data = await response.json();
            console.table(data);

            const aiResponse =
                data.generated_text || data.final_message || "Yanıt alınamadı.";
            const aiMessage: Message = {
                profilePicture: "https://example.com/ai-profile.jpg",
                sender: "ai",
                content: aiResponse,
                timestamp: new Date().toISOString(),
            };
            addMessage(aiMessage);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                profilePicture: "https://example.com/ai-profile.jpg",
                sender: "ai",
                content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
                timestamp: new Date().toISOString(),
            };
            addMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ChatContext.Provider
            value={{ messages, addMessage, sendMessage, isLoading }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;

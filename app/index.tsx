import { AppointmentFlow } from "@/components/Appointment";
import Chat from "@/components/Chat";
import Header from "@/components/Header";
import ModeSelector from "@/components/ModeSelector";
import { ModeProvider, useMode } from "@/context/ModeContext";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MainContent = () => {
    const { isChatMode } = useMode();

    return (
        <View className="flex-1">
            {isChatMode ? <Chat /> : <AppointmentFlow />}
            <ModeSelector />
        </View>
    );
};

export default function Index() {
    return (
        <ModeProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }} className="bg-background">
                    <Header />
                    <MainContent />
                </SafeAreaView>
            </SafeAreaProvider>
        </ModeProvider>
    );
}

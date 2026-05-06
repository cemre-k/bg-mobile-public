import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export interface TimeSlot {
    location_id: string;
    resource_id: string;
    service_id: number | null;
    slot_date: string;
    slot_end: string;
    slot_id: number;
    slot_start: string;
    slot_status: string;
}

export interface SlotsData {
    slots: TimeSlot[];
    slots_by_date: Record<string, string[]>;
    success: boolean;
}

interface DateTimeSelectorProps {
    slotsData: SlotsData;
    onSlotSelect: (slot: TimeSlot) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
    slotsData,
    onSlotSelect,
}) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const dates = Object.keys(slotsData.slots_by_date).sort();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Bugün";
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Yarın";
        }

        const days = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
        const months = [
            "Oca",
            "Şub",
            "Mar",
            "Nis",
            "May",
            "Haz",
            "Tem",
            "Ağu",
            "Eyl",
            "Eki",
            "Kas",
            "Ara",
        ];

        return `${days[date.getDay()]}, ${date.getDate()} ${
            months[date.getMonth()]
        }`;
    };

    const getAvailableSlotsForDate = (date: string): TimeSlot[] => {
        return slotsData.slots.filter(
            (slot) =>
                slot.slot_date === date && slot.slot_status === "AVAILABLE",
        );
    };

    const handleSlotSelect = (slot: TimeSlot) => {
        setSelectedSlot(slot);
    };

    const handleConfirm = () => {
        if (selectedSlot) {
            onSlotSelect(selectedSlot);
        }
    };

    return (
        <View className="flex-1">
            {/* Date Selector */}
            <View className="mb-4">
                <Text className="text-white text-base font-semibold mb-3 px-4">
                    Tarih Seçin
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="px-4"
                    contentContainerStyle={{ paddingRight: 16 }}
                >
                    {dates.map((date) => {
                        const isSelected = selectedDate === date;
                        return (
                            <TouchableOpacity
                                key={date}
                                onPress={() => {
                                    setSelectedDate(date);
                                    setSelectedSlot(null);
                                }}
                                className={`mr-3 px-4 py-3 rounded-2xl min-w-[100px] ${
                                    isSelected
                                        ? "bg-primary-color"
                                        : "bg-card-bg border border-border-color"
                                }`}
                                activeOpacity={0.7}
                            >
                                <Text
                                    className={`text-center text-sm mb-1 ${
                                        isSelected
                                            ? "text-white font-semibold"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {formatDate(date)}
                                </Text>
                                <Text
                                    className={`text-center text-xs ${
                                        isSelected
                                            ? "text-white/80"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {slotsData.slots_by_date[date].length} slot
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Time Slot Selector */}
            {selectedDate && (
                <View className="flex-1">
                    <Text className="text-white text-base font-semibold mb-3 px-4">
                        Saat Seçin
                    </Text>
                    <ScrollView className="flex-1 px-4">
                        <View className="flex-row flex-wrap">
                            {getAvailableSlotsForDate(selectedDate).map(
                                (slot) => {
                                    const isSelected =
                                        selectedSlot?.slot_id === slot.slot_id;
                                    return (
                                        <TouchableOpacity
                                            key={slot.slot_id}
                                            onPress={() =>
                                                handleSlotSelect(slot)
                                            }
                                            className={`mr-3 mb-3 px-4 py-3 rounded-xl ${
                                                isSelected
                                                    ? "bg-primary-color"
                                                    : "bg-card-bg border border-border-color"
                                            }`}
                                            activeOpacity={0.7}
                                        >
                                            <View className="flex-row items-center">
                                                <Feather
                                                    name="clock"
                                                    size={14}
                                                    color={
                                                        isSelected
                                                            ? "white"
                                                            : "#999"
                                                    }
                                                />
                                                <Text
                                                    className={`ml-2 text-sm ${
                                                        isSelected
                                                            ? "text-white font-semibold"
                                                            : "text-gray-300"
                                                    }`}
                                                >
                                                    {slot.slot_start}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                },
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}

            {/* Confirm Button */}
            {selectedSlot && (
                <View className="px-4 py-4 bg-card-bg border-t border-border-color">
                    <View className="bg-primary-color/10 border border-primary-color/30 rounded-xl p-3 mb-3">
                        <Text className="text-primary-color text-xs font-medium mb-1">
                            Seçilen Randevu
                        </Text>
                        <Text className="text-white text-base font-semibold">
                            {formatDate(selectedSlot.slot_date)} -{" "}
                            {selectedSlot.slot_start}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        className="bg-primary-color rounded-xl py-4 items-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-semibold text-base">
                            Randevuyu Onayla
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default DateTimeSelector;

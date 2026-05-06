import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DateTimeSelector, { SlotsData, TimeSlot } from "./DateTimeSelector";
import ExpertCard, { Resource } from "./ExpertCard";
import ServiceCard, { Service } from "./ServiceCard";

// Mock data - gerçek endpoint'lerden gelecek
const MOCK_SERVICES: Service[] = [
    {
        active: 1,
        service_category: "Medikal Estetik",
        service_currency: "TRY",
        service_duration: 30,
        service_id: 104,
        service_name: "Botoks",
        service_price: "2500.00",
    },
    {
        active: 1,
        service_category: "Medikal Estetik",
        service_currency: "TRY",
        service_duration: 45,
        service_id: 105,
        service_name: "Dolgu",
        service_price: "3000.00",
    },
    {
        active: 1,
        service_category: "Cilt Bakımı",
        service_currency: "TRY",
        service_duration: 60,
        service_id: 107,
        service_name: "Hydrafacial",
        service_price: "1800.00",
    },
    {
        active: 1,
        service_category: "Cilt Bakımı",
        service_currency: "TRY",
        service_duration: 45,
        service_id: 108,
        service_name: "Kimyasal Peeling",
        service_price: "1200.00",
    },
    {
        active: 1,
        service_category: "Bölgesel İncelme",
        service_currency: "TRY",
        service_duration: 90,
        service_id: 110,
        service_name: "Kriyolipoliz",
        service_price: "3500.00",
    },
    {
        active: 1,
        service_category: "Bölgesel İncelme",
        service_currency: "TRY",
        service_duration: 60,
        service_id: 109,
        service_name: "Lipoliz",
        service_price: "2000.00",
    },
    {
        active: 1,
        service_category: "Medikal Estetik",
        service_currency: "TRY",
        service_duration: 30,
        service_id: 106,
        service_name: "Mezoterapi",
        service_price: "1500.00",
    },
    {
        active: 1,
        service_category: "Lazer Epilasyon",
        service_currency: "TRY",
        service_duration: 120,
        service_id: 101,
        service_name: "Tüm Vücut (Bayan)",
        service_price: "3500.00",
    },
    {
        active: 1,
        service_category: "Lazer Epilasyon",
        service_currency: "TRY",
        service_duration: 90,
        service_id: 102,
        service_name: "Tüm Vücut (Erkek)",
        service_price: "2800.00",
    },
    {
        active: 1,
        service_category: "Lazer Epilasyon",
        service_currency: "TRY",
        service_duration: 30,
        service_id: 103,
        service_name: "Yüz Bölgesi",
        service_price: "800.00",
    },
];

const MOCK_RESOURCES: Resource[] = [
    {
        email: null,
        generic_service: 1,
        location_id: "LOC-080",
        location_name: "Merkez Ofis",
        organization_id: "ORG-121",
        phone_number: null,
        qualified_services: [
            {
                service_category: "Medikal Estetik",
                service_id: 104,
                service_name: "Botoks",
            },
            {
                service_category: "Medikal Estetik",
                service_id: 105,
                service_name: "Dolgu",
            },
            {
                service_category: "Bölgesel İncelme",
                service_id: 110,
                service_name: "Kriyolipoliz",
            },
        ],
        resource_id: "RES-1783",
        resource_name: "Dr. Berna",
    },
];

// Mock slots data - gerçek endpoint'ten gelecek
const MOCK_SLOTS_DATA: SlotsData = {
    success: true,
    slots_by_date: {
        "2026-02-16": [
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
        ],
        "2026-02-17": [
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
        ],
        "2026-02-18": [
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
        ],
        "2026-02-20": [
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
        ],
    },
    slots: [],
};

// Generate mock slots from slots_by_date
Object.keys(MOCK_SLOTS_DATA.slots_by_date).forEach((date, dateIndex) => {
    MOCK_SLOTS_DATA.slots_by_date[date].forEach((time, timeIndex) => {
        const [hours, minutes] = time.split(":").map(Number);
        const endMinutes = minutes + 15;
        const endHours = hours + Math.floor(endMinutes / 60);
        const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

        MOCK_SLOTS_DATA.slots.push({
            location_id: "LOC-065",
            resource_id: "RES-2384",
            service_id: null,
            slot_date: date,
            slot_end: endTime,
            slot_id: 23857 + dateIndex * 100 + timeIndex,
            slot_start: time,
            slot_status: "AVAILABLE",
        });
    });
});

type Step = "service-selection" | "expert-selection" | "datetime-selection";

const AppointmentFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>("service-selection");
    const [selectedService, setSelectedService] = useState<Service | null>(
        null,
    );
    const [selectedExpert, setSelectedExpert] = useState<Resource | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        // Burada gerçek uygulamada API çağrısı yapılacak
        setCurrentStep("expert-selection");
    };

    const handleExpertSelect = (resource: Resource) => {
        setSelectedExpert(resource);
        // Burada gerçek uygulamada API çağrısı yapılacak (slots endpoint)
        setCurrentStep("datetime-selection");
    };

    const handleSlotSelect = (slot: TimeSlot) => {
        setSelectedSlot(slot);
        // Burada randevu onaylanacak
        console.log("Selected slot:", slot);
        console.log("Final appointment:", {
            service: selectedService,
            expert: selectedExpert,
            slot: slot,
        });
        // İleride burada API çağrısı yapılacak ve onay ekranı gösterilecek
    };

    const handleBack = () => {
        if (currentStep === "expert-selection") {
            setCurrentStep("service-selection");
            setSelectedService(null);
        } else if (currentStep === "datetime-selection") {
            setCurrentStep("expert-selection");
            setSelectedExpert(null);
        }
    };

    return (
        <View className="flex-1 bg-background">
            {/* Header */}
            <View className="px-4 pt-12 pb-4 bg-card-bg border-b border-border-color">
                <View className="flex-row items-center justify-between mb-3">
                    {currentStep !== "service-selection" && (
                        <TouchableOpacity
                            onPress={handleBack}
                            className="mr-3"
                            activeOpacity={0.7}
                        >
                            <Feather
                                name="arrow-left"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-bold">
                            {currentStep === "service-selection"
                                ? "Hizmet Seçin"
                                : currentStep === "expert-selection"
                                  ? "Uzman Seçin"
                                  : "Tarih ve Saat Seçin"}
                        </Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            {currentStep === "service-selection"
                                ? "Randevu almak istediğiniz hizmeti seçin"
                                : currentStep === "expert-selection"
                                  ? `${selectedService?.service_name} için uygun uzmanlar`
                                  : `${selectedExpert?.resource_name} için uygun randevu saatleri`}
                        </Text>
                    </View>
                </View>

                {/* Progress Indicator */}
                <View className="flex-row items-center mt-2">
                    <View className="flex-1 h-1 bg-primary-color rounded-full" />
                    <View
                        className={`flex-1 h-1 rounded-full ml-2 ${
                            currentStep === "expert-selection" ||
                            currentStep === "datetime-selection"
                                ? "bg-primary-color"
                                : "bg-gray-700"
                        }`}
                    />
                    <View
                        className={`flex-1 h-1 rounded-full ml-2 ${
                            currentStep === "datetime-selection"
                                ? "bg-primary-color"
                                : "bg-gray-700"
                        }`}
                    />
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-4 pt-4">
                {currentStep === "service-selection" ? (
                    <>
                        {MOCK_SERVICES.map((service) => (
                            <ServiceCard
                                key={service.service_id}
                                service={service}
                                onPress={handleServiceSelect}
                            />
                        ))}
                    </>
                ) : currentStep === "expert-selection" ? (
                    <>
                        {/* Selected Service Info */}
                        {selectedService && (
                            <View className="bg-primary-color/10 border border-primary-color/30 rounded-2xl p-4 mb-4">
                                <Text className="text-primary-color text-sm font-medium mb-1">
                                    Seçili Hizmet
                                </Text>
                                <Text className="text-white text-lg font-semibold">
                                    {selectedService.service_name}
                                </Text>
                                <View className="flex-row items-center mt-2">
                                    <Text className="text-gray-400 text-sm">
                                        {selectedService.service_duration}{" "}
                                        dakika
                                    </Text>
                                    <Text className="text-gray-400 text-sm mx-2">
                                        •
                                    </Text>
                                    <Text className="text-gray-400 text-sm">
                                        {selectedService.service_price}{" "}
                                        {selectedService.service_currency}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Experts List */}
                        {MOCK_RESOURCES.map((resource) => (
                            <ExpertCard
                                key={resource.resource_id}
                                resource={resource}
                                onPress={handleExpertSelect}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {/* Selected Service & Expert Info */}
                        {selectedService && selectedExpert && (
                            <View className="bg-primary-color/10 border border-primary-color/30 rounded-2xl p-4 mb-4">
                                <View className="flex-row items-center justify-between mb-2">
                                    <View className="flex-1">
                                        <Text className="text-primary-color text-xs font-medium mb-1">
                                            Seçili Hizmet
                                        </Text>
                                        <Text className="text-white text-base font-semibold">
                                            {selectedService.service_name}
                                        </Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-primary-color text-xs font-medium mb-1">
                                            Uzman
                                        </Text>
                                        <Text className="text-white text-base font-semibold">
                                            {selectedExpert.resource_name}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center mt-2 pt-2 border-t border-primary-color/20">
                                    <Text className="text-gray-400 text-sm">
                                        {selectedService.service_duration}{" "}
                                        dakika
                                    </Text>
                                    <Text className="text-gray-400 text-sm mx-2">
                                        •
                                    </Text>
                                    <Text className="text-gray-400 text-sm">
                                        {selectedService.service_price}{" "}
                                        {selectedService.service_currency}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* DateTime Selector (Full Screen Overlay) */}
            {currentStep === "datetime-selection" && (
                <View
                    className="absolute inset-0 bg-background"
                    style={{ top: 160 }}
                >
                    <DateTimeSelector
                        slotsData={MOCK_SLOTS_DATA}
                        onSlotSelect={handleSlotSelect}
                    />
                </View>
            )}
        </View>
    );
};

export default AppointmentFlow;

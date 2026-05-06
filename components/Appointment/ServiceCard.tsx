import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface Service {
    active: number;
    service_category: string;
    service_currency: string;
    service_duration: number;
    service_id: number;
    service_name: string;
    service_price: string;
}

interface ServiceCardProps {
    service: Service;
    onPress: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
    return (
        <TouchableOpacity
            className="bg-card-bg border border-border-color rounded-2xl p-4 mb-3"
            onPress={() => onPress(service)}
            activeOpacity={0.7}
        >
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 mr-3">
                    <Text className="text-white text-lg font-semibold mb-1">
                        {service.service_name}
                    </Text>
                    <View className="flex-row items-center">
                        <Feather name="tag" size={14} color="#999" />
                        <Text className="text-gray-400 text-sm ml-1">
                            {service.service_category}
                        </Text>
                    </View>
                </View>
                <View className="bg-primary-color/20 px-3 py-2 rounded-xl">
                    <Text className="text-primary-color font-bold text-base">
                        {service.service_price} {service.service_currency}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-border-color">
                <View className="flex-row items-center">
                    <Feather name="clock" size={16} color="#999" />
                    <Text className="text-gray-400 text-sm ml-2">
                        {service.service_duration} dakika
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-primary-color text-sm font-medium mr-1">
                        Randevu Al
                    </Text>
                    <Feather name="arrow-right" size={16} color="#0ea5e9" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;

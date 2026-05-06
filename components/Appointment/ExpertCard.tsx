import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface QualifiedService {
    service_category: string;
    service_id: number;
    service_name: string;
}

export interface Resource {
    email: string | null;
    generic_service: number;
    location_id: string;
    location_name: string;
    organization_id: string;
    phone_number: string | null;
    qualified_services: QualifiedService[];
    resource_id: string;
    resource_name: string;
}

interface ExpertCardProps {
    resource: Resource;
    onPress: (resource: Resource) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ resource, onPress }) => {
    return (
        <TouchableOpacity
            className="bg-card-bg border border-border-color rounded-2xl p-4 mb-3"
            onPress={() => onPress(resource)}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 rounded-full bg-primary-color/20 items-center justify-center mr-3">
                        <Feather name="user" size={24} color="#0ea5e9" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-lg font-semibold mb-1">
                            {resource.resource_name}
                        </Text>
                        <View className="flex-row items-center">
                            <Feather name="map-pin" size={12} color="#999" />
                            <Text className="text-gray-400 text-xs ml-1">
                                {resource.location_name}
                            </Text>
                        </View>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color="#0ea5e9" />
            </View>

            <View className="border-t border-border-color pt-3">
                <View className="flex-row items-center mb-2">
                    <Feather name="award" size={14} color="#999" />
                    <Text className="text-gray-400 text-xs ml-1 font-medium">
                        Uzmanlık Alanları
                    </Text>
                </View>
                <View className="flex-row flex-wrap">
                    {resource.qualified_services
                        .slice(0, 3)
                        .map((service, index) => (
                            <View
                                key={service.service_id}
                                className="bg-primary-color/10 border border-primary-color/30 px-3 py-1 rounded-full mr-2 mb-2"
                            >
                                <Text className="text-primary-color text-xs">
                                    {service.service_name}
                                </Text>
                            </View>
                        ))}
                    {resource.qualified_services.length > 3 && (
                        <View className="bg-gray-800 px-3 py-1 rounded-full mb-2">
                            <Text className="text-gray-400 text-xs">
                                +{resource.qualified_services.length - 3}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExpertCard;

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Sample data - replace with actual data from your backend/storage
const scanHistory = [
  {
    id: '1',
    location: 'Living Room',
    date: '2024-03-20',
    time: '14:30',
    status: 'completed',
    threats: 0
  },
  {
    id: '2',
    location: 'Bedroom',
    date: '2024-03-19',
    time: '16:45',
    status: 'completed',
    threats: 0
  },
  {
    id: '3',
    location: 'Kitchen',
    date: '2024-03-18',
    time: '10:15',
    status: 'completed',
    threats: 1
  },
  {
    id: '4',
    location: 'Office',
    date: '2024-03-17',
    time: '09:30',
    status: 'completed',
    threats: 0
  },
  {
    id: '5',
    location: 'Bathroom',
    date: '2024-03-16',
    time: '15:20',
    status: 'completed',
    threats: 0
  }
];

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();

  // Calculate bottom padding based on platform
  const bottomPadding = Platform.OS === 'ios' ? 90 : 80;

  const formatDate = (date: string) => {
    const today = new Date();
    const scanDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - scanDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date;
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Scan History" />
      <ScrollView className="flex-1 mt-4">
        {/* History content */}
        <View className="px-4">
          {/* History List */}
          <View className="p-4 space-y-4">
            {scanHistory.map((scan) => (
              <TouchableOpacity 
                key={scan.id}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-lg font-medium text-gray-800">
                        {scan.location}
                      </Text>
                      {scan.threats > 0 && (
                        <View className="ml-2 bg-red-100 px-2 py-1 rounded-full">
                          <Text className="text-red-600 text-sm font-medium">
                            {scan.threats} threat{scan.threats !== 1 ? 's' : ''}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-500 mt-1">
                      {formatDate(scan.date)} at {scan.time}
                    </Text>
                  </View>
                  <View className="bg-indigo-100 p-2 rounded-full">
                    <Ionicons name="scan-circle" size={24} color="#4F46E5" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryScreen; 
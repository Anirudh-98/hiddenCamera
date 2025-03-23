import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { HomeScreenNavigationProp } from '../types';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type StackNavigation = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const tabNavigation = useNavigation<HomeScreenNavigationProp>();
  const stackNavigation = useNavigation<StackNavigation>();

  // Calculate bottom padding based on platform
  const bottomPadding = Platform.OS === 'ios' ? 90 : 80;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      >
        {/* Header Section */}
        <View className="p-4  bg-indigo-600">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl mt-3 font-bold text-white">Welcome Amma!</Text>
              <Text className="text-white/80 mt-1">Let's keep your privacy protected</Text>
            </View>
            <View className="flex-row items-center mt-5 space-x-2">
              <TouchableOpacity 
                onPress={() => stackNavigation.navigate('Notifications')}
                className="bg-white/20 p-2 rounded-full"
              >
                <Ionicons name="notifications" size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => tabNavigation.navigate('Profile')}
                className="bg-white/20 p-2 rounded-full"
              >
                <Ionicons name="person-circle" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity 
              onPress={() => tabNavigation.navigate('Scan')}
              className="bg-white p-4 rounded-xl shadow-sm w-[48%] items-center"
            >
              <Ionicons name="scan-circle" size={32} color="#4F46E5" />
              <Text className="text-indigo-600 mt-2 font-medium">New Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => stackNavigation.navigate('History')}
              className="bg-white p-4 rounded-xl shadow-sm w-[48%] items-center"
            >
              <Ionicons name="time" size={32} color="#4F46E5" />
              <Text className="text-indigo-600 mt-2 font-medium">History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Scans */}
        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Recent Scans</Text>
          <View className="space-y-4">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-medium text-gray-800">Living Room Scan</Text>
                  <Text className="text-gray-500">2 hours ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-medium text-gray-800">Bedroom Scan</Text>
                  <Text className="text-gray-500">5 hours ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View className="p-4 mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Privacy Tips</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 mb-2">• Check for hidden cameras in hotel rooms</Text>
            <Text className="text-gray-700 mb-2">• Look for unusual objects in your surroundings</Text>
            <Text className="text-gray-700">• Use infrared detection for better results</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

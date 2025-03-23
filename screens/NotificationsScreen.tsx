import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type NotificationsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const NotificationsScreen = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();

  // Calculate bottom padding based on platform
  const bottomPadding = Platform.OS === 'ios' ? 90 : 80;

  const notifications = [
    {
      id: '1',
      title: 'New Scan Completed',
      message: 'Your living room scan has been completed successfully',
      time: '2 hours ago',
      type: 'scan'
    },
    {
      id: '2',
      title: 'Privacy Tip',
      message: 'Remember to check for hidden cameras in hotel rooms',
      time: '1 day ago',
      type: 'tip'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New features available in the latest version',
      time: '2 days ago',
      type: 'system'
    }
  ];

  return (
    <View className="flex-1 bg-background">
      <Header title="Notifications" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      >
        {/* Notifications List */}
        <View className="p-4 space-y-4">
          {notifications.map((notification) => (
            <TouchableOpacity 
              key={notification.id}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <View className="flex-row items-start">
                <View className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Ionicons 
                    name={
                      notification.type === 'scan' ? 'scan-circle' :
                      notification.type === 'tip' ? 'bulb' : 'information-circle'
                    } 
                    size={24} 
                    color="#4F46E5" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-medium text-gray-800">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    {notification.message}
                  </Text>
                  <Text className="text-gray-400 text-sm mt-2">
                    {notification.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen; 
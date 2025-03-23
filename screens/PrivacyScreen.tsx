import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type PrivacyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Privacy'>;

const PrivacyScreen = () => {
  const navigation = useNavigation<PrivacyScreenNavigationProp>();
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [cameraEnabled, setCameraEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-indigo-600">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4 mt-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl mt-4 font-bold text-white">Privacy Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Permissions Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
              App Permissions
            </Text>
            <View className="p-4 space-y-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-800 font-medium">Location Access</Text>
                  <Text className="text-gray-500 text-sm">Allow app to access your location</Text>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                  thumbColor={locationEnabled ? '#4F46E5' : '#9CA3AF'}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-800 font-medium">Camera Access</Text>
                  <Text className="text-gray-500 text-sm">Allow app to use your camera</Text>
                </View>
                <Switch
                  value={cameraEnabled}
                  onValueChange={setCameraEnabled}
                  trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                  thumbColor={cameraEnabled ? '#4F46E5' : '#9CA3AF'}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-800 font-medium">Notifications</Text>
                  <Text className="text-gray-500 text-sm">Receive app notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                  thumbColor={notificationsEnabled ? '#4F46E5' : '#9CA3AF'}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Data Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
              Data Management
            </Text>
            <View className="p-4 space-y-4">
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="download" size={24} color="#4F46E5" />
                <Text className="ml-3 text-gray-800">Export Scan History</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="trash" size={24} color="#EF4444" />
                <Text className="ml-3 text-gray-800">Clear Scan History</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="cloud-download" size={24} color="#4F46E5" />
                <Text className="ml-3 text-gray-800">Backup Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Privacy Policy */}
        <View className="p-4">
          <TouchableOpacity className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-800 font-medium">Privacy Policy</Text>
                <Text className="text-gray-500 text-sm">Read our privacy policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyScreen; 
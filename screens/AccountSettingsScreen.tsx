import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type AccountSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountSettings'>;

const AccountSettingsScreen = () => {
  const navigation = useNavigation<AccountSettingsScreenNavigationProp>();

  return (
    <View className="flex-1 bg-background">
      <Header title="Account Settings" />
      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="items-center mb-4">
              <View className="w-24 h-24 bg-indigo-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="person" size={48} color="#4F46E5" />
              </View>
              <TouchableOpacity className="bg-indigo-100 px-4 py-2 rounded-full">
                <Text className="text-indigo-600 font-medium">Change Photo</Text>
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 mb-1">Full Name</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="Anirudh Jyothula"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View>
                <Text className="text-gray-600 mb-1">Email</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="anirudhjyothula@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                />
              </View>
              <View>
                <Text className="text-gray-600 mb-1">Phone Number</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="+91 234 567 8900"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Password Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Change Password</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 mb-1">Current Password</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="Enter current password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>
              <View>
                <Text className="text-gray-600 mb-1">New Password</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="Enter new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>
              <View>
                <Text className="text-gray-600 mb-1">Confirm New Password</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  placeholder="Confirm new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity className="mx-4 mb-8">
          <View className="bg-indigo-600 p-4 rounded-xl items-center">
            <Text className="text-white font-medium">Save Changes</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountSettingsScreen; 
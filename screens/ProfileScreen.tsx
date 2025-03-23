import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type IconName = keyof typeof Ionicons.glyphMap;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const menuItems: Array<{
    icon: IconName;
    label: string;
    action: () => void;
  }> = [
    { 
      icon: 'person', 
      label: 'Account Settings', 
      action: () => navigation.navigate('AccountSettings') 
    },
    { 
      icon: 'notifications', 
      label: 'Notifications', 
      action: () => navigation.navigate('Notifications') 
    },
    { 
      icon: 'shield-checkmark', 
      label: 'Privacy', 
      action: () => navigation.navigate('Privacy') 
    },
    { 
      icon: 'help-circle', 
      label: 'Help & Support', 
      action: () => navigation.navigate('HelpSupport') 
    },
    { 
      icon: 'information-circle', 
      label: 'About', 
      action: () => navigation.navigate('About') 
    },
    { 
      icon: 'star', 
      label: 'Upgrade to Premium', 
      action: () => navigation.navigate('Pricing') 
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    navigation.navigate('Welcome');
  };

  // Calculate bottom padding based on platform
  const bottomPadding = Platform.OS === 'ios' ? 90 : 80; // Adjust these values based on your tab bar height

  return (
    <View className="flex-1 bg-background">
      <Header title="Profile" />
      <ScrollView className="flex-1">
        {/* Profile Info Section */}
        <View className="bg-white p-6">
          <View className="items-center">
            <Image
              source={{ uri: 'https://www.filmibeat.com/wimg/mobi/2018/10/prabhas_1540272625140.jpg' }}
              className="w-24 h-24 rounded-full"
            />
            <Text className="mt-4 text-xl font-semibold text-gray-800">Anirudh</Text>
            <Text className="text-gray-500">anirudhjyothula@gmail.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-4">
          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('AccountSettings')}
          >
            <Ionicons name="settings-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 text-gray-800 flex-1">Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Privacy')}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 text-gray-800 flex-1">Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <Ionicons name="help-circle-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 text-gray-800 flex-1">Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('About')}
          >
            <Ionicons name="information-circle-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 text-gray-800 flex-1">About</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Pricing')}
          >
            <Ionicons name="star-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 text-gray-800 flex-1">Upgrade to Premium</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center bg-white px-6 py-4 mt-4"
            onPress={() => navigation.navigate('Welcome')}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="ml-3 text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen; 
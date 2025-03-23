import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'About'>;

const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="About" />
      <ScrollView className="flex-1 p-4">
        {/* App Info */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-6 items-center">
            <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="shield-checkmark" size={40} color="#4F46E5" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Hidden Camera Detection</Text>
            <Text className="text-gray-500 text-center mb-4">
              Your personal security companion for detecting hidden cameras and surveillance devices
            </Text>
            <Text className="text-gray-400">Version 1.0.0</Text>
          </View>
        </View>

        {/* Features */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
              Features
            </Text>
            <View className="p-4 space-y-4">
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="scan-circle" size={20} color="#4F46E5" />
                </View>
                <View>
                  <Text className="text-gray-800 font-medium">Infrared Detection</Text>
                  <Text className="text-gray-500 text-sm">Detect hidden cameras using infrared technology</Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="magnet" size={20} color="#4F46E5" />
                </View>
                <View>
                  <Text className="text-gray-800 font-medium">Magnetic Detection</Text>
                  <Text className="text-gray-500 text-sm">Identify electronic devices through magnetic fields</Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="shield-checkmark" size={20} color="#4F46E5" />
                </View>
                <View>
                  <Text className="text-gray-800 font-medium">Privacy Protection</Text>
                  <Text className="text-gray-500 text-sm">Keep your privacy protected with advanced detection</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Links */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
              Links
            </Text>
            <View className="p-4 space-y-4">
              <TouchableOpacity 
                className="flex-row items-center"
                onPress={() => handleLinkPress('https://example.com/privacy')}
              >
                <Ionicons name="shield-checkmark" size={24} color="#4F46E5" />
                <Text className="ml-3 text-gray-800">Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row items-center"
                onPress={() => handleLinkPress('https://example.com/terms')}
              >
                <Ionicons name="document-text" size={24} color="#4F46E5" />
                <Text className="ml-3 text-gray-800">Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row items-center"
                onPress={() => handleLinkPress('https://example.com/website')}
              >
                <Ionicons name="globe" size={24} color="#4F46E5" />
                <Text className="ml-3 text-gray-800">Visit Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Credits */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <Text className="text-center text-gray-500">
              © 2024 Hidden Camera Detection. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen; 
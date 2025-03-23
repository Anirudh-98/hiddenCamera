import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';

type HelpSupportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HelpSupport'>;

const HelpSupportScreen = () => {
  const navigation = useNavigation<HelpSupportScreenNavigationProp>();

  const faqs = [
    {
      question: 'How does the infrared scan work?',
      answer: 'The infrared scan uses your device\'s camera to detect infrared light emitted by hidden cameras. It works best in dark environments and can detect most common types of hidden cameras.'
    },
    {
      question: 'What is magnetic detection?',
      answer: 'Magnetic detection uses your device\'s magnetometer to detect magnetic fields emitted by electronic devices, which can help identify hidden cameras and other electronic surveillance equipment.'
    },
    {
      question: 'How accurate is the detection?',
      answer: 'The accuracy depends on various factors including environmental conditions and the type of hidden device. We recommend using both infrared and magnetic detection for best results.'
    },
    {
      question: 'Can I use the app in any location?',
      answer: 'Yes, you can use the app in any location. However, for best results, ensure you have proper lighting conditions and minimal interference from other electronic devices.'
    }
  ];

  return (
    <View className="flex-1 bg-background">
      <Header title="Help & Support" />
      <ScrollView className="flex-1 p-4">
        {/* Search Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row items-center bg-gray-50 rounded-lg p-2">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="Search for help"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Contact Support */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Contact Support</Text>
            <View className="space-y-4">
              <TouchableOpacity className="flex-row items-center">
                <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                  <Ionicons name="mail" size={20} color="#4F46E5" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-800">Email Support</Text>
                  <Text className="text-gray-500 text-sm">support@example.com</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                  <Ionicons name="chatbubble" size={20} color="#4F46E5" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-800">Live Chat</Text>
                  <Text className="text-gray-500 text-sm">Available 24/7</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
              Frequently Asked Questions
            </Text>
            <View className="p-4 space-y-4">
              {faqs.map((faq, index) => (
                <TouchableOpacity key={index} className="border-b border-gray-100 pb-4">
                  <Text className="text-gray-800 font-medium mb-2">{faq.question}</Text>
                  <Text className="text-gray-500 text-sm">{faq.answer}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Report Issue */}
        <View className="p-4">
          <TouchableOpacity className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-800 font-medium">Report an Issue</Text>
                <Text className="text-gray-500 text-sm">Help us improve the app</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen; 
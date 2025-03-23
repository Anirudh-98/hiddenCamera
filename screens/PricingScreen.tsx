import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type PricingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pricing'>;

const PricingScreen = () => {
  const navigation = useNavigation<PricingScreenNavigationProp>();

  const features = [
    {
      title: 'Free Features',
      items: [
        { text: 'Infrared Detection', included: true },
        { text: 'Magnetic Detection', included: true },
        { text: 'Basic Camera Detection', included: true },
        { text: 'Scan History', included: true },
        { text: 'Basic Support', included: true },
      ]
    },
    {
      title: 'Premium Features',
      items: [
        { text: 'AI-Powered Camera Detection', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Cloud Backup', included: true },
        { text: 'Ad-Free Experience', included: true },
      ]
    }
  ];

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Here you would typically integrate with a payment gateway
    console.log(`Subscribing to ${plan} plan`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-indigo-600">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Premium Features</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-6 items-center">
            <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="shield-checkmark" size={40} color="#4F46E5" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Upgrade Your Security</Text>
            <Text className="text-gray-500 text-center mb-4">
              Get access to advanced AI-powered camera detection and premium features to stay more secure
            </Text>
          </View>
        </View>

        {/* Pricing Cards */}
        <View className="p-4">
          <View className="flex-row justify-between space-x-4">
            {/* Monthly Plan */}
            <View className="flex-1 bg-white rounded-xl shadow-sm p-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">Monthly</Text>
              <Text className="text-3xl font-bold text-indigo-600 mb-2">₹199</Text>
              <Text className="text-gray-500 mb-4">per month</Text>
              <TouchableOpacity 
                onPress={() => handleSubscribe('monthly')}
                className="bg-indigo-600 p-3 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Subscribe Monthly</Text>
              </TouchableOpacity>
            </View>

            {/* Yearly Plan */}
            <View className="flex-1 bg-white rounded-xl shadow-sm p-4 border-2 border-indigo-600">
              <View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <View className="bg-indigo-600 px-3 py-1 rounded-full">
                  <Text className="text-white text-sm font-medium">Best Value</Text>
                </View>
              </View>
              <Text className="text-lg font-semibold text-gray-800 mb-2">Yearly</Text>
              <Text className="text-3xl font-bold text-indigo-600 mb-2">₹1,999</Text>
              <Text className="text-gray-500 mb-4">per year</Text>
              <Text className="text-green-600 text-sm mb-2">Save 16%</Text>
              <TouchableOpacity 
                onPress={() => handleSubscribe('yearly')}
                className="bg-indigo-600 p-3 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Subscribe Yearly</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View className="p-4">
          {features.map((section, index) => (
            <View key={index} className="mb-4">
              <View className="bg-white rounded-xl shadow-sm">
                <Text className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
                  {section.title}
                </Text>
                <View className="p-4 space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} className="flex-row items-center">
                      <Ionicons 
                        name={item.included ? "checkmark-circle" : "close-circle"} 
                        size={20} 
                        color={item.included ? "#4F46E5" : "#9CA3AF"} 
                      />
                      <Text className="ml-3 text-gray-800">{item.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* FAQ Section */}
        <View className="p-4">
          <View className="bg-white rounded-xl shadow-sm p-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-800 font-medium mb-1">Can I cancel anytime?</Text>
                <Text className="text-gray-500 text-sm">Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.</Text>
              </View>
              <View>
                <Text className="text-gray-800 font-medium mb-1">Is my payment secure?</Text>
                <Text className="text-gray-500 text-sm">Yes, we use industry-standard encryption to protect your payment information.</Text>
              </View>
              <View>
                <Text className="text-gray-800 font-medium mb-1">What payment methods do you accept?</Text>
                <Text className="text-gray-500 text-sm">We accept all major credit cards, UPI, and net banking.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Support */}
        <View className="p-4">
          <TouchableOpacity className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-800 font-medium">Need Help?</Text>
                <Text className="text-gray-500 text-sm">Contact our support team</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PricingScreen; 
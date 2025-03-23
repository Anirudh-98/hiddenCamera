import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Implement login logic here
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        className="p-4"
      >
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </TouchableOpacity>

      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</Text>
          <Text className="text-gray-600 text-base">Sign in to continue using the app</Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          <View className="bg-gray-50 rounded-xl flex-row items-center px-4 border border-gray-200">
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 py-4 px-3 text-gray-900"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-gray-50 rounded-xl flex-row items-center px-4 border border-gray-200">
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 py-4 px-3 text-gray-900"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-4 items-end">
          <Text className="text-indigo-600 font-medium">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-indigo-600 rounded-xl py-4 mt-8"
        >
          <Text className="text-white text-center font-semibold text-lg">Sign In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-4 text-gray-500">Or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        {/* Social Login Buttons */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="flex-row items-center justify-center py-4 bg-white border border-gray-300 rounded-xl"
            onPress={() => {/* Implement Google Sign In */}}
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" className="mr-2" />
            <Text className="text-gray-800 font-medium ml-2">Continue with Google</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity 
              className="flex-row items-center justify-center py-4 bg-black rounded-xl"
              onPress={() => {/* Implement Apple Sign In */}}
            >
              <Ionicons name="logo-apple" size={20} color="#FFFFFF" className="mr-2" />
              <Text className="text-white font-medium ml-2">Continue with Apple</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sign Up Link */}
        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => {/* Handle Sign Up */}}>
            <Text className="text-indigo-600 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
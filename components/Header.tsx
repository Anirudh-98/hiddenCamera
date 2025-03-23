import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View className="mt-4 flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="p-2 -ml-2"
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      <Text className="flex-1 text-lg font-semibold text-gray-800 ml-2">
        {title}
      </Text>
    </View>
  );
};

export default Header; 
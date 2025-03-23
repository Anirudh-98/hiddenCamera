import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

type StatusStyle = {
  bgColor: string;
  textColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  message: string;
};

const MagneticDetectionScreen = () => {
  const [magnetometer, setMagnetometer] = useState<number>(0);
  const [isScanning, setIsScanning] = useState(false);
  const [subscription, setSubscription] = useState<ReturnType<typeof Magnetometer.addListener> | null>(null);

  useEffect(() => {
    if (isScanning) {
      const newSubscription = Magnetometer.addListener(data => {
        const { x, y, z } = data;
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        setMagnetometer(magnitude);
      });
      setSubscription(newSubscription);
    } else if (subscription) {
      subscription.remove();
      setSubscription(null);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isScanning]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const getStatusStyles = (): StatusStyle => {
    if (magnetometer > 100) {
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-500',
        iconName: 'warning',
        iconColor: '#EF4444',
        message: 'High magnetic field detected! Possible hidden camera nearby.',
      };
    } else if (magnetometer > 50) {
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-500',
        iconName: 'alert',
        iconColor: '#F59E0B',
        message: 'Moderate magnetic field detected. Continue scanning.',
      };
    } else {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-500',
        iconName: 'checkmark-circle',
        iconColor: '#10B981',
        message: 'No significant magnetic field detected.',
      };
    }
  };

  const status = getStatusStyles();

  return (
    <View className="flex-1 bg-background">
      <Header title="Magnetic Detection" />
      <View className="flex-1 p-4">
        <View className="flex-1 justify-center items-center">
          <View className="w-full bg-white rounded-2xl p-6 shadow-lg">
            <View className="items-center mb-8">
              <View className={`${status.bgColor} p-4 rounded-full mb-4`}>
                <Ionicons 
                  name={status.iconName} 
                  size={48} 
                  color={status.iconColor} 
                />
              </View>
              <Text className={`text-xl font-semibold ${status.textColor} mb-2`}>
                {status.message}
              </Text>
              <Text className="text-gray-600 text-center">
                Current magnetic field strength: {magnetometer.toFixed(2)} μT
              </Text>
            </View>

            <TouchableOpacity
              onPress={toggleScanning}
              className={`w-full py-4 rounded-xl flex-row justify-center items-center space-x-2 ${
                isScanning ? 'bg-red-500' : 'bg-blue-500'  // button color
              }`}
            >
              <Ionicons
                name={isScanning ? 'stop-circle' : 'scan'}
                size={24}
                color="white"
              />
              <Text className="text-white font-semibold text-lg">
                {isScanning ? 'Stop Scanning' : 'Start Scanning'}
              </Text>
            </TouchableOpacity>

            <View className="mt-8 space-y-4">
              <Text className="text-lg font-semibold text-primary mb-2">
                Tips for Magnetic Detection:
              </Text>
              <View className="space-y-2">
                <Text className="text-gray-600">
                  • Move your device slowly around the area
                </Text>
                <Text className="text-gray-600">
                  • Pay attention to sudden changes in magnetic field
                </Text>
                <Text className="text-gray-600">
                  • Common hiding spots: smoke detectors, wall clocks, power outlets
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MagneticDetectionScreen;
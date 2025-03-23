import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the type for the Bottom Tab Navigator
export type BottomTabParamList = {
  Home: undefined;
  Scan: undefined;
  Profile: undefined;
  InfraredDetection: undefined;
  MagneticDetection: undefined;
};

// Define the type for screen navigation props
export type HomeScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Home'>;
export type ScanScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Scan'>;
export type ProfileScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Profile'>;
export type InfraredDetectionScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'InfraredDetection'>;
export type MagneticDetectionScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'MagneticDetection'>;
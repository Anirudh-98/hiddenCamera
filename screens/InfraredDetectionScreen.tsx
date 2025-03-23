import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types'; // Import CameraType as a value
import { Ionicons } from '@expo/vector-icons';

interface BrightSpot {
  x: number; // Normalized x position (0 to 1)
  y: number; // Normalized y position (0 to 1)
  intensity: number; // Brightness intensity (0 to 1)
  size: number; // Size of the spot (0 to 1)
}

const InfraredDetectionScreen = () => {
  const [facing, setFacing] = useState<'front' | 'back'>('back');  // Use CameraType as a value
  const [permission, requestPermission] = useCameraPermissions(); // Camera permissions
  const [isDetecting, setIsDetecting] = useState(false); // Detection state
  const [detectedSpots, setDetectedSpots] = useState<BrightSpot[]>([]); // Detected bright spots
  const [sensitivity, setSensitivity] = useState(0.5); // Sensitivity for detection
  const cameraRef = useRef<CameraView>(null); // Camera ref

  // Request camera permissions
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission]);

  // Process each frame to detect bright spots (IR reflections)
  const processFrame = async () => {
    if (!cameraRef.current || !isDetecting) return;

    try {
      const frame = await cameraRef.current.takePictureAsync({
        quality: 0.5, // Lower quality for faster processing
        base64: true, // Include base64 data for analysis
      });

      if (!frame) {
        console.error('Frame is undefined');
        return;
      }

      const brightSpots = await detectBrightSpots(frame.uri);
      setDetectedSpots(brightSpots);

      if (brightSpots.length > 0) {
        Alert.alert(
          'Potential Camera Detected!',
          `Found ${brightSpots.length} bright spot${brightSpots.length > 1 ? 's' : ''}.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  // Detect bright spots in the image
  const detectBrightSpots = async (imageUri: string): Promise<BrightSpot[]> => {
    const brightSpots: BrightSpot[] = [];

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const img = new Image();
      img.src = base64;

      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return brightSpots;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Analyze each pixel for brightness
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3; // Average brightness

        // Detect bright spots (IR reflections)
        if (brightness > 255 * sensitivity && isClusterBright(data, i, canvas.width)) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          const size = measureSpotSize(data, i, canvas.width);

          brightSpots.push({
            x: x / canvas.width, // Normalize x position
            y: y / canvas.height, // Normalize y position
            intensity: brightness / 255, // Normalize intensity
            size: size / 100, // Normalize size
          });
        }
      }
    } catch (error) {
      console.error('Error detecting bright spots:', error);
    }

    return brightSpots;
  };

  // Check if a pixel is part of a bright cluster
  const isClusterBright = (data: Uint8ClampedArray, index: number, width: number): boolean => {
    const clusterSize = 3; // Check surrounding pixels
    let brightCount = 0;

    for (let i = -clusterSize; i <= clusterSize; i++) {
      for (let j = -clusterSize; j <= clusterSize; j++) {
        const idx = index + (i * width + j) * 4;
        if (idx >= 0 && idx < data.length) {
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (brightness > 200) brightCount++;
        }
      }
    }

    return brightCount > 5; // At least 5 bright pixels in the cluster
  };

  // Measure the size of a bright spot
  const measureSpotSize = (data: Uint8ClampedArray, index: number, width: number): number => {
    let size = 0;
    const threshold = 200;

    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        const idx = index + (i * width + j) * 4;
        if (idx >= 0 && idx < data.length) {
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (brightness > threshold) size++;
        }
      }
    }

    return size;
  };

  // Start/stop detection
  const toggleDetection = () => {
    if (isDetecting) {
      setIsDetecting(false);
      setDetectedSpots([]);
    } else {
      setIsDetecting(true);
      const interval = setInterval(processFrame, 1000); // Process frames every second
      return () => clearInterval(interval);
    }
  };

  // Adjust sensitivity
  const adjustSensitivity = (increment: number) => {
    setSensitivity((prev) => Math.max(0.1, Math.min(0.9, prev + increment)));
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.overlay}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.button, styles.sensitivityButton]}
              onPress={() => adjustSensitivity(-0.1)}
            >
              <Ionicons name="remove-circle" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, isDetecting && styles.buttonActive]}
              onPress={toggleDetection}
            >
              <Ionicons
                name={isDetecting ? 'stop-circle' : 'scan-circle'}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.sensitivityButton]}
              onPress={() => adjustSensitivity(0.1)}
            >
              <Ionicons name="add-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Visual feedback for detected spots */}
          {detectedSpots.map((spot, index) => (
            <View
              key={index}
              style={[
                styles.spotIndicator,
                {
                  left: `${spot.x * 100}%`,
                  top: `${spot.y * 100}%`,
                  opacity: spot.intensity,
                  width: 20 + spot.size * 30,
                  height: 20 + spot.size * 30,
                  borderRadius: 10 + spot.size * 15,
                },
              ]}
            />
          ))}

          <View style={styles.guide}>
            <Text style={styles.guideText}>
              {isDetecting
                ? `Scanning for hidden cameras... (${detectedSpots.length} detected)`
                : 'Press the button to start scanning'}
            </Text>
            <Text style={styles.tipText}>
              Tip: Turn off room lights for better detection
            </Text>
            <Text style={styles.sensitivityText}>
              Sensitivity: {Math.round(sensitivity * 100)}%
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  sensitivityButton: {
    padding: 10,
  },
  buttonActive: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guide: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  tipText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  sensitivityText: {
    color: '#4F46E5',
    fontSize: 14,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  spotIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderWidth: 2,
    borderColor: 'red',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});

export default InfraredDetectionScreen;
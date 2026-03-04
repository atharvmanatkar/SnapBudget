import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Automatically ask for permission when the screen opens
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
          SnapBudget needs camera access to scan receipts.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={{ color: 'white' }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      // @ts-ignore
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      uploadImage(photo.uri);
    }
  };

 const uploadImage = async (uri: string) => {
    const formData = new FormData();
    // @ts-ignore
    formData.append('receipt', { uri, name: 'receipt.jpg', type: 'image/jpeg' });

    try {
      // USE YOUR ACTUAL IP HERE (No localhost!)
      const response = await axios.post('http://10.25.8.180:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert("Success", "Receipt Analyzed & Saved to MongoDB!");
    } catch (error) {
      Alert.alert("Error", "Server connection failed. Check your IP.");
    }
  };

  return (
    <CameraView style={styles.camera} ref={cameraRef}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center' },
  captureBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', borderWidth: 5, borderColor: '#ccc', marginBottom: 40 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 10 }
});
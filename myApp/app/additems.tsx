import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddItems() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          
          <Text style={styles.headerTitle}>Add Item Manually</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Black Input Card */}
          <View style={styles.heroCard}>
            <Text style={styles.heroLabel}>ENTER AMOUNT</Text>
            <View style={styles.inputRow}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                autoFocus
              />
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter Item Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Pizza, Coffee"
                value={name}
                onChangeText={setName}
              />
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => router.back()}
            >
              <Text style={styles.saveButtonText}>Add Item to Food Category</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  heroCard: {
    backgroundColor: '#000',
    margin: 20,
    borderRadius: 24,
    padding: 30,
  },
  heroLabel: { color: '#888', fontSize: 12, fontWeight: '700', marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  currencySymbol: { color: '#FFF', fontSize: 32, fontWeight: '700', marginRight: 10 },
  amountInput: { color: '#FFF', fontSize: 40, fontWeight: '700', flex: 1 },
  form: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 30 },
  inputLabel: { fontSize: 14, color: '#666', marginBottom: 10, fontWeight: '600' },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    fontSize: 18,
    paddingVertical: 10,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#2DCC70',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

// Minimal helper since we are in a new file
function SafeAreaView({ children, style }: any) {
  return <View style={[{ paddingTop: Platform.OS === 'android' ? 30 : 0 }, style]}>{children}</View>;
}
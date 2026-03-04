import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import THEME from '../constants/theme'; // Adjust this path if your theme file is elsewhere
type CategoryCardProps = {
  title: string;
  amount: string;
  status: 'success' | 'danger';
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};
export default function CategoryCard({
  title,
  amount,
  status,
  iconName,
  onPress,
}: CategoryCardProps) {
  return (
    // TouchableOpacity is what makes the card clickable
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName || "wallet"} size={24} color={THEME.colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[
          styles.amount, 
          status === 'danger' ? { color: 'red' } : { color: 'green' }
        ]}>
          {amount}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    // Add a slight shadow for a professional look
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#F0F9F4', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  amount: {
    fontSize: 14,
    marginTop: 2,
  },
});
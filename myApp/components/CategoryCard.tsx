import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import THEME from '../constants/theme';

interface CategoryCardProps {
  title: string;
  amount: string;
  status: 'success' | 'danger'; // Matches your mock data
}

export default function CategoryCard({ title, amount, status }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="wallet-outline" size={24} color={THEME.colors.success} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[
          styles.amount, 
          { color: status === 'danger' ? THEME.colors.danger : THEME.colors.textSecondary }
        ]}>
          {amount}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={THEME.colors.border} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: THEME.borderRadius.m,
    marginBottom: 12,
    ...THEME.shadow.light,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0FDF4', // Subtle green tint
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  amount: {
    fontSize: 14,
    marginTop: 2,
  },
});
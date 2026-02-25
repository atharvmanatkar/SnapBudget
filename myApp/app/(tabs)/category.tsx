import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import THEME from '../../constants/theme';
import CategoryCard from '../../components/CategoryCard';

export default function CategoryPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/')}
        >
          <Ionicons name="arrow-back" size={24} color={THEME.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>All Categories</Text>
      </View>
      
      {/* 2. Insight Card (Pro Tip) */}
      <View style={styles.insightCard}>
        <View style={styles.insightIcon}>
          <Ionicons name="bulb" size={20} color={THEME.colors.accent} />
        </View>
        <View style={styles.insightTextContent}>
          <Text style={styles.insightTitle}>Pro Tip</Text>
          <Text style={styles.insightDesc}>Your weekend spending is 10% lower than usual.</Text>
        </View>
      </View>

      {/* 3. Full Category List */}
      <View style={styles.listContainer}>
        <CategoryCard title="Food" amount="₹4,000 left" status="success" />
        <CategoryCard title="Clothes" amount="₹1,200 left" status="success" />
        <CategoryCard title="Travel" amount="₹800 over" status="danger" />
        <CategoryCard title="Rent" amount="₹15,000 left" status="success" />
        <CategoryCard title="Entertainment" amount="₹2,000 left" status="success" />
        <CategoryCard title="Health" amount="₹500 left" status="success" />
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: THEME.colors.background, 
    paddingHorizontal: 20 
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    ...THEME.shadow.light,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: THEME.colors.textPrimary 
  },
  insightCard: { 
    flexDirection: 'row', 
    backgroundColor: '#EEF6FF', 
    padding: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 25 
  },
  insightIcon: { 
    width: 40, 
    height: 40, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  insightTextContent: { 
    marginLeft: 12,
    flex: 1,
  },
  insightTitle: { 
    fontWeight: '700', 
    color: THEME.colors.accent 
  },
  insightDesc: { 
    fontSize: 12, 
    color: THEME.colors.textSecondary 
  },
  listContainer: {
    gap: 4,
  }
});
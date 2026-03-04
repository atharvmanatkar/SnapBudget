import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import THEME from '../../constants/theme'; 
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import SideBar from '../../components/SideBar'; 

export default function HomeScreen() {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Toggle function for the profile click
  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  return (
    <View style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      {/* Sidebar Integration - Placed at the top level to overlay content */}
      <SideBar 
        isVisible={isMenuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Pass the toggle function to your Header component */}
        <Header onMenuPress={toggleMenu} />

        {/* 1. Monthly Spendings Card */}
        <View style={styles.spendingCard}>
          <Text style={styles.spendingLabel}>Monthly Spending</Text>
          <Text style={styles.spendingAmount}>₹48,250.00</Text>
          <View style={styles.spendingFooter}>
            <Ionicons name="trending-up" size={16} color="#16C784" />
            <Text style={styles.spendingSubtext}> 8% more than last month</Text>
          </View>
        </View>

        {/* 2. Smart Tracking Section */}
        <View style={styles.heroSection}>
          <View>
            <Text style={styles.heroTitle}>Smart Tracking</Text>
            <Text style={styles.heroSubtitle}>Instant receipt scanning & AI insights</Text>
          </View>
          <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/scan')}>
            <Ionicons name="camera" size={22} color="white" />
            <Text style={styles.scanButtonText}>Scan a Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Analytical Content: Spending Breakdown */}
        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Spending Analysis</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartRow}>
              {[
                { day: 'Mon', vol: 40 }, { day: 'Tue', vol: 70 }, 
                { day: 'Wed', vol: 50 }, { day: 'Thu', vol: 90 }, 
                { day: 'Fri', vol: 65 }
              ].map((item, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: item.vol }]} />
                  <Text style={styles.barLabel}>{item.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 4. Budget Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
          <TouchableOpacity onPress={() => router.push('/category')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesList}>
          <CategoryCard
            title="Food"
            amount="₹4,000 left"
            status="success"
            iconName="restaurant"
            onPress={() => router.push({ pathname: '/category', params: { category: 'Food' } })}
          />
          <CategoryCard
            title="Clothes"
            amount="₹1,200 left"
            status="success"
            iconName="shirt"
            onPress={() => router.push({ pathname: '/category', params: { category: 'Clothes' } })}
          />
        </View>

        <View style={{ height: 40 }} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  spendingCard: {
    backgroundColor: THEME.colors.primary,
    padding: 24,
    borderRadius: THEME.borderRadius.l,
    marginTop: 10,
    ...THEME.shadow.light,
  },
  spendingLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  spendingAmount: { color: 'white', fontSize: 32, fontWeight: '800', marginVertical: 8 },
  spendingFooter: { flexDirection: 'row', alignItems: 'center' },
  spendingSubtext: { color: '#16C784', fontSize: 12, fontWeight: '600' },
  heroSection: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.l,
    padding: 24,
    marginVertical: 20,
    ...THEME.shadow.light,
  },
  heroTitle: { fontSize: 20, fontWeight: '800' },
  heroSubtitle: { fontSize: 14, color: THEME.colors.textSecondary, marginTop: 4, marginBottom: 15 },
  scanButton: {
    backgroundColor: THEME.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 14,
    borderRadius: THEME.borderRadius.m,
  },
  scanButtonText: { color: 'white', fontWeight: '700', marginLeft: 10 },
  analyticsSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: THEME.colors.textPrimary, marginBottom: 15 },
  chartContainer: {
    backgroundColor: THEME.colors.card,
    padding: 20,
    borderRadius: THEME.borderRadius.l,
    ...THEME.shadow.light,
  },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100 },
  barWrapper: { alignItems: 'center' },
  bar: { width: 35, backgroundColor: THEME.colors.accent, borderRadius: 6 },
  barLabel: { fontSize: 10, color: THEME.colors.textSecondary, marginTop: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAllText: { color: THEME.colors.accent, fontWeight: '600' },
  categoriesList: { gap: 12 },
});
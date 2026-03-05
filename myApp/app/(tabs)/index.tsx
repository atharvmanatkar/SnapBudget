import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import THEME from '../../constants/theme'; 
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import SideBar from '../../components/SideBar'; 

const API_BASE_URL = 'http://10.127.33.44:5000/api';

export default function HomeScreen() {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);
  
  // 1. Live State Variables
  const [totalSpent, setTotalSpent] = useState(0);
  const [categories, setCategories] = useState([]); // Dynamic categories state
  const [chartData, setChartData] = useState([
    { _id: 1, amount: 0 }, { _id: 2, amount: 0 }, { _id: 3, amount: 0 }, 
    { _id: 4, amount: 0 }, { _id: 5, amount: 0 }, { _id: 6, amount: 0 }, { _id: 7, amount: 0 }
  ]);

  // 2. Data Fetching Logic
  const loadDashboardData = async () => {
    try {
      // Fetch Total Spending
      const totalRes = await axios.get(`${API_BASE_URL}/total-spending`);
      setTotalSpent(totalRes.data.total);

      // Fetch Daily Stats for Chart
      const statsRes = await axios.get(`${API_BASE_URL}/daily-stats`);
      const fullWeek = [1, 2, 3, 4, 5, 6, 7].map(dayId => {
        const found = statsRes.data.find((d: any) => d._id === dayId);
        return found || { _id: dayId, amount: 0 };
      });
      setChartData(fullWeek);

      // Fetch Category Breakdown
      const categoryRes = await axios.get(`${API_BASE_URL}/categories/breakdown`);
      setCategories(categoryRes.data);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  const getDayName = (id: number) => {
    const days = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[id] || '??';
  };

  // Helper to map Gemini categories to UI icons
  const getCategoryIcon = (name: string) => {
  const map: { [key: string]: any } = {
    'Food': 'restaurant',
    'Dairy': 'water',
    'Snacks': 'fast-food',
    'Cleaning': 'trash',
    'Personal Care': 'heart',
    'Cloths': 'shirt',
    'Grocery': 'cart',
    'Education': 'book',      // Added
    'Health': 'medkit',       // Added
    'Entertainment': 'film',  // Added
    'Electronics': 'laptop',   // Added
    'Transport': 'bus',       // Added
    'Others': 'pricetag'      // Default
  };
  return map[name] || 'pricetag';
};

  return (
    <View style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      <SideBar 
        isVisible={isMenuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header onMenuPress={toggleMenu} />

        {/* 1. Monthly Spendings Card */}
        <View style={styles.spendingCard}>
          <Text style={styles.spendingLabel}>Monthly Spending</Text>
          <Text style={styles.spendingAmount}>
            ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.spendingFooter}>
            <Ionicons name="stats-chart" size={16} color="#16C784" />
            <Text style={styles.spendingSubtext}> Live from MongoDB</Text>
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

        {/* 3. Analytical Content: Spending Analysis */}
        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Spending Analysis</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartRow}>
              {chartData.map((item, index) => {
                const maxHeight = 100;
                const barHeight = totalSpent > 0 ? (item.amount / totalSpent) * maxHeight : 5;
                return (
                  <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: Math.max(barHeight, 5) }]} />
                    <Text style={styles.barLabel}>{getDayName(item._id)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* 4. Budget Categories - NOW DYNAMIC */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
          <TouchableOpacity onPress={() => router.push('/category')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesList}>
          {categories.length > 0 ? (
            categories.map((item: any, index: number) => (
              <CategoryCard
                key={index}
                title={item._id} 
                amount={`₹${item.total.toLocaleString()} spent`}
                status="success"
                iconName={getCategoryIcon(item._id)}
                onPress={() => router.push({ pathname: '/category', params: { category: item._id } })}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', color: THEME.colors.textSecondary, marginTop: 10 }}>
              Scan a receipt to see category breakdown.
            </Text>
          )}
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
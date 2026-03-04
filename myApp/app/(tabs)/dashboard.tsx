import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import SideBar from '../../components/SideBar';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);

  // --- Statistics Data ---
  const monthlyTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [15000, 12000, 18500, 14000, 22000, 19500] }]
  };

  // PIE CHART: Professional Blue Palette
  const categoryData = [
    { name: 'Groceries', population: 35, color: '#1A5276', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Dining', population: 25, color: '#2980B9', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Travel', population: 20, color: '#5499C7', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Others', population: 20, color: '#A9CCE3', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(22, 199, 132, ${opacity})`, // Keeping Line chart Green
    labelColor: (opacity = 1) => `#666`,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <SideBar isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
      
      <View style={styles.navHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Dashboard</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* 1. Top Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.card, styles.summaryCard, { backgroundColor: '#111' }]}>
            <Text style={styles.cardLabelLight}>Savings</Text>
            <Text style={styles.cardValueLight}>₹12,400</Text>
            <Text style={styles.growthText}>+12% this month</Text>
          </View>
          <View style={[styles.card, styles.summaryCard, { backgroundColor: '#fff' }]}>
            <Text style={styles.cardLabelDark}>Expenses</Text>
            <Text style={styles.cardValueDark}>₹48,250</Text>
            <Text style={[styles.growthText, { color: '#E74C3C' }]}>-5% vs Limit</Text>
          </View>
        </View>

        {/* 2. Monthly Trend Graph (Green) */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={styles.sectionTitle}>Monthly Spending Trend</Text>
          <LineChart
            data={monthlyTrend}
            width={screenWidth - 60}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* 3. Budget Tracker (UPDATED TO BLUE) */}
        <View style={[styles.card, styles.budgetCard]}>
          <View style={styles.flexRow}>
            <Text style={styles.sectionTitle}>Budget Tracker</Text>
            <Text style={[styles.percentageText, { color: '#2980B9' }]}>80% Used</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '80%', backgroundColor: '#2980B9' }]} />
          </View>
          <Text style={styles.subText}>₹48,250 of ₹60,000 limit</Text>
        </View>

        {/* 4. Receipt Intelligence Metrics (Green Icons) */}
        <Text style={styles.groupTitle}>Receipt Intelligence</Text>
        <View style={styles.intelGrid}>
          <View style={[styles.card, styles.intelBox]}>
            <Ionicons name="document-text-outline" size={24} color="#16C784" />
            <Text style={styles.intelValue}>142</Text>
            <Text style={styles.intelSub}>Total Scanned</Text>
          </View>
          <View style={[styles.card, styles.intelBox]}>
            <Ionicons name="calculator-outline" size={24} color="#16C784" />
            <Text style={styles.intelValue}>₹340</Text>
            <Text style={styles.intelSub}>Avg. Value</Text>
          </View>
        </View>

        {/* AI Insight Card (Green Sparkle) */}
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="sparkles" size={20} color="#fff" />
          </View>
          <Text style={styles.insightText}>
            <Text style={{ fontWeight: '800' }}>DMart</Text> is your most visited merchant. You visited 5 times this month.
          </Text>
        </View>

        {/* 5. Category Breakdown (BLUE PIE CHART) */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <PieChart
            data={categoryData}
            width={screenWidth - 40}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>

        {/* 6. Top Vendors List */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Top 3 Vendors</Text>
          {[
            { name: 'DMart', amount: '₹12,400', transactions: 5 },
            { name: 'Amazon', amount: '₹8,200', transactions: 2 },
            { name: 'Starbucks', amount: '₹2,100', transactions: 4 },
          ].map((vendor, i) => (
            <View key={i} style={styles.vendorRow}>
              <View>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorSub}>{vendor.transactions} transactions</Text>
              </View>
              <Text style={styles.vendorAmount}>{vendor.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 15 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15 },
  navTitle: { fontSize: 22, fontWeight: '800', color: '#111' },
  scrollContainer: { paddingHorizontal: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryCard: { width: '48%', height: 130, justifyContent: 'center' },
  cardLabelLight: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  cardValueLight: { color: '#fff', fontSize: 24, fontWeight: '800', marginVertical: 4 },
  cardLabelDark: { color: '#666', fontSize: 13 },
  cardValueDark: { color: '#111', fontSize: 24, fontWeight: '800', marginVertical: 4 },
  growthText: { fontSize: 11, color: '#16C784', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  groupTitle: { fontSize: 18, fontWeight: '800', marginVertical: 10, color: '#111' },
  chartCard: { alignItems: 'center' },
  chart: { marginTop: 15, borderRadius: 16 },
  budgetCard: { paddingBottom: 25 },
  flexRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  percentageText: { fontWeight: '700' },
  progressBarBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%' },
  subText: { marginTop: 8, fontSize: 12, color: '#999' },
  intelGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  intelBox: { width: '48%', alignItems: 'center', paddingVertical: 25 },
  intelValue: { fontSize: 20, fontWeight: '800', marginTop: 10 },
  intelSub: { fontSize: 12, color: '#666' },
  insightCard: { backgroundColor: '#E8F8F1', padding: 15, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  insightIcon: { backgroundColor: '#16C784', padding: 8, borderRadius: 10, marginRight: 12 },
  insightText: { flex: 1, color: '#111', fontSize: 14, lineHeight: 20 },
  vendorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  vendorName: { fontSize: 15, fontWeight: '600', color: '#111' },
  vendorSub: { fontSize: 12, color: '#999' },
  vendorAmount: { fontSize: 15, fontWeight: '700', color: '#111' },
});
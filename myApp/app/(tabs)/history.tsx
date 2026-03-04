import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import THEME from '../../constants/theme';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

export default function HistoryScreen() {
  const router = useRouter();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [filter, setFilter] = useState('All'); // 'All', 'Scanned', 'Manual'

  // --- Mock Data for History Items ---
  const historyData = [
    { id: '1', title: 'DMart Supermarket', amount: '₹1,240', date: '24 Feb 2025', type: 'Scanned', category: 'Groceries' },
    { id: '2', title: 'Starbucks Coffee', amount: '₹450', date: '23 Feb 2025', type: 'Scanned', category: 'Dining' },
    { id: '3', title: 'Milk & Eggs', amount: '₹120', date: '22 Feb 2025', type: 'Manual', category: 'Groceries' },
    { id: '4', title: 'Amazon - Electronics', amount: '₹2,100', date: '20 Feb 2025', type: 'Scanned', category: 'Shopping' },
    { id: '5', title: 'Auto Rickshaw', amount: '₹60', date: '19 Feb 2025', type: 'Manual', category: 'Travel' },
  ];

  const filteredData = filter === 'All' 
    ? historyData 
    : historyData.filter(item => item.type === filter);

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardLeft}>
        <View style={[styles.iconContainer, { backgroundColor: item.type === 'Scanned' ? '#E8F8F1' : '#EBF5FB' }]}>
          <Ionicons 
            name={item.type === 'Scanned' ? 'scan' : 'create-outline'} 
            size={22} 
            color={item.type === 'Scanned' ? '#16C784' : '#2980B9'} 
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtext}>{item.date} • {item.category}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.amountText}>{item.amount}</Text>
        <View style={[styles.typeBadge, { backgroundColor: item.type === 'Scanned' ? '#16C784' : '#2980B9' }]}>
          <Text style={styles.typeBadgeText}>{item.type}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <SideBar isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
      
      {/* Navigation Header with Back Button */}
      <View style={styles.navHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Transaction History</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#111" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {['All', 'Scanned', 'Manual'].map((type) => (
            <TouchableOpacity 
              key={type} 
              onPress={() => setFilter(type)}
              style={[
                styles.filterPill, 
                filter === type && { backgroundColor: type === 'Manual' ? '#2980B9' : '#111' }
              ]}
            >
              <Text style={[styles.filterText, filter === type && { color: '#fff' }]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* History List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No history found</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 15 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 15 },
  navTitle: { fontSize: 22, fontWeight: '800', color: '#111' },
  container: { flex: 1, paddingHorizontal: 20 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 10 },
  filterPill: { 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee'
  },
  filterText: { fontWeight: '600', color: '#666' },
  historyCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 18, 
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15 
  },
  infoContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  itemSubtext: { fontSize: 12, color: '#999', marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  amountText: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 5 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 10, fontSize: 16 }
});
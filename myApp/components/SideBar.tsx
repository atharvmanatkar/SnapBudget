import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SideBar({ isVisible, onClose }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: 'grid-outline', route: '/' },
    { name: 'All Categories', icon: 'list-outline', route: '/category' },
    { name: 'History', icon: 'time-outline', route: '/history' },
    { name: 'Logout', icon: 'log-out-outline', route: '/login', color: '#E74C3C' },
  ];

  const handleNavigation = (route) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Drawer Container FIRST (on the LEFT) */}
        <View style={styles.drawerContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AM</Text>
            </View>
            <Text style={styles.userName}>Atharv M.</Text>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem} 
                onPress={() => handleNavigation(item.route)}
              >
                <Ionicons name={item.icon as any} size={22} color={item.color || '#333'} />
                <Text style={[styles.menuText, item.color && { color: item.color }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pressable Background SECOND (fills the remaining space on the RIGHT) */}
        <Pressable style={styles.pressableBg} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    flexDirection: 'row' 
  },
  pressableBg: { 
    flex: 1 
  },
  drawerContainer: { 
    width: width * 0.75, 
    backgroundColor: 'white', 
    height: '100%', 
    padding: 20, 
    paddingTop: 60,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileHeader: { 
    alignItems: 'center', 
    marginBottom: 40, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0', 
    paddingBottom: 20 
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#2DCC70', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  avatarText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: '700' },
  menuList: { gap: 10 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 12 
  },
  menuText: { 
    marginLeft: 15, 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333' 
  },
});
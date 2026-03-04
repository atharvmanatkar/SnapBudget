import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onMenuPress: () => void;
}

export default function Header({ onMenuPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* WRAPPER: Clicking this profile area triggers the SideBar toggle. 
          The function comes from the parent (index.tsx).
      */}
      <TouchableOpacity 
        style={styles.left} 
        onPress={onMenuPress} 
        activeOpacity={0.7}
      >
        <Ionicons name="person-circle" size={42} color="#16C784" />
        <Text style={styles.name}>Atharv M.</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="notifications-outline" size={24} color="#111" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 50, // Ensures content is below the status bar
    paddingBottom: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
});
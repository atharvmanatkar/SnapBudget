import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="person-circle" size={42} color="#16C784" />
        <Text style={styles.name}>Atharv M.</Text>
      </View>

      <TouchableOpacity>
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
    paddingTop: 50,
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
  },
});
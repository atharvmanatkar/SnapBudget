import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ScanButton() {
  return (
    <TouchableOpacity
      style={styles.scanBox}
      onPress={() => router.push("/scan")}
    >
      <Text style={styles.text}>📷 Scan a Receipt</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scanBox: {
    backgroundColor: "#111",
    padding: 18,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
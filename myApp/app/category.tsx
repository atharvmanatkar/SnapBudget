import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Category() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name} Expenses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
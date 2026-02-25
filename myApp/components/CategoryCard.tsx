import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CategoryCard({
  title,
  amount,
  isOver,
}: {
  title: string;
  amount: string;
  isOver?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/category",
          params: { name: title },
        })
      }
    >
      <View style={styles.left}>
        <Ionicons name="wallet-outline" size={22} color="#16C784" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={[
              styles.amount,
              { color: isOver ? "#FF3B30" : "#8E8E93" },
            ]}
          >
            {amount}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  amount: {
    fontSize: 13,
    marginTop: 2,
  },
});
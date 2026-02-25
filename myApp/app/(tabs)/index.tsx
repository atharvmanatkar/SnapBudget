import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import ScanButton from "../../components/ScanButton";
import CategoryCard from "../../components/CategoryCard";

export default function Home() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />


      <ScanButton />

      <Text style={styles.sectionTitle}>Budget Categories</Text>

      <CategoryCard title="Food" amount="€400 left" />
      <CategoryCard title="Clothes" amount="€120 left" />
      <CategoryCard title="Travel" amount="€80 over" isOver />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
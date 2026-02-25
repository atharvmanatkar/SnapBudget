import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import THEME from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        // This removes the bottom "Home" footer/tab bar
        tabBarStyle: { display: 'none' } 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      {/* Hide these from the footer but keep them in the routing */}
      <Tabs.Screen name="category" options={{ href: null }} />
      <Tabs.Screen name="scan" options={{ href: null }} />
    </Tabs>
  );
}
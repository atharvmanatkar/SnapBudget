import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ title: "Scan Receipt" }} />
      <Stack.Screen name="category" options={{ title: "Category" }} />
    </Stack>
  );
}
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(notes)" />
      <Tabs.Screen name="(summary)" />
    </Tabs>
  );
}

import { Stack } from "expo-router";
import { UserContext } from "@/src/contexts/contexts";
import { useState } from "react";
import { User } from "@/src/types/user";

export default function RootLayout() {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </UserContext.Provider>
  );
}

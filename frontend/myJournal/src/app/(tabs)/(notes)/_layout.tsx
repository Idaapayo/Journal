import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
      }}
    >
      <Stack.Screen name="notesDetails" />
    </Stack>
  );
}

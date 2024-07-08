import React from "react";
import { ScrollView, View } from "react-native";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View className="container h-full bg-white p-4">{children}</View>;
}

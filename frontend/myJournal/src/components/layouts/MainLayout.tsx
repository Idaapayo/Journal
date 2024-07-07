import React from "react";
import { View } from "react-native";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View className="container h-full bg-red-200 p-4">{children}</View>;
}

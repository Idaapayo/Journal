import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { format } from "date-fns";
import { router } from "expo-router";

interface NotesListCardProps extends TouchableOpacityProps {
  title: string;
  updatedAt: Date;
  text: string;
  id: string;
}

export default function NotesListCard({
  title,
  updatedAt,
  text,
  id,
}: NotesListCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`(tabs)/(notes)/notesDetails/${id}`);
      }}
    >
      <View className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg my-2 ">
        <Text className="font-bold">{title}</Text>
        <Text>{format(updatedAt, "yyyy-MM-dd")}</Text>
      </View>
    </TouchableOpacity>
  );
}
